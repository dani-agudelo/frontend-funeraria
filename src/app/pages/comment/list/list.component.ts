import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommentService } from "src/app/services/comment.service";
import Swal from "sweetalert2";
import { Commment } from "src/app/models/comment.model";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  comments: Commment[];
  customerId: string;
  serviceExecutionId: string;

  constructor(
    private service: CommentService,
    private parent: ActivatedRoute,
    private router: Router,
  ) {
    this.comments = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
   this.customerId = this.parent.snapshot.params.idCustomer;
    this.serviceExecutionId = this.parent.snapshot.params.idServiceExecution;
    console.log('Id de la ejecucion de servicio: ' + this.serviceExecutionId);
    console.log('Id del cliente: ' + this.customerId);
    //customers/:idCustomer/serviceexecutions/:idServiceExecution/comments
    if (this.serviceExecutionId && this.customerId) {
      this.service
        .getCommentsByServiceExecution(this.serviceExecutionId)
        .subscribe((data: Commment[]) => {
          this.comments = data;
        });
    } else {
      this.service.getComments().subscribe((data: Commment[]) => {
        this.comments = data;
      });
    }
  }

  create() {
    //customers/:idCustomer/serviceexecutions/:idServiceExecution/comments/create
    this.router.navigate(["customers", this.customerId, "serviceexecutions", this.serviceExecutionId, "comments", "create"]);
  }

  view(id: string) {
    this.router.navigate(["customers", this.customerId, "serviceexecutions", this.serviceExecutionId, "comments", "view", id]);
  }

  update(id: string) {
    this.router.navigate(["customers", this.customerId, "serviceexecutions", this.serviceExecutionId, "comments", "update", id]);
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
