import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyChatRoutingModule } from './verify-chat-routing.module';
import { VerifyComponent } from './verify/verify.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VerifyComponent
  ],
  imports: [
    CommonModule,
    VerifyChatRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VerifyChatModule { }
