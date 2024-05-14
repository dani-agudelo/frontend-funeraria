import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Customer } from "src/app/models/customer.model";
import { CustomerService } from "src/app/services/customer.service";

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
    private service: CustomerService,
    private route: Router,
  ) {
    this.mode = 1;
    this.customer = {
      id: "1",
      user_id: '1',
      name: "juan",
      email: "example@example.com",
      document: "12345678",
      phone: "12345678",
      gender: "M",
    }
    }

  ngOnInit(): void {
    const currentUrl = this.parent.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("update")) {
      this.mode = 2;
    } else if (currentUrl.includes("create")) {
      this.mode = 3;
    }

      if (this.parent.snapshot.params.id) {
      this.customer.id = this.parent.snapshot.params.id;
      this.getCustomer(this.customer.id);
    }
    }

  getCustomer(id: string) {
    this.service.view(id).subscribe((data: Customer) => {
      console.log(data)
      this.customer = data;
     });
  }


  create() {
    this.service.create(this.customer).subscribe(() => {
      this.route.navigate(["customers/list"]);
    });
  }

  update() {
    this.service.update(this.customer).subscribe(() => {
      this.route.navigate(["customers/list"]);
    });
  }
}
