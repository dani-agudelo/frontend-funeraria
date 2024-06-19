import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Payment } from "src/app/models/payment.model";
import { PaymentService } from "src/app/services/payment.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  payments: Payment[];
  subscriptionId: string;
  planId: string;
  customerId: string;
  restrict: boolean;

  constructor(
    private service: PaymentService,
    private parent: ActivatedRoute,
    private router: Router
  ) {
    this.restrict = false;
    this.payments = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.planId = this.parent.snapshot.params.idPlan;
    this.customerId = this.parent.snapshot.params.idCustomer;
    this.subscriptionId = this.parent.snapshot.params.idSubscription;
    this.restrict = !(this.planId || this.customerId);

    if (this.subscriptionId) {
      this.service
        .getPaymentsBySubscription(this.subscriptionId)
        .subscribe((data: Payment[]) => {
          this.payments = data;
        });
    }
  }

  create() {
    if (this.customerId) {
      this.router.navigate([
        "customers",
        this.customerId,
        "subscriptions",
        this.subscriptionId,
        "payments",
        "create",
      ]);
    } else {
      this.router.navigate([
        "plans",
        this.planId,
        "subscriptions",
        this.subscriptionId,
        "payments",
        "create",
      ]);
    }
  }

  view(id: string) {
    if (this.restrict) {
      this.router.navigate([
        "subscriptions",
        this.subscriptionId,
        "payments",
        "view",
        id,
      ]);
      return;
    }

    if (this.customerId) {
      this.router.navigate([
        "customers",
        this.customerId,
        "subscriptions",
        this.subscriptionId,
        "payments",
        "view",
        id,
      ]);
    } else {
      this.router.navigate([
        "plans",
        this.planId,
        "subscriptions",
        this.subscriptionId,
        "payments",
        "view",
        id,
      ]);
    }
  }

  update(id: string) {
    if (this.customerId) {
      this.router.navigate([
        "customers",
        this.customerId,
        "subscriptions",
        this.subscriptionId,
        "payments",
        "update",
        id,
      ]);
    } else {
      this.router.navigate([
        "plans",
        this.planId,
        "subscriptions",
        this.subscriptionId,
        "payments",
        "update",
        id,
      ]);
    }
  }

  delete(id: string) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe(() => {
          Swal.fire("Eliminado", "El registro ha sido eliminado", "success");
          this.ngOnInit();
        });
      }
    });
  }
}
