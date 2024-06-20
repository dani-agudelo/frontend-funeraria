import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "src/app/models/user.model";
import { RoleService } from "src/app/services/role.service";
import { SecurityService } from "src/app/services/security.service";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  theFormGroup: FormGroup;
  trySend: boolean;
  user: User;
  agree: boolean;

  constructor(
    private securityService: SecurityService,
    private theFormBuilder: FormBuilder,
  ) {
    this.trySend = false;
    this.user = {};
    this.agree = false;
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
        null,
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      agree: [null, [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  ngOnInit() {}

  create() {
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Formulario inválido", "error");
      return;
    }

    this.securityService.register(this.user).subscribe(
      (data: any) => {
        if (!data || data.error) {
          Swal.fire("Error", "Error creando el usuario", "error");
          return;
        }

        Swal.fire("Información", "Usuario creado correctamente", "success");
        this.trySend = false;
        this.user = {};
        this.theFormGroup.reset();
      },
      (error) => {
        Swal.fire("Error", "Error creando el usuario", "error");
      },
    );
  }
}
