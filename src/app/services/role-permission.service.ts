import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Permission } from "../models/permission.model";
import { RolePermission } from "../models/role-permission.model";
import { Role } from "../models/role.model";

@Injectable({
  providedIn: "root",
})
export class RolePermissionService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_security}/role-permission`;
  }

  getRolePermissionsByRole(roleId: string): Observable<RolePermission[]> {
    return this.http.get<RolePermission[]>(`${this.baseUrl}/role/${roleId}`);
  }

  create(rp: RolePermission): Observable<RolePermission> {
    return this.http.post<RolePermission>(
      `${this.baseUrl}/role/${rp.role._id}/permission/${rp.permission._id}`,
      null,
    );
  }

  delete(id: string): Observable<RolePermission> {
    return this.http.delete<RolePermission>(`${this.baseUrl}/${id}`);
  }
}
