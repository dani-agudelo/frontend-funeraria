import { Customer } from "./customer.model";
import { Plan } from "./plan.model";

export class Subscriptions {
  id?: number;
  customer?: Customer;
  customer_id?: number;
  end_date?: Date;
  monthly_fee?: number;
  plan?: Plan;
  plan_id?: number;
  reference?: string;
  start_date?: Date;
  status?: boolean;
}
