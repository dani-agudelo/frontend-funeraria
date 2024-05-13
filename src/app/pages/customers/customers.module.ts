import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    // aqui se ponen los componentes que se van a usar en este modulo - CustomersModule
    ListComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule
  ]
})
export class CustomersModule { }
