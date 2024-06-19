import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';

const routes: Routes = [
  // si la ruta es vacía, redirigir a list
  { path: "", redirectTo: "list", pathMatch: "full" },
  { path: "list", component: ListComponent },
  { path: "create", component: ManageComponent },
  { path: "update/:id", component: ManageComponent },
  { path: "view/:id", component: ManageComponent },
  { path: ":id/success", component: ManageComponent },
  { path: ":id/failure", component: ManageComponent },
  { path: ":id/pending", component: ManageComponent },
  {
    path: ':idSubscription/payments',
    loadChildren: () => import('../payments/payments.module').then((m) => m.PaymentsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionsRoutingModule { }
