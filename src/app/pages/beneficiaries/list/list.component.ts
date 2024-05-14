import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Beneficiary } from "src/app/models/beneficiary.model";
import { BeneficiaryService } from "src/app/services/beneficiary.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  beneficiaries: Beneficiary[];
  ownerId: string;

  constructor(
    private service: BeneficiaryService,
    private parent: ActivatedRoute,
    private route: Router,
  ) {
    this.beneficiaries = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    const id = this.parent.snapshot.params.id;
    if (id) {
      console.log(id);
      this.ownerId = id;
      this.service
        .getBeneficiariesByOwner(id)
        .subscribe((data: Beneficiary[]) => {
          console.log(data)
          this.beneficiaries = data;
        });
    } else {
      this.service.getBeneficiaries().subscribe((data: Beneficiary[]) => {
        this.beneficiaries = data;
      });
    }
  }

  create() {
    this.route.navigate(["beneficiaries/create"]);
  }

  view(id: string) {
    this.route.navigate(["beneficiaries/view", id]);
  }

  update(id: string) {
    this.route.navigate(["beneficiaries/update", id]);
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
