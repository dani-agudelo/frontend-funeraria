import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { User } from "src/app/models/user.model";
import { SecurityService } from "src/app/services/security.service";
import { WebSocketService } from "src/app/services/web-socket.service";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "ni-tv-2 text-primary",
    class: "2",
  },
  { path: "/icons", title: "Icons", icon: "ni-planet text-blue", class: "2" },
  {
    path: "/user-profile",
    title: "Perfil",
    icon: "ni-single-02 text-yellow",
    class: "1",
  },
  {
    path: "/verify-chat",
    title: "Chat",
    icon: "ni-chat-round text-red",
    class: "1",
  }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  theUser: User;
  subscription: Subscription;
  public menuItems: any[];
  public isCollapsed = true  ;

  constructor(
    private router: Router,
    private theSecurityService: SecurityService,
    private theWebSocketService: WebSocketService
  ) {}

  getSecurityService() {
    return this.theSecurityService;
  }

  ngOnInit() {
    if (this.theSecurityService.hasRole("Cliente")) {
      ROUTES.push({
        path: `/subscriptions`,
        title: "Suscripciones",
        icon: "ni-bullet-list-67 text-red",
        class: "2",
      });
    }
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
    this.subscription = this.theSecurityService.getUser().subscribe((data) => {
      this.theUser = data;
    });
    // this.theWebSocketService.setNameEvent('news');
    // this.theWebSocketService.callback.subscribe((data) => {
    //   console.log('Llegando desde el backend' + JSON.stringify(data));
    // })
  }
}
