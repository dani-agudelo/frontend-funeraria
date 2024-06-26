import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Payment } from "src/app/models/payment.model";
import { PaymentService } from "src/app/services/payment.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number;
  payment: Payment;
  theFormGroup: FormGroup;
  subscriptionId: number;
  customerId: number;
  planId: number;
  trySend: boolean;
  restrict: boolean;

  constructor(
    private parent: ActivatedRoute,
    private service: PaymentService,
    private route: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.trySend = false;
    this.restrict = false;

    this.payment = {
      id: 1,
      amount: 0,
      payment_method: "",
      payment_date: null,
      subscription_id: 1,
    };

    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      amount: [0, [Validators.required, Validators.min(1)]],
      payment_method: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      payment_date: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.subscriptionId = Number(this.parent.snapshot.params.idSubscription);
    this.customerId = this.parent.snapshot.params.idCustomer;
    this.planId = this.parent.snapshot.params.idPlan;
    this.payment.subscription_id = this.subscriptionId;
    this.restrict = !(this.customerId && this.planId);
    
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
      this.payment.id = this.parent.snapshot.params.id;
      this.getPayment(this.payment.id.toString());
    }
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getPayment(id: string) {
    this.service.view(id).subscribe((data: Payment) => {
      this.payment = data;
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }

    this.service.create(this.payment).subscribe(
      () => {
        Swal.fire(
          "Creación exitosa",
          "Se ha creado un nuevo registro",
          "success"
        );
        if (this.customerId) {
          this.route.navigate([
            "customers",
            this.customerId,
            "subscriptions",
            this.subscriptionId,
            "payments",
            "list",
          ]);
        } else {
          this.route.navigate([
            "plans",
            this.planId,
            "subscriptions",
            this.subscriptionId,
            "payments",
            "list",
          ]);
        }
      },
      (error) => {
        console.error(error);
        if (error.status === 422 && error.error.errors[0].rule === "unique") {
          Swal.fire(
            "Error",
            "Ya existe un pago para esta suscripción en la fecha seleccionada",
            "error"
          );
        } else {
          Swal.fire("Error", "Ocurrió un error al crear el registro", "error");
        }
      }
    );
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }

    this.service.update(this.payment).subscribe(() => {
      Swal.fire(
        "Actualización exitosa",
        "Pago actualizado correctamente",
        "success"
      );
      if (this.customerId) {
        this.route.navigate([
          "customers",
          this.customerId,
          "subscriptions",
          this.subscriptionId,
          "payments",
          "list",
        ]);
      } else {
        this.route.navigate([
          "plans",
          this.planId,
          "subscriptions",
          this.subscriptionId,
          "payments",
          "list",
        ]);
      }
    });
  }
}
