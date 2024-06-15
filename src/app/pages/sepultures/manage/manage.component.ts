import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Sepulture } from 'src/app/models/sepulture.model';
import { SepultureService } from 'src/app/services/sepulture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number;
  sepulture: Sepulture;
  headquarterId: number;
  roomId: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private parent: ActivatedRoute,
    private service: SepultureService,
    private route: Router,
    private theFormBuilder: FormBuilder,
  ) {
    this.mode = 1;
    this.trySend = false;

    this.sepulture = {
      id: 0,
      sepulture_name: '',
      description: '',
      cemetery_name: '',
      sepulture_type: '',
      price: 0,
      is_available: false,
      room_id: 0,
      service_id: 0,
    };
    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      sepulture_name: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      description: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      cemetery_name: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      sepulture_type: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      price: [null, [Validators.required, Validators.min(1), Validators.max(999999999)]],
      is_available: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.roomId = Number(this.parent.snapshot.params.idRoom);
    this.headquarterId = this.parent.snapshot.params.idHeadquarter;
    this.sepulture.room_id = this.roomId;
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
      this.sepulture.id = this.parent.snapshot.params.id;
      this.getSepulture(this.sepulture.id.toString());
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

  getSepulture(id: string) {
    this.service.view().subscribe((data: Sepulture) => {
      console.log(data);
      this.sepulture = data;
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }
    console.log(this.sepulture)
    this.service.create(this.sepulture).subscribe(() => {
      Swal.fire(
        "Creación exitosa",
        "La sepultura ha sido creada exitosamente",
        "success"
      );
      this.route.navigate(["headquarters", this.headquarterId, "rooms", this.roomId, "sepultures", "list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }

    console.log(this.sepulture)
    this.service.update(this.sepulture).subscribe(() => {
      Swal.fire(
        "Actualización exitosa",
        "La sepultura ha sido actualizada exitosamente",
        "success"
      );
      this.route.navigate(["headquarters", this.headquarterId, "rooms", this.roomId, "sepultures", "list"]);
    });
  }
}
