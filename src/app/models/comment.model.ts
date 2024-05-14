import { Serviceexecution } from "./serviceexecution.model";

export class Comment {
    id?: number;
    user_id?: number;
    rating: number;
    comment: string;
    service_execution_id?: number;
    serviceexecutions?: Serviceexecution;
}
