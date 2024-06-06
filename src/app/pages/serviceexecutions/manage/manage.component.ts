import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Service } from "src/app/models/service.model";
import { Serviceexecution } from "src/app/models/serviceexecution.model";
import { ServiceexecutionService } from "src/app/services/serviceexecution.service";
import { ServicesService } from "src/app/services/services.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number;
  serviceExecution: Serviceexecution;
  formGroup: FormGroup;
  services: Service[];
  trySend: boolean;

  constructor(
    private service: ServiceexecutionService,
    private servicesService: ServicesService,
    private formBuilder: FormBuilder,
    private parent: ActivatedRoute,
    private router: Router,
  ) {
    this.mode = 1;
    this.services = [];
    this.trySend = false;
    this.serviceExecution = {
      id: "",
      customer_id: this.parent.snapshot.params.idCustomer,
      service_id: "",
    };

    this.configFormGroup();
  }

  configFormGroup() {
    this.formGroup = this.formBuilder.group({
      idCustomer: [null, Validators.required],
      idService: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.servicesList();
    this.list();
  }

  get getFormGroup() {
    return this.formGroup.controls;
  }

  list() {
    const currentUrl = this.parent.snapshot.url.join("/");

    if (currentUrl.includes("view")) {
      this.mode = 1;
      this.formGroup.disable();
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }

    if (this.parent.snapshot.params.id) {
      this.serviceExecution.id = this.parent.snapshot.params.id;
      this.getServiceExecution(this.serviceExecution.id);
    }
  }

  getServiceExecution(id: string) {
    this.service.view(id).subscribe((data: Serviceexecution) => {
      this.serviceExecution = data;
    });
  }

  servicesList() {
    this.servicesService.getServices().subscribe((data: Service[]) => {
      console.log(data);
      this.services = data;
    });
  }

  create() {
    if (this.formGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }

    this.service.create(this.serviceExecution).subscribe(() => {
      this.router.navigate([
        "customers",
        this.serviceExecution.customer_id,
        "serviceexecutions",
        "list",
      ]);
    });
  }

  update() {
    if (this.formGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }

    this.service.update(this.serviceExecution).subscribe(() => {
      this.router.navigate([
        "customers",
        this.serviceExecution.customer_id,
        "serviceexecutions",
        "list",
      ]);
    });
  }

  chats() {
    console.log(this.serviceExecution.customer_id, this.serviceExecution.id);
    this.router.navigate([
      "customers",
      this.serviceExecution.customer_id,
      "serviceexecutions",
      this.serviceExecution.id,
      "chats",
    ]);
  }

  messages() {
    this.router.navigate([
      "customers",
      this.serviceExecution.customer_id,
      "serviceexecutions",
      this.serviceExecution.id,
      "messages",
    ]);
  }

  comments() {
    this.router.navigate([
      "customers",
      this.serviceExecution.customer_id,
      "serviceexecutions",
      this.serviceExecution.id,
      "comments",
    ]);
  }
}
