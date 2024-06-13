import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypeServiceComponent } from './type-service/type-service.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent,
    TypeServiceComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ServicesModule { }
