import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';

@Component({
  selector: 'app-item-busqueda',
  templateUrl: './item-busqueda.component.html',
  styleUrls: ['./item-busqueda.component.css']
})
export class ItemBusquedaComponent implements OnInit {

  busqueda: Item[];
  palabra: string;

  constructor(private route: ActivatedRoute, private itemservice: ItemService) { }

  ngOnInit() {

    this.palabra = this.route.snapshot.params['busqueda'];
    this.itemservice.getItemBusqueda(this.palabra).subscribe(
      (data: Item[]) => this.busqueda = data,
      (err: any) => console.log(err)
    );


  }

}
