import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  theUser: User;
  subscription: Subscription;
  urlPhoto: string;

  constructor(private theSecurityService: SecurityService) { }

  getSecurityService() {
    return this.theSecurityService;
  }

  
  ngOnInit() {
    // nos suscribimos al observable
    this.subscription = this.theSecurityService.getUser().subscribe(user => {
      this.theUser = user;
    });
    this.getUrlPhoto();
  }

  getUrlPhoto() {
    this.urlPhoto = this.theSecurityService.getGithubProfileImage(this.theUser.user_github);
  }

}
