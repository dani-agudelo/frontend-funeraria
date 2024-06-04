import { Customer } from "./customer.model";
import { Service } from "./service.model";

export class Serviceexecution {
  id?: string;
  customer: Customer;
  service: Service;
}
