import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { HomeComponent } from "./layouts/home/home/home.component";
import { PQRComponent } from "./pages/pqr-layout/pqr.component";

const routes: Routes = [

  // {
  //   path: 'home',
  //   loadChildren: () =>
  //     import("src/app/layouts/home/home.module").then(
  //       (m) => m.HomeModule,
  //     ),
  // },

  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/layouts/home/home.module").then(
            (m) => m.HomeModule,
          ),
      },
    ],
  },

  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/layouts/admin-layout/admin-layout.module").then(
            (m) => m.AdminLayoutModule,
          ),
      },
    ],
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/layouts/auth-layout/auth-layout.module").then(
            (m) => m.AuthLayoutModule,
          ),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "home",
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule { }
