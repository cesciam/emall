import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { EnvioList } from 'src/app/models/envio-list.model';
import { Item } from 'src/app/models/item';
import { EnvioService } from 'src/app/services/envio.service';
import { ActivatedRoute } from '@angular/router';
import { Envio } from 'src/app/models/envio.model';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { EmpleadoList } from 'src/app/models/empleado-list.model';
import {QrScannerComponent} from 'angular2-qrscanner';

@Component({
  selector: 'app-envio-detalle',
  templateUrl: './envio-detalle.component.html',
  styleUrls: ['./envio-detalle.component.css']
})
export class EnvioDetalleComponent implements OnInit, AfterViewInit {
  @ViewChild(QrScannerComponent, {static : false}) qrScannerComponent: QrScannerComponent ;

  private envio: Envio
  private envioList: EnvioList
  private sucursal: number
  private items: Item[]
  private id_envio: number;

  private lat;
  private lng;
  public link2: string

  public envioAceptado: boolean;
  public empleado : EmpleadoList;
  public codigoIngresado: string;
  public error: boolean;
  public errorMessage: string;

  constructor(private service: EnvioService,
    private activatedRoute: ActivatedRoute,
    private empleadoService : EmpleadoService) { }

  ngAfterViewInit(): void {
    this.qrScannerComponent.getMediaDevices().then(devices => {
      console.log(devices);
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
          if (device.kind.toString() === 'videoinput') {
              videoDevices.push(device);
          }
      }
      if (videoDevices.length > 0){
          let choosenDev;
          for (const dev of videoDevices){
              if (dev.label.includes('front')){
                  choosenDev = dev;
                  break;
              }
          }
          if (choosenDev) {
              this.qrScannerComponent.chooseCamera.next(choosenDev);
          } else {
              this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
          }
      }
  });

  this.qrScannerComponent.capturedQr.subscribe(result => {
      console.log(result);
  });
  }

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
        this.link2 = "https://maps.google.com/maps?q=" + this.lat + "," + this.lng + "&z=15&output=embed"
      })

    this.service.obtenerEnvioPorId(this.id_envio).subscribe(
      data => {
        this.envio = data;
        this.items = this.envio.items;
      })
  }

  aceptarEnvio(){
    this.envioAceptado= true;

  }

  estadoToString(): string {
    switch (this.envio.estado) {
      case 0:
        return "pendiente";
      case 1:
        return "en camino";
      case 2:
        return "entregado"
    }
  }

  confirmacionManual(){
    if(this.codigoIngresado.match(this.envioList.codigo)){
      console.log("confimado hostia")
    }else{
      this.errorMessage="Código incorrecto"
      this.error=true;
    }
  }

}
