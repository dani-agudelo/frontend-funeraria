import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Serviceexecution } from 'src/app/models/serviceexecution.model';
import { ServiceexecutionService } from 'src/app/services/serviceexecution.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  serviceexecutions: Serviceexecution[];
  constructor(
    private service: ServiceexecutionService,
    private router: Router,
  ) { 
    this.serviceexecutions = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.getServiceexecutions().subscribe((data) => {
      console.log(data);
      this.serviceexecutions = data;
    });
  }

  create() {
    this.router.navigate(["serviceexecutions/create"]);
  }

  view(id: number) {
    this.router.navigate(["serviceexecutions/view", id]);
  }

  update(id: number) {
    this.router.navigate(["serviceexecutions/update", id]);
  }

  delete(id: number) {
    Swal.fire({
      title: '¿Estás seguro de eliminar el registro?',
      text: "Esta acción no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe(() => {
          Swal.fire(
            'Eliminado!',
            'El registro ha sido eliminado.',
            'success'
          );
          this.ngOnInit();
        });
      }
    });
  }

}
