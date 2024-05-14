import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { ManageComponent } from "./manage/manage.component";

const routes: Routes = [
  { path: "", redirectTo: "list", pathMatch: "full" },
  { path: "list", component: ListComponent },
  { path: "create", component: ManageComponent },
  { path: "update/:id", component: ManageComponent },
  { path: "view/:id", component: ManageComponent },
  {
    path: ":idServiceExecution/chats",
    loadChildren: () =>
      import("../chats/chats.module").then((m) => m.ChatsModule),
  },
  {
    path: ":idServiceExecution/comments",
    loadChildren: () =>
      import("../comment/comment.module").then((m) => m.CommentModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceexecutionsRoutingModule {}
