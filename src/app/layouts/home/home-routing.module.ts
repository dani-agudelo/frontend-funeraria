import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionHomeComponent } from 'src/app/components/section-home/section-home.component';
import { PQRComponent } from 'src/app/pages/pqr-layout/pqr.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path:"home",
    component: SectionHomeComponent
  },
  {
    path: "verify-chat",
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import("../../pages/verify-chat/verify-chat.module").then(
        (m) => m.VerifyChatModule,
      ),
  },
  {
    path: "pqr",
    component: PQRComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
