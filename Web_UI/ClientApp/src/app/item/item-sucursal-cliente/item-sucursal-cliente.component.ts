import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';
import { Router } from "@angular/router";

@Component({
  selector: 'app-item-sucursal-cliente',
  templateUrl: './item-sucursal-cliente.component.html',
  styleUrls: ['./item-sucursal-cliente.component.css']
})
export class ItemSucursalClienteComponent implements OnInit {

  sucursal_id: number;
  items_sucursal: Item[];
  private filtroItem = '';

  constructor(private route: ActivatedRoute, private itemservice: ItemService, private router: Router) {
    this.sucursal_id = parseInt(this.route.snapshot.params['id_sucursal']);
  }

  ngOnInit() {
    this.sucursal_id = parseInt(this.route.snapshot.params['id_sucursal']);
    this.itemservice.getItemSucursal(this.sucursal_id).subscribe(
      (data: Item[]) => this.items_sucursal = data,
      (err: any) => console.log(err)
    );
  }

}
