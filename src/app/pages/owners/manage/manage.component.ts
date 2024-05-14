import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Owner } from "src/app/models/owner.model";
import { OwnerService } from "src/app/services/owner.service";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number;
  owner: Owner;
  theFormGroup: FormGroup;

  constructor(
    private parent: ActivatedRoute,
    private serviceOwner: OwnerService,
    private router: Router,
  ) {
    this.mode = 1;
    this.owner = {
      id: "1",
      customer_id: "1",
      name: "juan",
      email: "example@example.com",
      document: "12345678",
      start_date: "2021-01-01",
      end_date: "2021-12-31",
    };
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
      this.owner.id = this.parent.snapshot.params.id;
      this.getOwner(this.owner.id);
    }
  }

  beneciaries() {
    this.router.navigate(["owners", this.owner.id, "beneficiaries"]);
  }

  async getOwner(id: string) {
    this.serviceOwner.view(id).subscribe((data) => {
      this.owner = data[0];
    });
  }

  create() {
    const owner = {
      customer_id: this.owner.customer_id,
      start_date: this.owner.start_date,
      end_date: this.owner.end_date,
    };
    this.serviceOwner.create(owner).subscribe(() => {
      this.router.navigate(["owners/list"]);
    });
  }

  update() {
    const owner = {
      id: this.owner.id,
      customer_id: this.owner.customer_id,
      start_date: this.owner.start_date,
      end_date: this.owner.end_date,
    };
    this.serviceOwner.update(owner).subscribe(() => {
      this.router.navigate(["owners/list"]);
    });
  }
}
