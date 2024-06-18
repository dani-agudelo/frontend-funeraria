import { Subscriptions } from "./subscriptions.model";

export class Payment {
    id?: number;
    amount: number;
    payment_method: string;
    payment_date: Date | string;
    subscription_id?: number;
    subscription?: Subscriptions;
}
