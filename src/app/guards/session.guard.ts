import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(private securityService: SecurityService, private router: Router) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.securityService.existSession()) {
      const confirmLogout = window.confirm("Ya hay una sesión activa. ¿Desea cerrar la sesión actual?");
      if (confirmLogout) {
        this.securityService.logout();
        return true;
      } else {
        this.router.navigate(["user-profile"]);
        return false;
      }
    }
    return true;
  }
}
