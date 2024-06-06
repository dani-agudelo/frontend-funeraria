import { Serviceexecution } from "./serviceexecution.model";

export class Chat {
  id?: string;
  status?: boolean;
  service_execution_id?: string;
  service_execution?: Serviceexecution;
}
