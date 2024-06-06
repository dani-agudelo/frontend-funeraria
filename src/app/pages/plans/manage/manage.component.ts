import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Plan } from 'src/app/models/plan.model';
import { PlanService } from 'src/app/services/plan.service';
import Swal from 'sweetalert2';

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number;
  plan: Plan;
  theFormGroup: FormGroup;
  trySend: boolean;


  constructor(
    private parent: ActivatedRoute,
    private service: PlanService,
    private route: Router,
    private theFormBuilder: FormBuilder,
  ) {
    this.mode = 1;
    this.trySend = false;

    this.plan = {
      id: 0,
      name: "",
      description: "",
      typePlan: "",
    };

    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      name: [
        null,
        [Validators.required, Validators.minLength(3)],
      ],
      description: [
        null,
        [Validators.required, Validators.minLength(3)],
      ],
      typePlan: [
        null,
        [Validators.required, Validators.minLength(3)],
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
      this.plan.id = this.parent.snapshot.params.id;
      this.getPlan(this.plan.id.toString());
    }
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getPlan(id: string) {
    this.service.view(id).subscribe((data: Plan) => {
      this.plan = data;
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }

    this.service.create(this.plan).subscribe(() => {
      Swal.fire(
        "Creación exitosa",
        "Se ha creado un nuevo registro",
        "success",
      );
      this.route.navigate(["plans/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }

    this.service.update(this.plan).subscribe(() => {
      Swal.fire(
        "Actualización exitosa",
        "Plan actualizado correctamente",
        "success",
      );
      this.route.navigate(["plans/list"]);
    });
  }
}
