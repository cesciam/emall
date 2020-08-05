import { Component, OnInit } from '@angular/core';
import { PromocionService } from 'src/app/services/promocion.service';
import { Promocion } from 'src/app/models/promocion';

@Component({
  selector: 'app-featured-spad',
  templateUrl: './featured-spad.component.html',
  styleUrls: ['./featured-spad.component.css']
})
export class FeaturedSpadComponent implements OnInit {
  promociones: Promocion[];

  constructor(private service: PromocionService) { }

  ngOnInit() {
    this.service.obtenerPromociones()
    .subscribe(
      (data: Promocion[]) => this.promociones = data,
      (err: any) => console.log(err)
      
    );
  }

}
