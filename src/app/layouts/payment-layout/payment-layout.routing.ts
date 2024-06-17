import { Routes } from "@angular/router";
import { PaymentLayoutComponent } from "./payment-layout.component";

export const PaymentLayoutRoutes: Routes = [
  { path: "", redirectTo: "create-order", pathMatch: "full" },
  { path: "create-order", component: PaymentLayoutComponent },
  { path: "success", component: PaymentLayoutComponent },
  { path: "failure", component: PaymentLayoutComponent },
  { path: "pending", component: PaymentLayoutComponent },
];
