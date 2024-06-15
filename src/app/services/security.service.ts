import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  // BehaviorSubject es un tipo de observable que permite emitir eventos, como un evento de cambio de usuario
  theUser = new BehaviorSubject<User>(new User);
  constructor(private http: HttpClient) {
    // Se verifica si hay una sesión activa al momento de cargar el servicio
    this.verifyActualSession();
  }

  /**
   * Realiza la petición al backend con el correo y la contraseña
   * para verificar si existe o no en la plataforma.
   * Este método no devuelve un token, solo valida las credenciales
   * y envía un código 2FA al correo del usuario.
   * @param user JSON con la información de correo y contraseña
   * @returns Respuesta HTTP la cual indica si el usuario tiene permiso de acceso
   */
  login(user: User): Observable<User> {
    return this.http.post<User>(`${environment.url_ms_security}/public/security/login`, user);
  }

  /**
  * Verifica el código 2FA enviado por el usuario y devuelve un token JWT y el objeto User.
  * @param userId ID del usuario
  * @param code2fa Código 2FA enviado al correo del usuario
  * @returns Observable con un HashMap que contiene el token JWT y el objeto User
  */
  verify2fa(userId: string, code2fa: string): Observable<any> {
    return this.http.post<any>(`${environment.url_ms_security}/public/security/users/${userId}/verify-2fa/${code2fa}`, {});
  }

  /**
    * Permite obtener la información de usuario
    * que tiene la función activa y servirá
    * para acceder a la información del token
*/
  public get activeUserSession(): User {
    return this.theUser.value;
  }

  /**
    * Permite actualizar la información del usuario
    * que acabó de validarse correctamente
    * @param user información del usuario logueado
  */
  setUser(user: User) {
    // Se emite un evento con la información del usuario, es el que 'activa' 
    // Cualquier componente que esté 'escuchando' este evento, podrá obtener la información del usuario
    this.theUser.next(user);
  }

  /**
  * Permite obtener la información del usuario
  * con datos tales como el identificador y el token
  * @returns
  */
  getUser() {
    // Se retorna un observable para que los componentes que estén 'escuchando' el evento puedan obtener la información
    // Funciona como un 'getter' para obtener la información del usuario
    return this.theUser.asObservable();
  }

  /*
  OJO FALTA VALIDACIÓN
  */
  saveSession(dataSesion: any) {
    let data: User = {
      _id: dataSesion["user"]["_id"],
      name: dataSesion["user"]["name"],
      email: dataSesion["user"]["email"],
      password: "",
      role: dataSesion["user"]["role"],
      token: dataSesion["token"],
      user_github: dataSesion["user"]["user_github"]
    };
    // Se guarda la información del usuario en el local storage
    localStorage.setItem('sesion', JSON.stringify(data));
    this.setUser(data);
  }

  /**
  * Permite cerrar la sesión del usuario
  * que estaba previamente logueado
  */
  logout() {
    localStorage.removeItem('sesion');
    this.setUser(new User());
  }

  /**
  * Permite verificar si actualmente en el local storage
  * existe información de un usuario previamente logueado
  */
  verifyActualSession() {
    let actualSesion = this.getSessionData();
    if (actualSesion) {
      // Se emite un evento con la información del usuario
      this.setUser(JSON.parse(actualSesion));
    }
  }

  /**
  * Verifica si hay una sesion activa
  * @returns
  */
  existSession(): boolean {
    let sesionActual = this.getSessionData();
    return (sesionActual) ? true : false;
  }

  /**
  * Permite obtener los datos de la sesión activa en el
  * local storage
  * @returns
  */
  getSessionData() {
    let sesionActual = localStorage.getItem('sesion');
    return sesionActual;
  }

  getGithubProfileImage(username: string) {
    return `https://avatars.githubusercontent.com/${username}`
  }

}