import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscriptions } from "src/app/models/subscriptions.model";
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

  constructor(
    private service: SubscriptionsService,
    private parent: ActivatedRoute,
    private router: Router,
  ) {
    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.customerId = this.parent.snapshot.params.idCustomer;
    if (this.customerId) {
      this.service
        .getSubscriptionsByCustomer(this.customerId)
        .subscribe((data: Subscriptions[]) => {
          console.log(data);
          this.subscriptions = data;
        });
    } else {
      this.service.getSubscriptions().subscribe((data: Subscriptions[]) => {
        this.subscriptions = data;
      });
    }
  }

  create() {
    this.router.navigate([
      "customers",
      this.customerId,
      "subscriptions",
      "create",
    ]);
  }

  view(id: string) {
    this.router.navigate([
      "customers",
      this.customerId,
      "subscriptions",
      "view",
      id,
    ]);
  }

  update(id: string) {
    this.router.navigate([
      "customers",
      this.customerId,
      "subscriptions",
      "update",
      id,
    ]);
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
          Swal.fire("Eliminado!", "El registro ha sido eliminado.", "success");
          this.ngOnInit();
        });
      }
    });
  }

  pagos(id: string) {
    this.router.navigate([
      "customers",
      this.customerId,
      "subscriptions",
      id,
      "payments",
      "list",
    ]);
  }
}
