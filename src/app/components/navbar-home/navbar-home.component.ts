import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
  styleUrls: ['./navbar-home.component.scss']
})
export class NavbarHomeComponent implements OnInit {

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
    // si existe la sesion, quita los links de registro e inicio de sesion
    if (this.securityService.existSession()) {
      document.getElementById('registro').style.display = 'none';
      document.getElementById('login').style.display = 'none';
    } else{
      document.getElementById('perfil').style.display = 'none';
    }
  }

}
