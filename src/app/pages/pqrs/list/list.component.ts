import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pqr } from 'src/app/models/pqr.model';
import { PqrService } from 'src/app/services/pqr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  pqrs: Pqr[];

  constructor(
    private service: PqrService,
    private router: Router
  ) {
    this.pqrs = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.getPqrs().subscribe((data) => {
      this.pqrs = data;
    });
  }

  create() {
    this.router.navigate(["pqrs/create"]);
  }

  view(id: string) {
    this.router.navigate(["pqrs/view", id]);
  }

  update(id: string) {
    this.router.navigate(["pqrs/update", id]);
  }

  delete(id: string) {
    this.service.delete(id).subscribe({
      next: () => {
        this.ngOnInit();
      },
    });
  }

}
