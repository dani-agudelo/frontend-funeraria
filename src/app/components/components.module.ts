import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarHomeComponent } from './navbar-home/navbar-home.component';
import { SectionHomeComponent } from './section-home/section-home.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    NavbarHomeComponent,
    SidebarComponent,
    SectionHomeComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    NavbarHomeComponent,
    SidebarComponent,
    SectionHomeComponent
  ]
})
export class ComponentsModule { }
