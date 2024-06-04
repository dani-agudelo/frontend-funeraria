import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  services: any[] 

  constructor() { 
    // EJEMPLOS DE SERVICIOS
    this.services = [
      {name: 'Servicio 1', description: 'Descripción del servicio 1', price: 100},
      {name: 'Servicio 2', description: 'Descripción del servicio 2', price: 200},
      {name: 'Servicio 3', description: 'Descripción del servicio 3', price: 300},
    ]
  }

  ngOnInit(): void {
  }

}
