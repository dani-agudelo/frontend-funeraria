import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscriptions } from "src/app/models/subscriptions.model";
import { SubscriptionsService } from "src/app/services/subscriptions.service";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number;
  subscription: Subscriptions;
  theFormGroup: FormGroup;

  constructor(
    private parent: ActivatedRoute,
    private service: SubscriptionsService,
    private route: Router,
  ) {
    this.mode = 1;
    this.subscription = {
      id: 1,
      customer_id: 1,
      plan_id: 1,
      start_date: new Date(),
      end_date: new Date(),
      monthly_fee: 1,
      is_paid: true,
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
      this.subscription.id = this.parent.snapshot.params.id;
      this.getSubscription(this.subscription.id.toString());
    }
  }

  getSubscription(id: string) {
    this.service.view(id).subscribe((data: Subscriptions) => {
      console.log(data);
      this.subscription = data;
    });
  }

  create() {
    this.service.create(this.subscription).subscribe(() => {
      this.route.navigate(["subscriptions/list"]);
    });
  }

  update() {
    this.service.update(this.subscription).subscribe(() => {
      this.route.navigate(["subscriptions/list"]);
    });
  }
}
