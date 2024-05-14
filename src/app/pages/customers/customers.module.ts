import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CustomersRoutingModule } from "./customers-routing.module";
import { FormsModule } from "@angular/forms";
import { ListComponent } from "./list/list.component";
import { ManageComponent } from "./manage/manage.component";

@NgModule({
  declarations: [ListComponent, ManageComponent],
  imports: [CommonModule, CustomersRoutingModule, FormsModule],
})
export class CustomersModule {}
