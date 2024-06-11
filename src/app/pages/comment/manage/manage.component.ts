import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Commment } from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';
@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  comment: Commment;
  mode: number;
  customerId:string;
  serviceExecutionId: string;
  theFormGroup: FormGroup;
  trySend: boolean;
  userId: string;

  constructor(
    private parent: ActivatedRoute,
    private router: Router,
    private serviceComment: CommentService,
    private theFormBuilder: FormBuilder,
    private customerService: CustomerService,
  ) {
    this.mode = 1;
    this.trySend = false;

    this.comment = {
      user_id: "",
      id: "",
      rating: 0,
      comment: "",
      service_execution_id: this.parent.snapshot.params.idServiceExecution,
    };

    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      rating: [
        null,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(5),
        ],
      ],
      comment: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(500),
        ],
      ]
    });
  }

  ngOnInit(): void {
    this.customerId = this.parent.snapshot.params.idCustomer;
    this.serviceExecutionId = this.parent.snapshot.params.idServiceExecution;
    this.comment.service_execution_id = this.serviceExecutionId;
    this.getCustomer(this.customerId);
    const currentUrl = this.parent.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      this.theFormGroup.disable();
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }

    if (this.parent.snapshot.params.id) {
      this.comment.id = this.parent.snapshot.params.id;
      this.getComment(this.comment.id);
    }
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  async getComment(id: string) {
    this.serviceComment.view(id).subscribe((data: Commment) => {
      this.comment = data;
    });
  }

  async getCustomer(id: string) {
    this.customerService.view(id).subscribe((data) => {
      this.userId = data[0].user_id;
      this.comment.user_id = this.userId;
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      this.trySend = true;
      return;
    }
    console.log(this.comment);
    this.serviceComment.create(this.comment).subscribe(() => {
      Swal.fire("¡Hecho!", "Comentario creado exitosamente", "success");
      this.router.navigate(['customers',this.customerId, 'serviceexecutions', this.serviceExecutionId, 'comments', "list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      this.trySend = true;
      return;
    }

    this.serviceComment.update(this.comment).subscribe(() => {
      Swal.fire(
        "Actualización exitosa",
        "Comentario actualizado correctamente",
        "success",
      );
      this.router.navigate(['customers',this.customerId, 'serviceexecutions', this.serviceExecutionId, 'comments', "list"]);
    });
  }
}
