import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Room } from "src/app/models/room.model";
import { RoomService } from "src/app/services/room.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number;
  room: Room;
  headquarterId: number;
  roomId: string;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private parent: ActivatedRoute,
    private service: RoomService,
    private route: Router,
    private theFormBuilder: FormBuilder,
  ) {
    this.mode = 1;
    this.trySend = false;

    this.room = {
      id: 0,
      headquarter_id: 0,
      room_name: "",
      room_capacity: null,
      facilities: "",
      is_available: null,
    };
    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      room_name: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      room_capacity: [null, [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]],
      facilities: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      is_available: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.headquarterId = Number(this.parent.snapshot.params.idHeadquarter);
    this.room.headquarter_id = this.headquarterId;
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
      this.room.id = this.parent.snapshot.params.id;
      this.getRoom(this.room.id.toString());
    }

    // Escuchar los cambios en el formulario
    this.theFormGroup.valueChanges.subscribe(values => {
      // Convertir el valor de 'is_available' a un booleano
      if (values.is_available === 'true') {
        this.theFormGroup.get('is_available').setValue(true, { emitEvent: false });
      } else if (values.is_available === 'false') {
        this.theFormGroup.get('is_available').setValue(false, { emitEvent: false });
      }
    });


  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getRoom(id: string) {
    this.service.view(id).subscribe((data: Room) => {
      console.log(data);
      this.room = data;
      const isAvailable = this.room.is_available ? true : false;
      this.theFormGroup.get('is_available').setValue(isAvailable);
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }
    console.log(this.room)
    this.service.create(this.room).subscribe(() => {
      Swal.fire(
        "Creación exitosa",
        "La sala ha sido creada exitosamente",
        "success"
      );
      this.route.navigate(["headquarters", this.headquarterId, "rooms", "list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }

    console.log(this.room)
    this.service.update(this.room).subscribe(() => {
      Swal.fire(
        "Actualización exitosa",
        "La sala ha sido actualizada exitosamente",
        "success"
      );
      this.route.navigate(["headquarters", this.headquarterId, "rooms", "list"]);
    });
  }

  sepultures(id: string) {
    this.route.navigate(["headquarters", this.headquarterId, "rooms", id, "sepultures"]);
  }

  cremations(id: string) {
    this.route.navigate(["headquarters", this.headquarterId, "rooms", id, "cremations"]);
  }
}
