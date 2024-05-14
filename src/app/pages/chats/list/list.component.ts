import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Chat } from "src/app/models/chat.model";
import { ChatService } from "src/app/services/chat.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  chats: Chat[];
  customerId: string;
  constructor(
    private service: ChatService,
    private parent: ActivatedRoute,
    private router: Router,
  ) {
    this.chats = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    console.log(this.parent.snapshot.params);
    const id = this.parent.snapshot.params.id;
    if (id) {
      console.log(id);
      this.customerId = this.parent.snapshot.params.idCustomer;
      this.service
        .getChatsByServiceAndCustomer(this.customerId, id)
        .subscribe((data: Chat[]) => {
          this.chats = data;
        });
    } else {
      this.service.getChats().subscribe((data: Chat[]) => {
        this.chats = data;
      });
    }
  }

  create() {
    this.router.navigate(["chats/create"]);
  }

  view(id: string) {
    this.router.navigate(["chats/view", id]);
  }

  update(id: string) {
    this.router.navigate(["chats/update", id]);
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
        this.service.delete(id).subscribe(() => {
          Swal.fire("Eliminado!", "El registro ha sido eliminado.", "success");
          this.ngOnInit();
        });
      }
    });
  }
}
