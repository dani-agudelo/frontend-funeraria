import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Serviceexecution } from "src/app/models/serviceexecution.model";
import { ServiceexecutionService } from "src/app/services/serviceexecution.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  serviceexecutions: Serviceexecution[];
  customerId: string;

  constructor(
    private service: ServiceexecutionService,
    private parent: ActivatedRoute,
    private router: Router,
  ) {
    this.serviceexecutions = [];
    this.customerId = this.parent.snapshot.params.idCustomer;
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service
      .getServiceexecutionsByCustomer(this.customerId)
      .subscribe((data: Serviceexecution[]) => {
        console.log(data);
        this.serviceexecutions = data;
      });
  }

  create() {
    this.router.navigate([
      "customers",
      this.customerId,
      "serviceexecutions",
      "create",
    ]);
  }

  view(id: number) {
    this.router.navigate([
      "customers",
      this.customerId,
      "serviceexecutions",
      "view",
      id,
    ]);
  }

  update(id: number) {
    this.router.navigate([
      "customers",
      this.customerId,
      "serviceexecutions",
      "update",
      id,
    ]);
  }

  delete(id: number) {
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
            Swal.fire("Eliminado!", "El registro ha sido eliminado.", "success");
            this.ngOnInit();
          },
          error: (err) => {
            if (err.status === 400) {
              Swal.fire("Error", "No se pudo eliminar el registro.", "error");
            }
          }
        });
      }
    });
  }
}
