import { Component, OnInit } from '@angular/core';
import { ComercioService } from '../../services/comercio.service';
import { Comercio } from '../../models/Comercio';

@Component({
  selector: 'app-cards-comercio',
  templateUrl: './cards-comercio.component.html',
  styleUrls: ['./cards-comercio.component.css']
})
export class CardsComercioComponent implements OnInit {
  private comercios: Comercio[];

  constructor(private comercioService: ComercioService) { }

  ngOnInit() {
    this.llenarComercios();
  }

  llenarComercios() {
    this.comercioService.obtenerTodoComercio()
      .subscribe(data => {
        this.comercios = data;
      });
  }

}
