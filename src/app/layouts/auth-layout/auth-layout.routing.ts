import { Routes } from "@angular/router";

import { LoginComponent } from "../../pages/login/login.component";
import { RegisterComponent } from "../../pages/register/register.component";
import { SessionGuard } from "src/app/guards/session.guard";

export const AuthLayoutRoutes: Routes = [
  { path: "login", canActivate:[SessionGuard], component: LoginComponent },
  { path: "register", canActivate:[SessionGuard], component: RegisterComponent },
];
