import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pqr } from 'src/app/models/pqr.model';
import { PqrService } from 'src/app/services/pqr.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  pqr: Pqr;
  mode: number;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private parent: ActivatedRoute,
    private router: Router,
    private servicePqr: PqrService,
    private theFormBuilder: FormBuilder,
  ) {
    this.mode = 1;
    this.trySend = false;

    this.pqr = {
      id: null,
      name: "",
      email: "",
      message: "",
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
      email: [
        "",
        [
          Validators.required,
          Validators.email,
        ],
      ],
      message: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(500),
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
      this.pqr.id = this.parent.snapshot.params.id;
      this.getPqr(this.pqr.id.toString());
    }
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getPqr(id: string) {
    this.servicePqr.view(id).subscribe((data: Pqr) => {
      this.pqr = data;
    });
  }

  create() {
    this.trySend = true;
    if (this.theFormGroup.valid) {
      this.servicePqr.create(this.pqr).subscribe({
        next: () => {
          this.router.navigate(["pqrs"]);
        },
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.theFormGroup.valid) {
      this.servicePqr.update(this.pqr).subscribe({
        next: () => {
          this.router.navigate(["pqrs"]);
        },
      });
    }
  }

  delete() {
    this.servicePqr.delete(this.pqr.id).subscribe({
      next: () => {
        this.router.navigate(["pqrs"]);
      },
    });
  }

}
