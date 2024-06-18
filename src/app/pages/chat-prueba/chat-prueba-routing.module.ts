import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatpComponent } from './chatp/chatp.component';

const routes: Routes = [
  { path: '', redirectTo: 'chatp', pathMatch: 'full' },
  { path: "list", component: ChatpComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatPruebaRoutingModule { }
