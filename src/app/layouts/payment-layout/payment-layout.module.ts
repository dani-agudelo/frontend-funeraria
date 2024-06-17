import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PaymentLayoutRoutes } from "./payment-layout.routing";

@NgModule({
  imports: [CommonModule, RouterModule.forChild(PaymentLayoutRoutes)],
  declarations: [],
})
export class PaymentLayoutModule {}
