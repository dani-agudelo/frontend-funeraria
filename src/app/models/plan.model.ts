import { Subscriptions } from "./subscriptions.model";

export class Plan {
    id?: number;
    name: string;
    description: string;
    typePlan: string;
    subscription?: Subscriptions
}
