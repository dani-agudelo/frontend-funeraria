import { Subscriptions } from "./subscriptions.model";

export class Payment {
    id?: number;
    amount: number;
    payment_method: string;
    payment_date: Date;
    subscription_id?: number;
    subscription?: Subscriptions;
    created_at?: Date;
    updated_at?: Date;
}
