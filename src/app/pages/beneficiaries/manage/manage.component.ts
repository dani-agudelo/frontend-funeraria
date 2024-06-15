import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Beneficiary } from "src/app/models/beneficiary.model";
import { Customer } from "src/app/models/customer.model";
import { BeneficiaryService } from "src/app/services/beneficiary.service";
import { CustomerService } from "src/app/services/customer.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  beneficiary: Beneficiary;
  customers: Customer[];
  mode: number;
  ownerId: string;
  theFormGroup: FormGroup;
  trySend: boolean;
  url: string;

  constructor(
    private parent: ActivatedRoute,
    private router: Router,
    private service: BeneficiaryService,
    private serviceCustomer: CustomerService,
    private theFormBuilder: FormBuilder,
  ) {
    this.customers = [];
    this.mode = 1;
    this.trySend = false;
    this.url =
      this.parent.snapshot["_routerState"].url.match(/(?<=^\/).+(?=\/)/gim)[0];
    this.beneficiary = {};

    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      name: [
        null,
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
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
          Validators.pattern("^[0-9]*$"),
        ],
      ],
      age: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(3),
          Validators.pattern("^[0-9]*$"),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.listCustomers();
    this.list();
  }

  list() {
    const currentUrl = this.parent.snapshot.url.join("/");

    if (currentUrl.includes("view")) {
      this.theFormGroup.disable();
      this.mode = 1;
    } else if (currentUrl.includes("update")) {
      this.mode = 2;
    } else if (currentUrl.includes("create")) {
      this.mode = 3;
    }

    if (this.parent.snapshot.params.id) {
      this.getBeneficiary(this.parent.snapshot.params.id);
    }
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  async getBeneficiary(id: string) {
    this.service.view(id).subscribe((data: Beneficiary) => {
      this.beneficiary = data[0];
    });
  }

  async listCustomers() {
    this.serviceCustomer.getCustomers().subscribe((data: Customer[]) => {
      this.customers = data;
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }
    this.service.create(this.beneficiary).subscribe(() => {
      Swal.fire(
        "Creación exitosa",
        "Se ha creado un nuevo registro",
        "success",
      );
      this.router.navigate([this.url.match(/.+(?<=\/).\/\w+/gim)[0], "list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }

    this.service.update(this.beneficiary).subscribe(() => {
      Swal.fire(
        "Actualización exitosa",
        "Cliente actualizado correctamente",
        "success",
      );
      this.router.navigate([this.url.match(/.+(?<=\/).\/\w+/gim)[0], "list"]);
    });
  }
}
