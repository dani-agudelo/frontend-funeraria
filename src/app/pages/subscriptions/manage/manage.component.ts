import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Customer } from "src/app/models/customer.model";
import { Payment } from "src/app/models/payment.model";
import { Plan } from "src/app/models/plan.model";
import { Subscriptions } from "src/app/models/subscriptions.model";
import { CustomerService } from "src/app/services/customer.service";
import { MercadopagoService } from "src/app/services/mercadopago.service";
import { PaymentService } from "src/app/services/payment.service";
import { PlanService } from "src/app/services/plan.service";
import { SubscriptionsService } from "src/app/services/subscriptions.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";
import { SecurityService } from "src/app/services/security.service";
import { User } from "src/app/models/user.model";

declare var window: any;
@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number;
  subscription: Subscriptions;
  customerId: number;
  preference: string;
  planId: number;
  theFormGroup: FormGroup;
  trySend: boolean;
  plans: Plan[];
  customers: Customer[];
  mp: any;
  restrict: boolean;
  datePipe: DatePipe;

  constructor(
    private parent: ActivatedRoute,
    private serviceSubscription: SubscriptionsService,
    private planService: PlanService,
    private customerService: CustomerService,
    private mercadopagoService: MercadopagoService,
    private paymentService: PaymentService,
    private route: Router,
    private theFormBuilder: FormBuilder,
    private securityService: SecurityService
  ) {
    this.datePipe = new DatePipe("en-US");
    this.mode = 1;
    this.trySend = false;
    this.restrict = false;
    this.plans = [];
    this.customers = [];
    this.subscription = {
      id: 0,
      start_date: null,
      end_date: null,
      monthly_fee: null,
      customer: {
        id: null,
      },
      plan: {
        id: null,
      },
    };

    this.mp = new window.MercadoPago(environment.mp_public_token, {
      locale: "es-CO",
    });
  }

  configFormGroup() {
    const planValidators = this.planId ? [] : [Validators.required];
    const customerValidators = this.customerId ? [] : [Validators.required];
    this.theFormGroup = this.theFormBuilder.group({
      idPlan: [null, planValidators],
      idCustomer: [null, customerValidators],
      start_date: [null, [Validators.required]],
      end_date: [null, [Validators.required]],
      monthly_fee: [
        null,
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern("^[0-9]*$"),
        ],
      ],
      status: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.plansList();

    this.customerId = Number(this.parent.snapshot.params.idCustomer);
    this.planId = Number(this.parent.snapshot.params.idPlan);

    if (this.planId) {
      this.customersList();
      this.subscription.plan.id = this.planId;
    }
    if (this.customerId) {
      this.subscription.customer.id = this.customerId.toString();
    }
    this.configFormGroup();

    const currentUrl = this.parent.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.theFormGroup.disable();
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    } else if (currentUrl.includes("success")) {
      this.success();
    } else if (currentUrl.includes("failure")) {
      this.failure();
    } else if (currentUrl.includes("pending")) {
      this.pending();
    }

    this.restrict = !(this.customerId || this.planId);

    if (this.parent.snapshot.params.id) {
      this.subscription.id = this.parent.snapshot.params.id;
      this.getSubscription(this.subscription.id.toString());
    }
  }

  addMercadopago(user: User) {
    if (this.subscription.status) {
      return;
    }

    if (!this.preference) {
      this.createPreference(user);
    }

    if (this.preference) {
      this.mp.bricks().create("wallet", "wallet_container", {
        initialization: {
          preferenceId: this.preference,
          redirectMode: "modal",
        },
        customization: {
          texts: {
            valueProp: "smart_option",
          },
        },
      });
    }
  }

  createPreference(user: User) {
    const plan = this.plans.find((p) => p.id === this.subscription.plan.id);

    console.log(plan);
    console.log(user);

    const preference = {
      items: [
        {
          id: plan.id.toString(),
          title: plan.name,
          description: plan.description,
          category_id: plan.id.toString(),
          quantity: 1,
          unit_price: this.subscription.monthly_fee,
        },
      ],
      payer: { name: user.name, email: user.email },
      external_reference: `SUB_${this.subscription.id}`,
      back_urls: {
        success: `${environment.host}/subscriptions/${this.subscription.id}/success`,
        pending: `${environment.host}/subscriptions/${this.subscription.id}/pending`,
        failure: `${environment.host}/subscriptions/${this.subscription.id}/failure`,
      },
    };

    this.mercadopagoService
      .createPreference(preference)
      .subscribe((data: any) => {
        this.preference = data.id;
        this.addMercadopago(user);
      });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  plansList() {
    this.planService.getPlans().subscribe((data: Plan[]) => {
      this.plans = data;
    });
  }

  customersList() {
    this.customerService.getCustomers().subscribe((data: Customer[]) => {
      this.customers = data;
    });
  }

  getSubscription(id: string) {
    this.serviceSubscription.view(id).subscribe((data: Subscriptions) => {
      this.subscription = data;
      if (this.mode === 1 && this.subscription) {
        this.securityService.getUser().subscribe((user: User) => {
          this.addMercadopago(user);
        });
      }
    });
  }

  pagos() {
    if (this.restrict) {
      this.route.navigate(["subscriptions", this.subscription.id, "payments"]);
      return;
    }

    if (this.customerId) {
      this.route.navigate([
        "customers",
        this.customerId,
        "subscriptions",
        this.subscription.id,
        "payments",
      ]);
    }

    if (this.planId) {
      this.route.navigate([
        "plans",
        this.planId,
        "subscriptions",
        this.subscription.id,
        "payments",
      ]);
    }
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }

    this.serviceSubscription.create(this.subscription).subscribe(() => {
      Swal.fire(
        "Creación exitosa",
        "La suscripción ha sido creada exitosamente",
        "success"
      );
      if (this.customerId) {
        this.route.navigate([
          "customers",
          this.customerId,
          "subscriptions",
          "list",
        ]);
      } else {
        this.route.navigate(["plans", this.planId, "subscriptions", "list"]);
      }
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }

    this.serviceSubscription.update(this.subscription).subscribe(() => {
      Swal.fire(
        "Actualización exitosa",
        "La suscripción ha sido actualizada exitosamente",
        "success"
      );
      if (this.customerId) {
        this.route.navigate([
          "customers",
          this.customerId,
          "subscriptions",
          "list",
        ]);
      } else {
        this.route.navigate(["plans", this.planId, "subscriptions", "list"]);
      }
    });
  }

  success() {
    const paymentid = this.parent.snapshot.queryParams.payment_id;

    this.mercadopagoService.getPayment(paymentid).subscribe((data: any) => {
      if (data) {
        const referenceId = data.external_reference;

        if (referenceId == `SUB_${this.subscription.id}`) {
          const { transaction_amount, payment_type_id, date_approved } = data;

          const payment: Payment = {
            amount: Number(transaction_amount),
            payment_method: payment_type_id,
            payment_date: this.datePipe.transform(date_approved, "yyyy-MM-dd"),
            subscription_id: Number(this.subscription.id),
          };
          this.paymentService.create(payment).subscribe(() => {
            this.subscription.status = true;

            this.subscription.reference = data.id;
            this.serviceSubscription.update(this.subscription).subscribe(() => {
              Swal.fire(
                "Pago exitoso",
                "El pago ha sido realizado exitosamente",
                "success"
              );

              this.route.navigate([
                "subscriptions",
                this.subscription.id,
                "payments",
              ]);
            });
          });
        } else {
          Swal.fire(
            "Error",
            "El pago no corresponde a esta suscripción",
            "error"
          );
        }
      } else {
        Swal.fire("Error", "No se ha encontrado el pago", "error");
      }
    });
  }

  failure() {
    Swal.fire("Pago fallido", "El pago no ha sido realizado", "error");
  }

  pending() {
    Swal.fire(
      "Pago pendiente",
      "El pago está pendiente de ser realizado",
      "warning"
    );
  }
}
