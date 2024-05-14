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
  idServiceExecution: string;

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
    this.idServiceExecution = this.parent.snapshot.params.idServiceExecution;
    if (this.idServiceExecution) {
      this.service
        .getCommentsByServiceExecution(this.idServiceExecution)
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
    this.router.navigate(["comments/create"]);
  }

  view(id: string) {
    this.router.navigate(["comments/view", id]);
  }

  update(id: string) {
    this.router.navigate(["comments/update", id]);
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
