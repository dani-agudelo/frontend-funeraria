import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cremation } from 'src/app/models/cremation.model';
import { CremationService } from 'src/app/services/cremation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  cremations: Cremation[];
  roomId: string;
  headquarterId: string;

  constructor(
    private service: CremationService,
    private parent: ActivatedRoute,
    private router: Router,
  ) {
    this.cremations = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.headquarterId = this.parent.snapshot.params.idHeadquarter;
    this.roomId = this.parent.snapshot.params.idRoom;
    console.log('Id de la room: ' + this.roomId);
    console.log('Id del head...: ' + this.headquarterId);
    if (this.roomId && this.headquarterId) {
      this.service.getCremationsByRoom(this.roomId).subscribe((data: Cremation[]) => {
        this.cremations = data;
        console.log('cremations', this.cremations);
      });
    } else {
      this.service.getCremations().subscribe((data: Cremation[]) => {
        this.cremations = data;
      });
    }
  }

  create() {

    console.log('create de cremation')
    
    this.router.navigate(['headquarters', this.headquarterId, 'rooms', this.roomId, 'cremations', 'create']);
  }

  view(id: string) {
    this.router.navigate(['headquarters', this.headquarterId, 'rooms', this.roomId, 'cremations', 'view', id]);
  }

  update(id: string) {
    this.router.navigate(['headquarters', this.headquarterId, 'rooms', this.roomId, 'cremations', 'update', id]);
  }

  delete(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
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
    });
  }
}
