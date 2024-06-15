import { Customer } from "./customer.model";

export class Beneficiary {
  id?: string;
  name?: string;
  email?: string;
  document?: string;
  age?: string;
  customer_id?: string;
  owner_id?: string;
  customer?: Customer;
}
