import { Customer } from "./customer.model";
import { Headquarter } from "./headquarter.model";
import { Room } from "./room.model";
import { Service } from "./service.model";

export class Serviceexecution {
  id?: string;
  customer_id?: string;
  service_id?: string;
  unique_code?: string;
  service?: Service;
  headquarter_id?: number;
  headquarter?: Headquarter;
  room_id?: number;
  room?: Room;
  customer?: Customer;
}
