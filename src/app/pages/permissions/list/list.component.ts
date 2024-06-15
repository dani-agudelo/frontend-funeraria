import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Permission } from "src/app/models/permission.model";
import { PermissionService } from "src/app/services/permission.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  permissions: Permission[] = [];

  constructor(
    private service: PermissionService,
    private route: Router,
  ) {
    this.permissions = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.getPermissions().subscribe((data: Permission[]) => {
      this.permissions = data;
    });
  }

  create() {
    this.route.navigate(["permissions/create"]);
  }

  view(id: string) {
    this.route.navigate(["permissions/view", id]);
  }

  update(id: string) {
    this.route.navigate(["permissions/update", id]);
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
