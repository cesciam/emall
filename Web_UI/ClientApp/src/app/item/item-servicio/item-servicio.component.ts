import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';
import { Archivo } from '../../models/Archivo';

@Component({
  selector: 'app-item-servicio',
  templateUrl: './item-servicio.component.html',
  styleUrls: ['./item-servicio.component.css']
})
export class ItemServicioComponent implements OnInit {

  servicios: Item[];
  tipo: string;

  constructor(private itemservice: ItemService) { }

  ngOnInit() {
    this.tipo = "Servicio";
    this.itemservice.getItemTipo(this.tipo).subscribe(
      (data: Item[]) => this.servicios = data,
      (err: any) => console.log(err)
    );
  }

}
