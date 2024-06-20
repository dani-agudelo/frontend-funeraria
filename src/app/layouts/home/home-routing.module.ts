import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionHomeComponent } from 'src/app/components/section-home/section-home.component';
import { ChatGuard } from 'src/app/guards/chat.guard';
import { PlanesLayoutComponent } from 'src/app/pages/planes-layout/planes-layout.component';
import { PQRComponent } from 'src/app/pages/pqr-layout/pqr.component';
import { ServiciosLayoutComponent } from 'src/app/pages/servicios-layout/servicios-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path:"home",
    component: SectionHomeComponent
  },
  {
    path: "verify-chat",
    canActivate: [ChatGuard],
    loadChildren: () =>
      import("../../pages/verify-chat/verify-chat.module").then(
        (m) => m.VerifyChatModule,
      ),
  },
  {
    path: "pqr",
    component: PQRComponent,
  },
  {
    path: "servicios",
    component: ServiciosLayoutComponent,
  },
  {
    path: "planes",
    component: PlanesLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
