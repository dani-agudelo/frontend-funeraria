import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Serviceexecution } from "src/app/models/serviceexecution.model";
import { ServiceexecutionService } from "src/app/services/serviceexecution.service";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number;
  serviceExecution: Serviceexecution;
  FormGroup: FormGroup;

  constructor(
    private service: ServiceexecutionService,
    private parent: ActivatedRoute,
    private router: Router,
  ) {
    this.mode = 1;
    this.serviceExecution = {
      id: "1",
      service_id: "1",
      customer_id: "1",
    };
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    const currentUrl = this.parent.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }

    if (this.parent.snapshot.params.id) {
      this.serviceExecution.id = this.parent.snapshot.params.id;
      this.getServiceExecution(this.serviceExecution.id);
    }
  }

  getServiceExecution(id: string) {
    this.service.view(id).subscribe((data: Serviceexecution) => {
      this.serviceExecution = data;
    });
  }

  create() {
    this.service.create(this.serviceExecution).subscribe(() => {
      this.router.navigate(["serviceexecutions/list"]);
    });
  }

  update() {
    this.service.update(this.serviceExecution).subscribe(() => {
      this.router.navigate(["serviceexecutions/list"]);
    });
  }

  chats() {
    this.router.navigate([
      "customers",
      this.serviceExecution.customer_id,
      "serviceexecutions",
      this.serviceExecution.id,
      "chats",
    ]);
  }

  messages() {
    this.router.navigate([
      "customers",
      this.serviceExecution.customer_id,
      "serviceexecutions",
      this.serviceExecution.id,
      "messages",
    ]);
  }
}
