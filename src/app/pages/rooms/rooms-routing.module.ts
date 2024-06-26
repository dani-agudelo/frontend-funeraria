import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: "list", component: ListComponent },
  { path: "create", component: ManageComponent },
  { path: "update/:id", component: ManageComponent },
  { path: "view/:id", component: ManageComponent },
  {
    path: ':idRoom/sepultures',
    loadChildren: () => import('../sepultures/sepultures.module').then((m) => m.SepulturesModule)
  },
  {
    path: ':idRoom/cremations',
    loadChildren: () => import('../cremations/cremations.module').then((m) => m.CremationsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
