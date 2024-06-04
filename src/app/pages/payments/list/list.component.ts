import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from 'src/app/models/payment.model';
import { PaymentService } from 'src/app/services/payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  payments: Payment[];
  subscriptionId: string;
  customerId: string;

  constructor(
    private service: PaymentService,
    private parent: ActivatedRoute,
    private router: Router,
  ) {
    this.payments = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.customerId = this.parent.snapshot.params.idCustomer;
    this.subscriptionId = this.parent.snapshot.params.idSubscription;
    console.log('Id de la suscripcion: ' + this.subscriptionId);
    console.log('Id del cliente: ' + this.customerId);
    if (this.subscriptionId && this.customerId) {
      this.service.getPaymentsBySubscription(this.subscriptionId).subscribe((data: Payment[]) => {
        this.payments = data;
        console.log('paymentssssss', this.payments);
      });
    } else {
      this.service.getPayments().subscribe((data: Payment[]) => {
        this.payments = data;
      });
    }
  }

  create() {
    console.log(this.parent.snapshot.paramMap.get('idcustomer'));

    console.log('create de payment')
    // necesito esta ruta // http://localhost:4200/#/customers/1/subscriptions/1/payments/create
    this.router.navigate(['customers', this.customerId, 'subscriptions', this.subscriptionId, 'payments', 'create']);
  }

  view(id: string) {
    this.router.navigate(['customers', this.customerId, 'subscriptions', this.subscriptionId, 'payments', 'view', id]);
  }

  update(id: string) {
    this.router.navigate(['customers', this.customerId, 'subscriptions', this.subscriptionId, 'payments', 'update', id]);
  }

  delete(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe(() => {
          Swal.fire(
            'Eliminado',
            'El registro ha sido eliminado',
            'success'
          );
          this.ngOnInit();
        });
      }
    });
  }

}
