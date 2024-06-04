import { DatePipe } from '@angular/common';
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Payment } from 'src/app/models/payment.model';
import { PaymentService } from 'src/app/services/payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number;
  payment: Payment;
  theFormGroup: FormGroup;
  subscriptionId: number;
  customerId: number;


  constructor(
    private parent: ActivatedRoute,
    private service: PaymentService,
    private route: Router,
    private datePipe: DatePipe
  ) {
    this.mode = 1;

    this.payment = {
      id: 1,
      amount: 0,
      payment_method: "",
      payment_date: null,
      subscription_id: 1,
    }
  }

  ngOnInit(): void {
    this.subscriptionId = this.parent.snapshot.params.idSubscription;
    this.customerId = this.parent.snapshot.params.idCustomer;
    console.log('Id de la suscripcion: ' + this.subscriptionId);
    console.log('Id del cliente: ' + this.customerId);
    const currentUrl = this.parent.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }

    if (this.parent.snapshot.params.id) {
      this.payment.id = this.parent.snapshot.params.id;
      this.getPayment(this.payment.id.toString());
    }
  }

  getPayment(id: string) {
    this.service.view(id).subscribe((data: Payment) => {
      this.payment = data;
    });
  }

  create() {
    this.payment.subscription_id = this.subscriptionId;
    this.service.create(this.payment).subscribe(() => {
      Swal.fire(
        "Creación exitosa",
        "Se ha creado un nuevo registro",
        "success",
      );
      this.route.navigate(["customers", this.customerId, "subscriptions", this.subscriptionId, "payments", "list"]);
    });
  }

  update() {
    this.service.update(this.payment).subscribe(() => {
      this.route.navigate(["customers", this.customerId, "subscriptions", this.subscriptionId, "payments", "list"]);
    });
  }
}
