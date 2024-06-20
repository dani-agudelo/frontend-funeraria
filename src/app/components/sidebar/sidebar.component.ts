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
    class: "1",
  },
  { path: "/icons", title: "Icons", icon: "ni-planet text-blue", class: "2" },
  {
    path: "/user-profile",
    title: "Perfil",
    icon: "ni-circle-08 text-yellow",
    class: "1",
  },
  {
    path: "/verify-chat",
    title: "Chat",
    icon: "ni-chat-round text-red",
    class: "1",
  },
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
  public isCollapsed = true;
  routesClient: RouteInfo[];
  routesAdmin: RouteInfo[];

  constructor(
    private router: Router,
    private theSecurityService: SecurityService,
    private theWebSocketService: WebSocketService,
  ) {
    this.routesClient = [
      {
        path: `/subscriptions`,
        title: "Suscripciones",
        icon: "ni-bullet-list-67 text-red",
        class: "2",
      },
    ];

    this.routesAdmin = [
      {
        path: "/permissions/list",
        title: "Permisos",
        icon: "ni ni-key-25 text-yellow",
        class: "2",
      },
      {
        path: "/roles/list",
        title: "Roles",
        icon: "ni ni-support-16 text-blue",
        class: "2",
      },
      {
        path: "/users/list",
        title: "Users",
        icon: "ni ni-single-02 text-blue",
        class: "2",
      },
      {
        path: "/customers/list",
        title: "Clientes",
        icon: "ni ni-single-02 text-blue",
        class: "2",
      },
      {
        path: "/owners/list",
        title: "Titulares",
        icon: "ni ni-single-02 text-blue",
        class: "2",
      },
    ];
  }

  getSecurityService() {
    return this.theSecurityService;
  }

  ngOnInit() {
    if (this.theSecurityService.hasRole("Cliente")) {
      ROUTES.push(...this.routesClient);
    }

    if (this.theSecurityService.hasRole("Administrador")) {
      ROUTES.push(...this.routesAdmin);
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
