import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plan } from 'src/app/models/plan.model';
import { PlanService } from 'src/app/services/plan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  //Se declara un arreglo de plans ya que se va a listar varios registros
  plans: Plan[]

  constructor(private service: PlanService, private router: Router) {
    this.plans = []
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.getPlans().subscribe(data => {
      this.plans = data;
      console.log(JSON.stringify(this.plans));
    })
  }

  view(id: number) {
    this.router.navigate(['plans/view/' + id]);
  }

  create() {
    this.router.navigate(["plans/create"])
  }

  update(id: number) {
    this.router.navigate(['plans/update/' + id]);
  }

  delete(id: string) {
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
            'Eliminado',
            'El registro ha sido eliminado',
            'success'
          );
          this.ngOnInit();
        });
      }
    })
  }
}
