import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';
import { Archivo } from '../../models/Archivo';

@Component({
  selector: 'app-item-producto',
  templateUrl: './item-producto.component.html',
  styleUrls: ['./item-producto.component.css']
})
export class ItemProductoComponent implements OnInit {

  productos: Item[];
  tipo: string;


  constructor(private itemservice: ItemService) {
  }

  ngOnInit() {
    this.tipo = "Producto";
    this.itemservice.getItemTipo(this.tipo).subscribe(
      (data: Item[]) => this.productos = data,
      (err: any) => console.log(err)
    );
  }

}
