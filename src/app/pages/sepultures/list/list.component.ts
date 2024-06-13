import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sepulture } from 'src/app/models/sepulture.model';
import { SepultureService } from 'src/app/services/sepulture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  sepultures: Sepulture[];
  roomId: string;
  headquarterId: string;

  constructor(
    private service: SepultureService,
    private parent: ActivatedRoute,
    private router: Router,
  ) {
    this.sepultures = [];
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
      this.service.getSepulturesByRoom(this.roomId).subscribe((data: Sepulture[]) => {
        this.sepultures = data;
        console.log('sepulturessss', this.sepultures);
      });
    } else {
      this.service.getSepultures().subscribe((data: Sepulture[]) => {
        this.sepultures = data;
      });
    }
  }

  create() {

    console.log('create de sepulture')
    // necesito esta ruta // http://localhost:4200/#/headquarters/1/rooms/1/payments/create
    this.router.navigate(['headquarters', this.headquarterId, 'rooms', this.roomId, 'sepultures', 'create']);
  }

  view(id: string) {
    this.router.navigate(['headquarters', this.headquarterId, 'rooms', this.roomId, 'sepultures', 'view', id]);
  }

  update(id: string) {
    this.router.navigate(['headquarters', this.headquarterId, 'rooms', this.roomId, 'sepultures', 'update', id]);
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
