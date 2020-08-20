import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';
import { Router } from "@angular/router";
import { SucursalService } from '../../services/sucursal.service';
import { Sucursal } from '../../models/Sucursal';

@Component({
  selector: 'app-item-sucursal',
  templateUrl: './item-sucursal.component.html',
  styleUrls: ['./item-sucursal.component.css']
})
export class ItemSucursalComponent implements OnInit {

  sucursal: Sucursal;
  sucursal_id: number;
  items_sucursal: Item[];
  private filtroItem = '';
  error: any;

  constructor(private route: ActivatedRoute, private itemservice: ItemService, private router: Router, private serviceSucursal: SucursalService) {
    this.sucursal_id = parseInt(this.route.snapshot.params['id_sucursal']);
    
  }

  ngOnInit() {
    this.sucursal_id = parseInt(this.route.snapshot.params['id_sucursal']);
    this.llenarItems();
    
  }

  async llenarItems() {
    this.itemservice.getItemSucursal(this.sucursal_id).subscribe(
      (data: Item[]) => this.items_sucursal = data,
      (err: any) => console.log(err)
    );

    this.sucursal = await this.serviceSucursal.obtenerSucursalItem(this.sucursal_id);
  }

  

  delete(id: number): void {
    this.itemservice.deleteItem(id)
      .subscribe
      (
        (reponse) => this.llenarItems(),
        (error) => {
          this.error = error.error;
          window.scroll(0, 0);
        });

     
  }


}
