import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { EnvioList } from 'src/app/models/envio-list.model';
import { Item } from 'src/app/models/item';
import { EnvioService } from 'src/app/services/envio.service';
import { ActivatedRoute } from '@angular/router';
import { Envio } from 'src/app/models/envio.model';

@Component({
  selector: 'app-envio-detalle',
  templateUrl: './envio-detalle.component.html',
  styleUrls: ['./envio-detalle.component.css']
})
export class EnvioDetalleComponent implements OnInit {


  private envio: Envio
  private envioList: EnvioList
  private sucursal: number
  private items: Item[]
  private id_envio: number;

  private lat;
  private lng;
  public link: string
  public link2: string

  constructor(private service: EnvioService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.inicializar()
    this.sucursal = parseInt(this.activatedRoute.snapshot.paramMap.get('id_sucursal'));
    this.id_envio = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.obtenerDatosEnvio()
  }

  inicializar(){
    this.envioList = new EnvioList
    this.envio = new Envio
  }

  obtenerDatosEnvio() {
    this.service.obtenerEnvioListPorId(this.id_envio).subscribe(
      data => {
        this.envioList = data;
        this.lat = this.envioList.latitud.substr(0, 9);
        this.lng = this.envioList.longitud.substr(0, 9);

        this.link = "https://maps.google.com/?q=" + this.lat + "," + this.lng

        this.link2 = "https://maps.google.com/maps?q=" + this.lat + "," + this.lng + "&z=15&output=embed"
      })

    this.service.obtenerEnvioPorId(this.id_envio).subscribe(
      data => {
        this.envio = data;
        this.items = this.envio.items;
      })
  }

}
