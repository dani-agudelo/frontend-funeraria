import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Customer } from "src/app/models/customer.model";
import { Plan } from "src/app/models/plan.model";
import { Subscriptions } from "src/app/models/subscriptions.model";
import { CustomerService } from "src/app/services/customer.service";
import { PlanService } from "src/app/services/plan.service";
import { SubscriptionsService } from "src/app/services/subscriptions.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number;
  subscription: Subscriptions;
  customerId: number;
  planId: number;
  theFormGroup: FormGroup;
  trySend: boolean;
  plans: Plan[];
  customers: Customer[];

  constructor(
    private parent: ActivatedRoute,
    private serviceSubscription: SubscriptionsService,
    private planService: PlanService,
    private customerService: CustomerService,
    private route: Router,
    private theFormBuilder: FormBuilder,
  ) {
    this.mode = 1;
    this.trySend = false;
    this.plans = [];
    this.customers = [];
    this.subscription = {
      id: 0,
      start_date: null,
      end_date: null,
      monthly_fee: null,
      customer: {
        id: null
      },
      plan: {
        id: null
      }
    };
  }

  configFormGroup() {
    const planValidators = this.planId ? [] : [Validators.required];
    const customerValidators = this.customerId ? [] : [Validators.required];
    this.theFormGroup = this.theFormBuilder.group({
      idPlan: [null, planValidators],
      idCustomer: [null, customerValidators],
      start_date: [null, [Validators.required]],
      end_date: [null, [Validators.required]],
      monthly_fee: [null, [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]],
    });
  }

  ngOnInit(): void {
    this.customerId = Number(this.parent.snapshot.params.idCustomer);
    this.planId = Number(this.parent.snapshot.params.idPlan);
    if (this.planId) {
      this.subscription.plan.id = this.planId;
      this.customersList();
    }
    if (this.customerId) {
      this.subscription.customer.id = this.customerId.toString();
      this.plansList();
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
    }

    if (this.parent.snapshot.params.id) {
      this.subscription.id = this.parent.snapshot.params.id;
      this.getSubscription(this.subscription.id.toString());
    }


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
      console.log(data);
      this.subscription = data;
      console.log('asi va', this.subscription);
    });
  }

  create() {
    console.log(this.theFormGroup.controls)
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }
    console.log(this.subscription)
    this.serviceSubscription.create(this.subscription).subscribe(() => {
      Swal.fire(
        "Creación exitosa",
        "La suscripción ha sido creada exitosamente",
        "success"
      );
      if (this.customerId) {
        this.route.navigate(["customers", this.customerId, "subscriptions", "list"]);
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
        this.route.navigate(["customers", this.customerId, "subscriptions", "list"]);
      } else {
        this.route.navigate(["plans", this.planId, "subscriptions", "list"]);
      }
    });
  }
}
