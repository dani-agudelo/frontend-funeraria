import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SepulturesRoutingModule } from './sepultures-routing.module';
import { ManageComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ManageComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    SepulturesRoutingModule
  ]
})
export class SepulturesModule { }
