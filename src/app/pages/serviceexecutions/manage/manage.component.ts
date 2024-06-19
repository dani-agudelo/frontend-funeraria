import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Headquarter } from "src/app/models/headquarter.model";
import { Room } from "src/app/models/room.model";
import { Service } from "src/app/models/service.model";
import { Serviceexecution } from "src/app/models/serviceexecution.model";
import { HeadquarterService } from "src/app/services/headquarter.service";
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
  headquarters: Headquarter[];
  rooms: Room[];
  trySend: boolean;
  url: string;
  showHeadquarterAndRoom: boolean;

  constructor(
    private service: ServiceexecutionService,
    private servicesService: ServicesService,
    private headquarterService: HeadquarterService,
    private formBuilder: FormBuilder,
    private parent: ActivatedRoute,
    private router: Router,
  ) {
    this.mode = 1;
    this.services = [];
    this.headquarters = [];
    this.rooms = [];
    this.trySend = false;
    this.url =
      this.parent.snapshot["_routerState"].url.match(/^\/.+(?=\/)/gim)[0];

    this.serviceExecution = {
      id: null,
      customer_id: this.parent.snapshot.params.idCustomer,
      service: {
        id: null
      },
      headquarter: {
        id: null
      },
      room:{
        id: null
      }
    }

    this.configFormGroup();
  }

  configFormGroup() {
    this.formGroup = this.formBuilder.group({
      idService: [null, Validators.required],
      idHeadquarter: [null, Validators.required],
      idRoom: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.servicesList();
    this.headquarterList();
    this.roomListByHeadquarter();
    this.showHeadquarterAndRoomByService();
    this.list();
  }

  get getFormGroup() {
    console.log(this.formGroup.controls);
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
      console.log('sev', this.serviceExecution);
    });
  }

  servicesList() {
    this.servicesService.getServices().subscribe((data: Service[]) => {
      console.log(data);
      this.services = data;
    });
  }

  headquarterList() {
    this.headquarterService
      .getHeadquarters().subscribe((data: Headquarter[]) => {
        console.log(data);
        this.headquarters = data;
      });
  }

  showHeadquarterAndRoomByService() {
    this.formGroup.controls.idService.valueChanges.subscribe((value) => {
      if (value !== null && value !== undefined) {
        this.servicesService.view(value.toString()).subscribe((data: Service) => {
          console.log(data);
          this.showHeadquarterAndRoom = data.name_service !== 'Traslado';
  
          // Si el servicio es 'Traslado', elimina las validaciones de 'Sede' y 'Sala'
          if (data.name_service === 'Traslado') {
            this.formGroup.controls.idHeadquarter.clearValidators();
            this.formGroup.controls.idRoom.clearValidators();
          } else {
            // Si el servicio no es 'Traslado', agrega las validaciones necesarias
            this.formGroup.controls.idHeadquarter.setValidators([Validators.required]);
            this.formGroup.controls.idRoom.setValidators([Validators.required]);
          }
  
          // Actualiza el estado de las validaciones
          this.formGroup.controls.idHeadquarter.updateValueAndValidity();
          this.formGroup.controls.idRoom.updateValueAndValidity();
        })
      }
    });
  }

  roomListByHeadquarter() {
    this.formGroup.controls.idHeadquarter.valueChanges.subscribe((value) => {
      console.log(value)
      if (value) {
        this.headquarterService
          .getRoomsByHeadquarter(value).subscribe((data: Room[]) => {
            console.log('rooms de headquarter', data);
            this.rooms = data;
          });
      }
    });
  }

  create() {
    if (this.formGroup.invalid) {
      console.log(this.formGroup.controls);
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }
    console.log(this.serviceExecution)
    this.service.create(this.serviceExecution).subscribe(() => {
      this.router.navigate([this.url, "list"]);
    });
  }

  update() {
    if (this.formGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }

    this.service.update(this.serviceExecution).subscribe(() => {
      this.router.navigate([this.url.match(/^\/.+(?=\/)/gim)[0], "list"]);
    });
  }

  chats() {
    console.log(this.serviceExecution.customer_id, this.serviceExecution.id);
    this.router.navigate([
      this.url.match(/.+(?<=\/)/gim)[0],
      this.serviceExecution.id,
      "chats",
    ]);
  }

  comments() {
    this.router.navigate([
      this.url.match(/.+(?<=\/)/gim)[0],
      this.serviceExecution.id,
      "comments",
    ]);
  }
}
