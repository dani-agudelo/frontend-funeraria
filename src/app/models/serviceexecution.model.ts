import { Customer } from "./customer.model";

export class Serviceexecution {
    id?: number;
    customer_id?: number;
    customer?: Customer;
    service_id?: number;
}
