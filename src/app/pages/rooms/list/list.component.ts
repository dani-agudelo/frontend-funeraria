import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  rooms: Room[];
  headquarterId: string;

  constructor(
    private service: RoomService,
    private parent: ActivatedRoute,
    private router: Router,
  ) {
    this.rooms = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    // we get the customer id from the parent route
    this.headquarterId = this.parent.snapshot.params.idHeadquarter;
    if (this.headquarterId) {
      this.service.getRoomsByHeadquarter(this.headquarterId)
        .subscribe((data: Room[]) => {
          console.log(data);
          this.rooms = data;
        });
    } else {
      this.service.getRooms().subscribe((data: Room[]) => {
        this.rooms = data;
      });
    }
  }

  create() {
    this.router.navigate([
      "headquarters",
      this.headquarterId,
      "rooms",
      "create",
    ]);
  }

  view(id: string) {
    this.router.navigate([
      "headquarters",
      this.headquarterId,
      "rooms",
      "view",
      id,
    ]);
  }

  update(id: string) {
    this.router.navigate([
      "headquarters",
      this.headquarterId,
      "rooms",
      "update",
      id,
    ]);
  }

  delete(id: string) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe({
          next: () => {
            Swal.fire("Eliminado!", "El registro ha sido eliminado.", "success");
            this.ngOnInit();
          },
          error: (err) => {
            if (err.status === 400) {
              Swal.fire("Error", "No se pudo eliminar el registro. Hay sepulturas o cremaciones asociadas", "error");
            }
          }
        });
      }
    });
  }
}
