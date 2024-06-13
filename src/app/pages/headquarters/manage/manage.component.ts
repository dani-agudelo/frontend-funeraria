import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Headquarter } from 'src/app/models/headquarter.model';
import { HeadquarterService } from 'src/app/services/headquarter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  headquarter: Headquarter;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;
  cities: any[] = [];

  constructor(
    private parent: ActivatedRoute,
    private router: Router,
    private serviceHeadquarter: HeadquarterService,
    private theFormBuilder: FormBuilder,
  ) {
    this.mode = 1;
    this.trySend = false;

    this.headquarter = {
      id: "",
      name: "",
      adress: "",
      city: "",
      phone: "",
    };

    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      adress: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      city: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      phone: [
        "",
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern("^[0-9]*$"),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.serviceHeadquarter.getCities().subscribe((data: any) => {
      this.cities = data;
      this.cities.sort((a, b) => a.municipio.localeCompare(b.municipio));
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
      this.headquarter.id = this.parent.snapshot.params.id;
      this.getHeadquarter(this.headquarter.id);
    }
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  async getHeadquarter(id: string) {
    this.serviceHeadquarter.view(id).subscribe((data: Headquarter) => {
      this.headquarter = data;
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }
    console.log(this.headquarter);
    this.serviceHeadquarter.create(this.headquarter).subscribe(() => {
      Swal.fire(
        "Creación exitosa",
        "Se ha creado un nuevo registro",
        "success",
      );
      this.router.navigate(["headquarters/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }
    console.log(this.headquarter);
    this.serviceHeadquarter.update(this.headquarter).subscribe(() => {
      Swal.fire(
        "Actualización exitosa",
        "Sede actualizada correctamente",
        "success",
      );
      this.router.navigate(["headquarters/list"]);
    });
  }

  rooms() {
    this.router.navigate(["headquarters", this.headquarter.id, "rooms"]);
  }
}

