import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/models/service.model';
import { ServicesService } from 'src/app/services/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  services: Service[]

  constructor(
    private service: ServicesService,
    private parent: ActivatedRoute,
    private router: Router
  ) {
    this.services = []
  }
  ngOnInit(): void {
    this.list()
  }

  list() {
    this.service.getServices().subscribe((data: Service[]) => {
      this.services = data
    })
  }

  create() {
    this.router.navigate(['services/create'])
  }

  view(id: string) {
    this.router.navigate(['services/view', id])
  }

  update(id: string) {
    this.router.navigate(['services/update', id])
  }

  delete(id: string) {
    Swal.fire({
      title: "¿Estás seguro de eliminar el registro?",
      text: "Esta acción no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe(() => {
          Swal.fire("Eliminado!", "El registro ha sido eliminado.", "success");
          this.ngOnInit();
        });
      }
    });
  }

}
