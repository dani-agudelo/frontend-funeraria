import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Serviceexecution } from 'src/app/models/serviceexecution.model';
import { ServiceexecutionService } from 'src/app/services/serviceexecution.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  serviceexecutions: Serviceexecution[];
  constructor(
    private service: ServiceexecutionService,
    private router: Router,
  ) { 
    this.serviceexecutions = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.getServiceexecutions().subscribe((data) => {
      console.log(data);
      this.serviceexecutions = data;
    });
  }

  create() {
    this.router.navigate(["serviceexecutions/create"]);
  }

  view(id: string) {
    this.router.navigate(["serviceexecutions/view", id]);
  }

  update(id: string) {
    this.router.navigate(["serviceexecutions/update", id]);
  }

  delete(id: string) {
    this.service.delete(id).subscribe(() => {
      this.list();
    });
  }

}
