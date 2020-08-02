import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';

@Component({
  selector: 'app-item-sucursal',
  templateUrl: './item-sucursal.component.html',
  styleUrls: ['./item-sucursal.component.css']
})
export class ItemSucursalComponent implements OnInit {


  sucursal_id: number;
  items_sucursal: Item[];
  private filtroItem = '';

  constructor(private route: ActivatedRoute, private itemservice: ItemService) {
    this.sucursal_id = parseInt(this.route.snapshot.params['id_sucursal']);
    //this.sucursal_id = 1;
  }

  ngOnInit() {
    this.sucursal_id = parseInt(this.route.snapshot.params['id_sucursal']);
    //this.sucursal_id = 1;

    this.itemservice.getItemSucursal(this.sucursal_id).subscribe(
      (data: Item[]) => this.items_sucursal = data,
      (err: any) => console.log(err)
    );
  }

  //delete(id: number): void {
  //  this.itemservice.deleteItem(id)
  //    .subscribe(
  //      (data: void) => {
  //        let index: number = this.items_sucursal.findIndex(item => item.id === id);
  //        this.items_sucursal.splice(index, 1);
  //      },
  //      (err: any) => console.log(err)
  //    );
  //  //window.location.reload();
  //}

  delete(id: number): void {
    this.itemservice.deleteItem(id)
      .subscribe(
        (data: void) => {
          let index: number = this.items_sucursal.findIndex(item => item.id === id);
          this.items_sucursal.splice(index, 1);
        },
        (err: any) => console.log(err)
      );
  }


}
