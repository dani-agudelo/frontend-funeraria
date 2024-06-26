import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';

const routes: Routes = [
  { path: "", redirectTo: "list", pathMatch: "full" },
  { path: "list", component: ListComponent },
  { path: "create", component: ManageComponent },
  { path: "update/:id", component: ManageComponent },
  { path: "view/:id", component: ManageComponent },
  {
    path: ":idPlan/subscriptions",
    loadChildren: () =>
      import("../subscriptions/subscriptions.module").then(
        (m) => m.SubscriptionsModule
      ),
  },
  {
    path: ":idPlan/serviceplans",
    loadChildren: () =>
      import("../serviceplans/serviceplans.module").then(
        (m) => m.ServiceplansModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlansRoutingModule { }
