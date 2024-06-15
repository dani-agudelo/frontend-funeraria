import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cremation } from 'src/app/models/cremation.model';
import { Service } from 'src/app/models/service.model';
import { CremationService } from 'src/app/services/cremation.service';
import { ServicesService } from 'src/app/services/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number;
  cremation: Cremation;
  headquarterId: number;
  roomId: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private parent: ActivatedRoute,
    private serviceCremation: CremationService,
    private serviceService: ServicesService,
    private route: Router,
    private theFormBuilder: FormBuilder,
  ) {
    this.mode = 1;
    this.trySend = false;

    this.cremation = {
      id: 0,
      location: '',
      date: null,
      price: null,
      is_available: null,
      room_id: 0,
      service_id: 0,
    };
    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      location: [null, [Validators.required, Validators.maxLength(255)]],
      date: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.min(1), Validators.max(999999999)]],
      is_available: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.roomId = Number(this.parent.snapshot.params.idRoom);
    this.headquarterId = this.parent.snapshot.params.idHeadquarter;
    this.cremation.room_id = this.roomId;
    this.serviceService.getServiceByName("Cremation").subscribe((dataService: Service) => {
      console.log(dataService[0])
      this.cremation.service_id = dataService[0].id;
    });
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
      this.cremation.id = this.parent.snapshot.params.id;
      this.getCremation(this.cremation.id.toString());
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

  getCremation(id: string) {
    //obtener el servicio por el nombre

    this.serviceCremation.view(id).subscribe((data: Cremation) => {
      console.log(data);
      this.cremation = data;
      const isAvailable = this.cremation.is_available ? true : false;
      this.theFormGroup.get('is_available').setValue(isAvailable);
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }
    console.log(this.cremation)
    this.serviceCremation.create(this.cremation).subscribe(() => {
      Swal.fire(
        "Creación exitosa",
        "La cremacion ha sido creada exitosamente",
        "success"
      );
      this.route.navigate(["headquarters", this.headquarterId, "rooms", this.roomId, "cremations", "list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }

    console.log(this.cremation)
    this.serviceCremation.update(this.cremation).subscribe(() => {
      Swal.fire(
        "Actualización exitosa",
        "La cremacion ha sido actualizada exitosamente",
        "success"
      );
      this.route.navigate(["headquarters", this.headquarterId, "rooms", this.roomId, "cremations", "list"]);
    });
  }
}
