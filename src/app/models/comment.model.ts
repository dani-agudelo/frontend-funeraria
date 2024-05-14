import { Serviceexecution } from "./serviceexecution.model";

export class Commment {
    id?: number;
    rating: number;
    comment: string;
    service_execution_id?: number;
    serviceexecutions?: Serviceexecution;
    created_at?: Date;
    updated_at?: Date;
}
