import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ServicePlan } from 'src/app/models/service-plan.model';
import { ServiceplanService } from 'src/app/services/serviceplan.service';
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number;
  servicePlan: ServicePlan;
  planId: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private parent: ActivatedRoute,
    private service: ServiceplanService,
    private router: Router,
    private theFormBuilder: FormBuilder,
  ) {
    this.mode = 1;
    this.trySend = false;

    this.servicePlan = {
      id: 0,
      service_id: 0,
      plan_id: 0,
    };
    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      service_id: [null, [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]],
    });
  }

  ngOnInit(): void {
    this.planId = Number(this.parent.snapshot.params.idPlan);
    this.servicePlan.plan_id = this.planId;
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
      this.servicePlan.id = this.parent.snapshot.params.id;
      this.getServicePlan(this.servicePlan.id.toString());
    }

    
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getServicePlan(id: string) {
    this.service.view(id).subscribe((data: ServicePlan) => {
      console.log(data);
      this.servicePlan = data;
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }
    console.log(this.servicePlan)
    this.service.create(this.servicePlan).subscribe(() => {
      Swal.fire(
        "Creación exitosa",
        "El servicio-plan ha sido creado exitosamente",
        "success"
      );
      this.router.navigate(["plans", this.planId,"serviceplans","list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }

    this.service.update(this.servicePlan).subscribe(() => {
      Swal.fire(
        "Actualización exitosa",
        "El servicio-plan ha sido actualizado exitosamente",
        "success"
      );
      this.router.navigate(["plans", this.planId,"serviceplans","list"]);
    });
  }
}

