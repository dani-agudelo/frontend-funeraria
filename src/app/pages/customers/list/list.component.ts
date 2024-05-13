import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Customer } from "src/app/models/customer.model";
import { CustomerService } from "src/app/services/customer.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  customers: Customer[];
  constructor(
    private service: CustomerService,
    private router: Router,
  ) {
    this.customers = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.getCustomers().subscribe((data) => {
      console.log(data);
      this.customers = data;
    });
  }

  create() {
    this.router.navigate(["customers/create"]);
  }

  view(id: string) {
    this.router.navigate(["customers/view", id]);
  }

  update(id: string) {
    this.router.navigate(["customers/update", id]);
  }

  delete(id: string) {
    this.service.delete(id).subscribe(() => {
      this.list();
    });
  }
}
