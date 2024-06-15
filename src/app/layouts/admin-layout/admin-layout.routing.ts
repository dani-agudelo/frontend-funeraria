import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { AuthGuard } from "src/app/guards/auth.guard";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user-profile", canActivate:[AuthGuard], component: UserProfileComponent },
  { path: "tables", component: TablesComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  {
    path: "users",
    canActivate:[AuthGuard],
    loadChildren: () =>
      import("../../pages/users/users.module").then((m) => m.UsersModule),
  },
  {
    path: "roles",
    canActivate:[AuthGuard],
    loadChildren: () =>
      import("../../pages/roles/roles.module").then((m) => m.RolesModule),
  },
  {
    path: "permissions",
    canActivate:[AuthGuard],
    loadChildren: () =>
      import("../../pages/permissions/permissions.module").then(
        (m) => m.PermissionsModule,
      ),
  },

  {
    path: "customers",
    loadChildren: () =>
      import("../../pages/customers/customers.module").then(
        (m) => m.CustomersModule,
      ),
  },
  {
    path: "services",
    loadChildren: () =>
      import("../../pages/services/services.module").then(
        (m) => m.ServicesModule,
      ),
  },
  {
    path: "owners",
    loadChildren: () =>
      import("../../pages/owners/owners.module").then((m) => m.OwnersModule),
  },
  {
    path: "plans",
    loadChildren: () =>
      import("../../pages/plans/plans.module").then((m) => m.PlansModule),
  },
  {
    path: "headquarters",
    loadChildren: () =>
      import("../../pages/headquarters/headquarters.module").then(
        (m) => m.HeadquartersModule,
      ),
  },
];
