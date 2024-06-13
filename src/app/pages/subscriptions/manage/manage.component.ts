import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscriptions } from "src/app/models/subscriptions.model";
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
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private parent: ActivatedRoute,
    private service: SubscriptionsService,
    private route: Router,
    private theFormBuilder: FormBuilder,
  ) {
    this.mode = 1;
    this.trySend = false;

    this.subscription = {
      id: 0,
      customer_id: 0,
      plan_id: 0,
      start_date:null,
      end_date: null,
      monthly_fee: 0,
    };
    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      plan_id: [null, [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]],
      start_date: [null, [Validators.required]],
      end_date: [null, [Validators.required]],
      monthly_fee: [null, [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]],
    });
  }

  ngOnInit(): void {
    this.customerId = Number(this.parent.snapshot.params.idCustomer);
    this.subscription.customer_id = this.customerId;
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

  getSubscription(id: string) {
    this.service.view(id).subscribe((data: Subscriptions) => {
      console.log(data);
      this.subscription = data;
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }
    console.log(this.subscription)
    this.service.create(this.subscription).subscribe(() => {
      Swal.fire(
        "Creación exitosa",
        "La suscripción ha sido creada exitosamente",
        "success"
      );
      this.route.navigate(["customers", this.customerId,"subscriptions","list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }

    this.service.update(this.subscription).subscribe(() => {
      Swal.fire(
        "Actualización exitosa",
        "La suscripción ha sido actualizada exitosamente",
        "success"
      );
      this.route.navigate(["customers", this.customerId,"subscriptions","list"]);
    });
  }
}
