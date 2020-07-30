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

  delete(id: number): void {
    this.itemservice.deleteItem(id)
      .subscribe((err: any) => console.log(err));
    //window.location.reload();
  }


}
