import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CitaService } from 'src/app/services/cita.service';
import { Cita } from 'src/app/models/Cita';
import { QrScannerComponent } from 'angular2-qrscanner';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-cita-detalles',
  templateUrl: './cita-detalles.component.html',
  styleUrls: ['./cita-detalles.component.css']
})
export class CitaDetallesComponent implements OnInit {
  

  cita: Cita = null;
  items: Item[] = null;
  constructor(private route: ActivatedRoute, private service: CitaService) { }

  ngOnInit() {
    let idCita = this.route.snapshot.params['id'];
    this.service.obtenerCita(idCita)
    .subscribe(
      (data: Cita) => {
        this.cita = data;
      }
    );


    this.service.obtenerItemsCita(idCita)
    .subscribe(
      (data: Item[]) => {
        this.items = data;
      }
    );
  }

  

}
