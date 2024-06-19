import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestServiceRoutingModule } from './request-service-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestComponent } from './request/request.component';


@NgModule({
  declarations: [
    RequestComponent
  ],
  imports: [
    CommonModule,
    RequestServiceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class RequestServiceModule { }
