import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  theUser: User;
  private recaptchaCompleted = false;
  trySend: boolean;

    constructor(private theSecurityService: SecurityService, private router: Router, private fb: FormBuilder) {
    this.theUser = {
      _id: '',
      email: '',
      password: ''
    }
    this.trySend = false;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

   //* VALORES POR DEFECTO
   public myForm: FormGroup = this.fb.group({
    email: ['daniagudelom@gmail.com', [Validators.required, Validators.email]], 
    password: ['1234', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]]
  });

  get getTheFormGroup() {
    return this.myForm.controls;
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.recaptchaCompleted = true;
  }

  login() {

    if( !this.recaptchaCompleted ) {
      Swal.fire('Error', 'Por favor complete el captcha', 'error');
      return;
    }

    if( this.myForm.invalid ) {
      Swal.fire('Error', 'Por favor complete el formulario', 'error');
      return;
    }

    this.theSecurityService.login(this.theUser).subscribe({
      next: (data) => {
        console.log('Login successful, 2FA code sent to email.');
        this.theUser._id = data._id; 
        // Pedir al usuario que introduzca el código 2FA
        this.promptFor2FACode();
      },
      error: (error) => {
        if (error.status === 401) {
          Swal.fire('Error', 'Usuario o contraseña incorrectos', 'error');
        } else {
          Swal.fire('Error', 'Ocurrió un error al intentar iniciar sesión', 'error');
        }
      }
    });
  }
  
  promptFor2FACode() {
    Swal.fire({
      title: 'Introduce el código 2FA',
      input: 'text',
      inputPlaceholder: 'Introduce el código que recibiste en tu correo',
      showCancelButton: true,
      confirmButtonText: 'Verificar',
      cancelButtonText: 'Cancelar',
      preConfirm: (code2fa) => {
        if (!code2fa) {
          Swal.showValidationMessage('El código 2FA es requerido');
        } else {
          return code2fa;
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.verify2fa(result.value);
      }
    });
  }
  
  verify2fa(code2fa: string) {
    this.theSecurityService.verify2fa(this.theUser._id, code2fa).subscribe({
      next: (response) => {
        console.log('2FA verification successful.', response);
        //* Guardar la sesión en el local storage (user y token)
        this.theSecurityService.saveSession(response);
        //* Redireccionar al dashboard porque la verificación fue exitosa
        this.router.navigate(['dashboard']);
      },
      error: (error) => {
        if (error.status === 401) {
          Swal.fire('Error', 'Código 2FA incorrecto', 'error');
        } else {
          Swal.fire('Error', 'Ocurrió un error al verificar el código 2FA', 'error');
        }
      }
    });
  }
  
}
