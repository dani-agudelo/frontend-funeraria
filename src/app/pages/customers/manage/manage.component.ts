import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Console } from "console";
import { Customer } from "src/app/models/customer.model";
import { CustomerService } from "src/app/services/customer.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number;
  customer: Customer;
  theFormGroup: FormGroup;

  constructor(
    private parent: ActivatedRoute,
    private serviceCustomer: CustomerService,
    private serviceUser: UserService,
    private router: Router,
  ) {
    this.mode = 1;
    this.customer = {
      user_id: "1",
      name: "juan",
      email: "example@example.com",
      document: "12345678",
      phone: "12345678",
      gender: "M",
    };
  }

  ngOnInit(): void {
    const currentUrl = this.parent.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }

    if (this.parent.snapshot.params.id) {
      this.customer.id = this.parent.snapshot.params.id;
      this.getCustomer(this.customer.id);
    }
  }

  subscriptions() {
    this.router.navigate(["customers", this.customer.id, "subscriptions"]);
  }

  serviceexecutions() {
    this.router.navigate(["customers", this.customer.id, "serviceexecutions"]);
  }

  async getCustomer(id: string) {
    this.serviceCustomer.view(id).subscribe((data) => {
      console.log(data);
      this.customer = data[0];
    });
  }

  create() {
    const customer = {
      name: this.customer.name,
      email: this.customer.email,
      document: this.customer.document,
      phone: this.customer.phone,
      gender: this.customer.gender,
    };
    const user = {
      name: this.customer.name,
      email: this.customer.email,
      password: "123456",
    };
    this.serviceCustomer.create(customer).subscribe(() => {
      this.serviceUser.create(user).subscribe(() => {
        this.router.navigate(["customers/list"]);
      });
    });
  }

  update() {
    const customer = {
      id: this.customer.id,
      name: this.customer.name,
      email: this.customer.email,
      document: this.customer.document,
      phone: this.customer.phone,
      gender: this.customer.gender,
    };
    const user = {
      id: this.customer.user_id,
      name: this.customer.name,
      email: this.customer.email,
      password: "123456",
    };
    this.serviceCustomer.update(customer).subscribe(() => {
      this.serviceUser.update(user).subscribe(() => {
        this.router.navigate(["customers/list"]);
      });
    });
  }
}
