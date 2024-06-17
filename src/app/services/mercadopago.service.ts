import { Injectable } from "@angular/core";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class MercadopagoService {
  mercadopago: MercadoPagoConfig;
  preference: Preference;

  constructor() {
    this.mercadopago = new MercadoPagoConfig({
      accessToken: environment.MP_ACCESS_TOKEN,
      options: { timeout: 5000, idempotencyKey: "abc" },
    });

    this.preference = new Preference(this.mercadopago);
  }

  createPreference(preference: any) {
    return this.preference.create(preference);
  }
}
