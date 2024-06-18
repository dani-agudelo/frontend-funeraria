import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestComponent } from './request/request.component';

const routes: Routes = [
  { path: '', redirectTo: 'request-service', pathMatch: 'full' },
  { path: "", component: RequestComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestServiceRoutingModule { }
