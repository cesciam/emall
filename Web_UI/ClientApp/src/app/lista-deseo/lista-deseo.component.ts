import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { ListaDeseo } from '../models/lista-deseo';
import { Item } from '../models/item';
import { Usuario } from '../models/usuario.model';
import { ListaDeseoService } from '../services/lista-deseo.service';


@Component({
  selector: 'app-lista-deseo',
  templateUrl: './lista-deseo.component.html',
  styleUrls: ['./lista-deseo.component.css']
})
export class ListaDeseoComponent implements OnInit {


  id_usuario: number;
  id_item: number;
  lista: ListaDeseo;
  items: Array<Item>;
  error: any;


  constructor(private route: ActivatedRoute, private listaService: ListaDeseoService, private router: Router) {
    this.id_usuario = JSON.parse(localStorage.getItem('usuario-logueado')).usuario.Id;
    
  }

  ngOnInit() {

    this.llenar();
    
  }

  async llenar() {
    this.lista = await this.listaService.ObtenerLista(this.id_usuario);

    this.items = new Array<Item>();
    for (let i = 0; i < this.lista.items.length; i++) {
      this.items.push(this.lista.items[i])
    }
  }


  delete(id_item: number): void {

    

    this.listaService.deleteLista(this.id_usuario, id_item)
      .subscribe
      (
        (reponse) => this.llenar(),
        (error) => {
          this.error = error.error;
          window.scroll(0, 0);
        });


  }


}
