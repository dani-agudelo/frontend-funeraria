import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ServicePlan } from 'src/app/models/service-plan.model';
import { ServiceplanService } from 'src/app/services/serviceplan.service';
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  serviceplans: ServicePlan[];
  planId: string;

  constructor(
    private service: ServiceplanService,
    private parent: ActivatedRoute,
    private router: Router,
  ) {
    this.serviceplans = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.planId = this.parent.snapshot.params.idPlan;
    if (this.planId) {
      console.log(this.planId);
      // we get the subscriptions by customer
      this.service.getServicePlanByPlan(this.planId)
        .subscribe((data: ServicePlan[]) => {
          console.log(data);
          this.serviceplans = data;
        });
    } else {
      this.service.getServicePlans().subscribe((data: ServicePlan[]) => {
        this.serviceplans = data;
      });
    }
  }

  create() {
    this.router.navigate([
      "plans",
      this.planId,
      "serviceplans",
      "create",
    ]);
  }

  view(id: string) {
    this.router.navigate([
      "plans",
      this.planId,
      "serviceplans",
      "view",
      id,
    ]);
  }

  update(id: string) {
    this.router.navigate([
      "plans",
      this.planId,
      "serviceplans",
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
        this.service.delete(id).subscribe({
          next: () => {
            Swal.fire("Eliminado!", "El registro ha sido eliminado.", "success");
            this.ngOnInit();
          },
          error: (err) => {
            if (err.status === 400) {
              Swal.fire("Error", "No se pudo eliminar el registro", "error");
            }
          }
        });
      }
    });
  }
}
