import { Customer } from "./customer.model";

export class Subscriptions {
    id?: number;
    customer_id?: number;
    customer?: Customer;
    plan_id?: number;
    start_date: Date;
    end_date: Date;
    montly_fee: number;
    is_paid: boolean;
    
}
