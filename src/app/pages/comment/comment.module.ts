import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentRoutingModule } from './comment-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    CommentRoutingModule
  ]
})
export class CommentModule { }
