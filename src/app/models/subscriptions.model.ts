import { Customer } from "./customer.model";
import { Plan } from "./plan.model";

export class Subscriptions {
    id?: number;
    customer_id?: number;
    customer?: Customer;
    plan_id?: number;
    plan?: Plan;
    start_date: Date;
    end_date: Date;
    monthly_fee: number;
}
