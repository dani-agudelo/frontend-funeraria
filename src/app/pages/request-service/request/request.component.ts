import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chat } from 'src/app/models/chat.model';
import { Headquarter } from 'src/app/models/headquarter.model';
import { Room } from 'src/app/models/room.model';
import { Service } from 'src/app/models/service.model';
import { Serviceexecution } from 'src/app/models/serviceexecution.model';
import { User } from 'src/app/models/user.model';
import { ChatService } from 'src/app/services/chat.service';
import { CustomerService } from 'src/app/services/customer.service';
import { HeadquarterService } from 'src/app/services/headquarter.service';
import { SecurityService } from 'src/app/services/security.service';
import { ServiceexecutionService } from 'src/app/services/serviceexecution.service';
import { ServicesService } from 'src/app/services/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  theUser: User;
  subscription: Subscription;
  serviceExecution: Serviceexecution;
  chat: Chat;
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
    private customerService: CustomerService,
    private chatService: ChatService,
    private theSecurityService: SecurityService,
    private formBuilder: FormBuilder,
    private parent: ActivatedRoute,
    private router: Router,
  ) {
    this.services = [];
    this.headquarters = [];
    this.rooms = [];
    this.trySend = false;
    
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
    this.subscription = this.theSecurityService.getUser().subscribe((data) => {
      this.theUser = data;
      this.getCustomerByUser();
      console.log('theUserrrr', this.theUser);
    });
  }

  get getFormGroup() {
    console.log(this.formGroup.controls);
    return this.formGroup.controls;
  }

  getCustomerByUser() {
    this.customerService.getCustomersByUser(this.theUser._id).subscribe((data) => {
      console.log('customerrrr', data);
      this.serviceExecution.customer_id = data.id;
    });
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
    this.service.create(this.serviceExecution).subscribe((newService) => {
      console.log('serv base',newService);
      this.chat = {
        id: null,
        service_execution_id: newService.id,
        code_chat: newService.unique_code,
        status: true
      }
      this.chatService.create(this.chat).subscribe((chat) => {
        console.log('chatbase',chat);
      });
      Swal.fire({
        title: '¡Solicitud creada!',
        text: 'El código del servicio y demás datos fueron enviados a su correo.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/home']);
        }
      });
    });
  }


}






