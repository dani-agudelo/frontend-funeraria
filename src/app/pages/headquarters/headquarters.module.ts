import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeadquartersRoutingModule } from './headquarters-routing.module';
import { ManageComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ManageComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    HeadquartersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HeadquartersModule { }
