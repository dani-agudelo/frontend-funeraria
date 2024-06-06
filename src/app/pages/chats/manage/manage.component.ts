import Swal from "sweetalert2";
import { ActivatedRoute, Router } from "@angular/router";
import { Chat } from "src/app/models/chat.model";
import { ChatService } from "src/app/services/chat.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  chat: Chat;
  mode: number;
  serviceExecutionId: string;
  theFormGroup: FormGroup;
  trySend: boolean;
  url: string;

  constructor(
    private parent: ActivatedRoute,
    private router: Router,
    private serviceChat: ChatService,
    private theFormBuilder: FormBuilder,
  ) {
    this.mode = 1;
    this.trySend = false;
    this.url =
      this.parent.snapshot["_routerState"].url.match(/(?<=^\/).+(?=\/)/gim)[0];

    this.chat = {
      id: "",
      status: null,
      service_execution_id: this.parent.snapshot.params.idServiceExecution,
      service_execution: {},
    };

    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      status: [
        null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(1)],
      ],
      service_execution_id: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
    });
  }

  ngOnInit(): void {
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
      this.chat.id = this.parent.snapshot.params.id;
      this.getChat(this.chat.id);
    }
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  async getChat(id: string) {
    this.serviceChat.view(id).subscribe((data: Chat) => {
      this.chat = data;
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      this.trySend = true;
      return;
    }

    this.serviceChat.create(this.chat).subscribe(() => {
      Swal.fire("¡Hecho!", "Chat creado exitosamente", "success");
      this.router.navigate([this.url.match(/.+(?<=\/).\/\w+/gim)[0], "list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      this.trySend = true;
      return;
    }

    this.serviceChat.update(this.chat).subscribe(() => {
      Swal.fire(
        "actualización con exito",
        "Chat actualizado correctamente",
        "success",
      );
      this.router.navigate([this.url.match(/.+(?<=\/).\/\w+/gim)[0], "list"]);
    });
  }
}
