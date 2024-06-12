import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Customer } from "src/app/models/customer.model";
import { CustomerService } from "src/app/services/customer.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number;
  customer: Customer;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private parent: ActivatedRoute,
    private theFormBuilder: FormBuilder,
    private serviceCustomer: CustomerService,
    private router: Router,
  ) {
    this.mode = 1;
    this.trySend = false;

    this.customer = {
      name: "",
      email: "",
      document: "",
      phone: "",
      gender: "",
    };

    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      document: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
          Validators.pattern("^[0-9]*$"),
        ],
      ],
      phone: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10),
          Validators.pattern("^[0-9]*$"),
        ],
      ],
      gender: [
        "",
        [Validators.required, Validators.minLength(1), Validators.maxLength(1)],
      ],
    });
  }

  ngOnInit(): void {
    const currentUrl = this.parent.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.theFormGroup.disable();
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }

    if (this.parent.snapshot.params.id) {
      this.customer.id = this.parent.snapshot.params.id;
      this.getCustomer(this.customer.id);
    }
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  subscriptions() {
    this.router.navigate(["customers", this.customer.id, "subscriptions"]);
  }

  serviceexecutions() {
    this.router.navigate(["customers", this.customer.id, "serviceexecutions"]);
  }

  async getCustomer(id: string) {
    this.serviceCustomer.view(id).subscribe((data) => {
      this.customer = data[0];
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }
    this.serviceCustomer.create(this.customer).subscribe(() => {
      Swal.fire(
        "Creación exitosa",
        "Se ha creado un nuevo registro",
        "success",
      );
      this.router.navigate(["customers/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }

    this.serviceCustomer.update(this.customer).subscribe(() => {
      Swal.fire(
        "Actualización exitosa",
        "Cliente actualizado correctamente",
        "success",
      );
      this.router.navigate(["customers/list"]);
    });
  }
}
