import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Permission } from "src/app/models/permission.model";
import { PermissionService } from "src/app/services/permission.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number;
  methods: any;
  keys: string[];
  permission: Permission;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private parent: ActivatedRoute,
    private permissionService: PermissionService,
    private router: Router,
    private theFormBuilder: FormBuilder,
  ) {
    this.mode = 1;
    this.trySend = false;
    this.methods = {
      All: ["ALL"],
      GET: ["", "/?"],
      POST: [""],
      PUT: ["/?"],
      DELETE: ["/?"],
    };
    this.keys = Object.keys(this.methods);

    this.permission = {};

    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      url: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      method: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
    });
  }

  ngOnInit(): void {
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
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  create() {
    if (this.permission.method.match(/^ALL$/gim)) {
      delete this.methods["All"];

      Object.keys(this.methods).forEach((method: string) =>
        this.methods[method].forEach((key: string) =>
          this._create(`${this.permission.url}${key}`, method),
        ),
      );
    } else {
      this._create(this.permission.url, this.permission.method);
    }

    Swal.fire("Creación exitosa", "Se ha creado un nuevo registro", "success");

    this.router.navigate(["permissions/list"]);
  }

  _create(url: string, method: string) {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }

    this.permissionService.create({ url, method }).subscribe(() => {});
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }

    this.permissionService.update(this.permission).subscribe(() => {
      Swal.fire(
        "Actualización exitosa",
        "Cliente actualizado correctamente",
        "success",
      );
      this.router.navigate(["permissions/list"]);
    });
  }
}
