import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Owner } from "src/app/models/owner.model";
import { OwnerService } from "src/app/services/owner.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  owners: Owner[];
  constructor(
    private service: OwnerService,
    private route: Router,
  ) {
    this.owners = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.getOwners().subscribe((data: Owner[]) => {
      this.owners = data;
    });
  }

  // on click, navigate to owners/:id/beneficiaries
  beneficiaries(id: string) {
    this.route.navigate(["owners", id, "beneficiaries"]);
  }

  create() {
    this.route.navigate(["owners/create"]);
  }

  view(id: string) {
    this.route.navigate(["owners/view", id]);
  }

  update(id: string) {
    this.route.navigate(["owners/update", id]);
  }

  delete(id: string) {
    Swal.fire({
      title: "¿Estás seguro de eliminar el registro?",
      text: "Esta acción no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe(() => {
          Swal.fire("Eliminado!", "El registro ha sido eliminado.", "success");
          this.ngOnInit();
        });
      }
    });
  }
}
