import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeneficiariesRoutingModule } from './beneficiaries-routing.module';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ManageComponent
  ],
  imports: [
    CommonModule,
    BeneficiariesRoutingModule
  ]
})
export class BeneficiariesModule { }
