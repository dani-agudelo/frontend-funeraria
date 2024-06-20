import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root'
})
export class ChatGuard implements CanActivate {
  constructor(private theSecurityService: SecurityService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.theSecurityService.existCodeChat()) {
      //obtiene el codigo del chat
      const codeChat = this.theSecurityService.getCodeChat();
      this.router.navigate(["chatsp", codeChat]);
      return true;
    } else {
      this.router.navigate(["verify-chat"]);
      return false;
    }
  }

}
