import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionHomeComponent } from 'src/app/components/section-home/section-home.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
