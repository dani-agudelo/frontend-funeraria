import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Customer } from "src/app/models/customer.model";
import { Owner } from "src/app/models/owner.model";
import { CustomerService } from "src/app/services/customer.service";
import { OwnerService } from "src/app/services/owner.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  customers: Customer[];
  mode: number;
  owner: Owner;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private parent: ActivatedRoute,
    private router: Router,
    private serviceCustomer: CustomerService,
    private serviceOwner: OwnerService,
    private theFormBuilder: FormBuilder,
  ) {
    this.customers = [];
    this.mode = 1;
    this.trySend = false;
    this.owner = {
      id: "",
      name: "",
      email: "",
      start_date: "",
      end_date: "",
      customer_id: "",
      customer: {},
    };

    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      customer_id: [null, [Validators.required]],
      start_date: [null, [Validators.required]],
      end_date: [null, [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  ngOnInit(): void {
    this.getCustomers();
    this.list();
  }

  list() {
    const currentUrl = this.parent.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      this.theFormGroup.disable();
    } else if (currentUrl.includes("update")) {
      this.mode = 2;
    } else if (currentUrl.includes("create")) {
      this.mode = 3;
    }

    if (this.parent.snapshot.params.id) {
      this.owner.id = this.parent.snapshot.params.id;
      this.getOwner(this.owner.id);
    }
  }

  getCustomers() {
    this.serviceCustomer
      .getCustomersWithOutOwner()
      .subscribe((data: Customer[]) => {
        this.customers = data;
        console.log(this.customers);
      });
  }

  async getOwner(id: string) {
    this.serviceOwner.view(id).subscribe((data) => {
      this.owner = data[0];
      console.log(this.owner);
    });
  }

  beneficiaries() {
    this.router.navigate(["owners", this.owner.id, "beneficiaries"]);
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }

    this.serviceOwner.create(this.owner).subscribe(() => {
      Swal.fire(
        "Creación exitosa",
        "Se ha creado un nuevo registro",
        "success",
      );

      this.router.navigate(["owners/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }

    this.serviceOwner.update(this.owner).subscribe(() => {
      Swal.fire(
        "Actualización exitosa",
        "Titular actualizado correctamente",
        "success",
      );

      this.router.navigate(["owners/list"]);
    });
  }
}
