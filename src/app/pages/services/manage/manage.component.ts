import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Cremation } from "src/app/models/cremation.model";
import { Relocation } from "src/app/models/relocation.model";
import { Sepulture } from "src/app/models/sepulture.model";
import { Service } from 'src/app/models/service.model';
import { CremationService } from "src/app/services/cremation.service";
import { RelocationService } from "src/app/services/relocation.service";
import { SepultureService } from "src/app/services/sepulture.service";
import { ServicesService } from 'src/app/services/services.service';
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  typeService: number
  mode: number;
  currentService: any;
  service: Service;
  relocation: Relocation;
  cremation: Cremation;
  sepulture: Sepulture;
  theFormGroup: FormGroup;
  trySend: boolean;

  serviceAttributes: Array<{ name: string; type: string; value: any; }> = [];

  constructor(
    private parent: ActivatedRoute,
    private theFormBuilder: FormBuilder,
    private servicesService: ServicesService,
    private cremationService: CremationService,
    private sepultureService: SepultureService,
    private relocationService: RelocationService,
    private router: Router,
  ) {
    this.mode = 1;
    this.trySend = false;

    this.service = {
      id: 0,
      name_service: "",
    };

    this.relocation = {
      id: 0,
      origin: '',
      destination: '',
      date: new Date(),
      price: 0,
      is_available: false,
    };


    this.cremation = {
      id: 0,
      location: '',
      date: new Date(),
      price: 0,
      is_available: false
    };

    this.sepulture = {
      id: 0,
      description: '',
      cemetery_name: '',
      sepulture_type: '',
      price: 0,
      is_available: false
    };

    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      name_service: [null, [Validators.required]],
    });
  }

  get getCurrentService() {
    return this.currentService;
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
      this.service.id = this.parent.snapshot.params.id;
      this.getService(this.service.id.toString());
    }
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  async getService(id: string) {
    this.servicesService.view(id).subscribe((data: Service) => {
      this.service = data;
      if (this.service.name_service === 'Relocation') {
        this.typeService = 1;
      } else if (this.service.name_service === 'Cremation') {
        this.typeService = 2;
      } else if (this.service.name_service === 'Sepulture') {
        this.typeService = 3;
      }
      this.viewTypeService(this.typeService, id);
    });
  }


  setCurrentService() {
    switch (this.typeService) {
      case 1:
        this.currentService = this.relocation;
        this.serviceAttributes = [
          { name: 'origin', type: 'text', value: this.currentService.origin },
          { name: 'destination', type: 'text', value: this.currentService.destination },
          { name: 'date', type: 'date', value: this.currentService.date },
          { name: 'price', type: 'number', value: this.currentService.price },
          { name: 'is_available', type: 'checkbox', value: this.currentService.is_available }
        ]
        break;
      case 2:
        this.currentService = this.cremation;
        this.serviceAttributes = [
          { name: 'location', type: 'text', value: this.currentService.location },
          { name: 'date', type: 'date', value: this.currentService.date },
          { name: 'price', type: 'number', value: this.currentService.price },
          { name: 'is_available', type: 'checkbox', value: this.currentService.is_available }
        ]
        break;
      case 3:
        this.currentService = this.sepulture;
        console.log('sepulture jeje', this.currentService);
        this.serviceAttributes = [
          { name: 'Nombre de sepultura', type: 'text', value: this.currentService.sepulture_name },
          { name: 'Descripción', type: 'text', value: this.currentService.description },
          { name: 'Cementerio', type: 'text', value: this.currentService.cemetery_name },
          { name: 'Tipo de sepultura', type: 'text', value: this.currentService.sepulture_type },
          { name: 'Precio', type: 'number', value: this.currentService.price },
          { name: 'is_available', type: 'checkbox', value: this.currentService.is_available }
        ]
        break;
    }
  }

  async viewTypeService(tipo: number, id:string) {
    if (tipo === 1) {
      this.relocationService.view().subscribe((data: Relocation) => {
        console.log('relocation data', data);
        if (Array.isArray(data) && data.length > 0) {
          this.relocation = data[0];
          this.setCurrentService();
        } else {
          this.currentService = null;
        }
      });
    } else if (tipo === 2) {
      this.cremationService.view().subscribe((data: Cremation) => {
        if (Array.isArray(data) && data.length > 0) {
          this.cremation = data[0];
          this.setCurrentService();
        } else {
          this.currentService = null;
        }
      });
    } else if (tipo === 3) {
      this.sepultureService.view(id).subscribe((data: Sepulture) => {
        if (Array.isArray(data) && data.length > 0) {
          this.sepulture = data[0];
          this.setCurrentService();
        } else {
          this.currentService = null;
        }
      });
    }
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }
    this.servicesService.create(this.service).subscribe(() => {
      Swal.fire(
        "Creación exitosa",
        "Se ha creado un nuevo registro",
        "success",
      );
      this.router.navigate(["services/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }

    this.servicesService.update(this.service).subscribe(() => {
      Swal.fire(
        "Actualización exitosa",
        "Servicio actualizado correctamente",
        "success",
      );
      this.router.navigate(["services/list"]);
    });
  }

  createServiceWithAttributes() {
    this.router.navigate(["services", this.service.id, "create-attributes"]);
  }

  updateServiceWithAttributes(id: string) {
    this.router.navigate(["services", this.service.id, "update-attributes", id]);
  }

}
