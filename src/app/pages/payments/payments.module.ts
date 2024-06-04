import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  providers: [DatePipe],
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    FormsModule
  ]
})
export class PaymentsModule { }
