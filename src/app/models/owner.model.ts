import { Customer } from "./customer.model";

export class Owner {
  id?: string;
  name: string;
  email: string;
  start_date: string;
  end_date: string;
  customer_id: string;
  customer: Customer;
}
