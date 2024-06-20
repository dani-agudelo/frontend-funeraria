import { Serviceexecution } from "./serviceexecution.model";

export class Chat {
  id?: number;
  status?: boolean;
  code_chat: string;
  service_execution_id?: string;
  service_execution?: Serviceexecution;
}
