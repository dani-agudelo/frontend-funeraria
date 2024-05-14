import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "tables", component: TablesComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  {
    path: "users",
    loadChildren: () =>
      import("../../pages/users/users.module").then((m) => m.UsersModule),
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
    path: "serviceexecutions",
    loadChildren: () =>
      import("../../pages/serviceexecutions/serviceexecutions.module").then(
        (m) => m.ServiceexecutionsModule,
      ),
  },
  {
    path: "owners",
    loadChildren: () =>
      import("../../pages/owners/owners.module").then((m) => m.OwnersModule),
  },
];
