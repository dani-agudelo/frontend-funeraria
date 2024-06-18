import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Customer } from "src/app/models/customer.model";
import { Subscriptions } from "src/app/models/subscriptions.model";
import { SecurityService } from "src/app/services/security.service";
import { SubscriptionsService } from "src/app/services/subscriptions.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  subscriptions: Subscriptions[];
  customerId: string;
  planId: string;
  restrict: boolean;

  constructor(
    private securityService: SecurityService,
    private service: SubscriptionsService,
    private parent: ActivatedRoute,
    private router: Router,
  ) {
    this.subscriptions = [];
    this.restrict = false;
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    // we get the customer id from the parent route
    this.customerId = this.parent.snapshot.params.idCustomer;
    this.planId = this.parent.snapshot.params.idPlan;
    if (this.customerId) {
      // we get the subscriptions by customer
      this.service
        .getSubscriptionsByCustomer(this.customerId)
        .subscribe((data: Subscriptions[]) => {
          console.log("de cliente", data);
          this.subscriptions = data;
        });
    } else if (this.planId) {
      // we get the subscriptions by plan
      this.service
        .getSubscriptionsByPlan(this.planId)
        .subscribe((data: Subscriptions[]) => {
          console.log("de plan", data);
          this.subscriptions = data;
        });
    } else {
      this.securityService.getCustomer().subscribe((customer: Customer) => {
        this.restrict = true;

        if (customer) {
          this.service
            .getSubscriptionsByCustomer(customer.id.toString())
            .subscribe((data: Subscriptions[]) => {
              this.subscriptions = data;
            });
        }
      });

      if (this.restrict) {
        this.service.getSubscriptions().subscribe((data: Subscriptions[]) => {
          this.subscriptions = data;
        });
      }
    }
  }

  create() {
    if (this.customerId) {
      this.router.navigate([
        "customers",
        this.customerId,
        "subscriptions",
        "create",
      ]);
    } else {
      this.router.navigate(["plans", this.planId, "subscriptions", "create"]);
    }
  }

  view(id: string) {
    if (this.restrict) {
      this.router.navigate(["subscriptions", "view", id]);
      return;
    }

    if (this.customerId) {
      this.router.navigate([
        "customers",
        this.customerId,
        "subscriptions",
        "view",
        id,
      ]);
    } else {
      this.router.navigate(["plans", this.planId, "subscriptions", "view", id]);
    }
  }

  update(id: string) {
    if (this.customerId) {
      this.router.navigate([
        "customers",
        this.customerId,
        "subscriptions",
        "update",
        id,
      ]);
    } else {
      this.router.navigate([
        "plans",
        this.planId,
        "subscriptions",
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
        this.service.delete(id).subscribe({
          next: () => {
            Swal.fire(
              "Eliminado!",
              "El registro ha sido eliminado.",
              "success",
            );
            this.ngOnInit();
          },
          error: (err) => {
            if (err.status === 400) {
              Swal.fire("Error", "No se pudo eliminar el registro.", "error");
            }
          },
        });
      }
    });
  }
}
