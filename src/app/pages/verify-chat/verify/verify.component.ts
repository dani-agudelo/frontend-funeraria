import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';
import { ServiceexecutionService } from 'src/app/services/serviceexecution.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  theFormGroup: FormGroup;
  trySend: boolean;
  code: any;


  constructor(private router: Router, private theFormBuilder: FormBuilder, private serviceServiceExecution: ServiceexecutionService,
    private securityService: SecurityService) {
    this.trySend = false;
  }

  ngOnInit(): void {
    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      code: [null, [Validators.required, Validators.min(1)]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  verify() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error", "Por favor complete los campos requeridos", "error");
      return;
    }
    this.code = this.theFormGroup.get('code').value;
    // verificar si el código existe
    this.serviceServiceExecution.findCodeOfServiceExecution(this.code).subscribe({

      next: (response) => {
        console.log('serviciojmm', response);
        if (response) {
          if (!localStorage.getItem('code')) {
            localStorage.setItem('code', this.code);
          }
          if (this.securityService.existSession()) {
            this.router.navigate(['/chatsp', this.code]);
          } else {
            Swal.fire("Alert", "Por favor inicie sesión", "error");
            this.router.navigate(['/login']);
          }
        } else {
          Swal.fire("Error", "Código no encontrado", "error");
        }
      },
      error: (error) => {
        Swal.fire("Error", "Error al buscar el código", "error");
        console.log(this.code);
      }
    });
  }

}



