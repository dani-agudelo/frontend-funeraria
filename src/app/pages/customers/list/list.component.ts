import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Customer } from "src/app/models/customer.model";
import { CustomerService } from "src/app/services/customer.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  customers: Customer[];
  constructor(
    private service: CustomerService,
    private router: Router,
  ) {
    this.customers = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.getCustomers().subscribe((data) => {
      console.log(data);
      this.customers = data;
    });
  }

  create() {
    this.router.navigate(["customers/create"]);
  }

  view(id: string) {
    this.router.navigate(["customers/view", id]);
  }

  update(id: string) {
    this.router.navigate(["customers/update", id]);
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
