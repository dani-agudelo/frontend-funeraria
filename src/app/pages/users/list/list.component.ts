import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  users: User[];
  constructor(
    private service: UserService,
    private route: Router,
  ) {
    this.users = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.getUsers().subscribe((data) => {
      this.users = data.map((user: any) =>({
          id: user?._id,
          name: user?.name,
          email: user?.email,
          role: user?.role?.name.toLowerCase(),
        }));
    });
  }

  create() {
    this.route.navigate(["users/create"]);
  }

  view(id: string) {
    this.route.navigate(["users/view", id]);
  }

  update(id: string) {
    this.route.navigate(["users/update", id]);
  }

  delete(id: string) {
    this.service.delete(id).subscribe(() => {
      this.list();
    });
  }
}
