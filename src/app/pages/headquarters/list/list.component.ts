import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Headquarter } from 'src/app/models/headquarter.model';
import { HeadquarterService } from 'src/app/services/headquarter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  headquarters: Headquarter[];

  constructor(
    private service: HeadquarterService,
    private router: Router
  ) { 
    this.headquarters = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.getHeadquarters().subscribe((data) => {
      this.headquarters = data;
    });
  }

  create() {
    this.router.navigate(["headquarters/create"]);
  }

  view(id: string) {
    this.router.navigate(["headquarters/view", id]);
  }

  update(id: string) {
    this.router.navigate(["headquarters/update", id]);
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
