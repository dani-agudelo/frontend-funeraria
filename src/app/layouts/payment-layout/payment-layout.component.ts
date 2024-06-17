import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MercadopagoService } from "src/app/services/mercadopago.service";


@Component({
  selector: "app-payment-layout",
  templateUrl: "./payment-layout.component.html",
  styleUrls: ["./payment-layout.component.scss"],
})
export class PaymentLayoutComponent implements OnInit {
  mode: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private parent: ActivatedRoute,
    private mercadoService: MercadopagoService,
  ) {
    this.mode = 1;
  }

  ngOnInit(): void {
    const currentUrl =
      this.parent["_routerState"].snapshot.url.match(/[^\/]+$/)[0];
    if (currentUrl === "create-order") {
      this.createPreference();
    } else if (currentUrl === "success") {
      console.log("Success");
    } else if (currentUrl === "failure") {
      console.log("Failure");
    }
  }

  async createPreference() {
    await this.mercadoService
      .createPreference({
        body: {
          items: [
            {
              id: "1234",
              title: "Laptop",
              quantity: 2,
              unit_price: 1000000,
              currency_id: "COP",
              picture_url:
                "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
              description: "Dispositivo móvil de Tienda e-commerce",
            },
          ],
          back_urls: {
            success: "http://localhost:4200/#/payment/success",
            failure: "http://localhost:4200/#/payment/failure",
            pending: "http://localhost:4200/#/payment/pending",
          },
          auto_return: "approved",
          notification_url: "http://localhost:4200/notification",
        },
      })
      .then(console.log)
      .catch(console.error);
  }
}
