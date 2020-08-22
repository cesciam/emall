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
export class CitaDetallesComponent implements OnInit, AfterViewInit {
  @ViewChild(QrScannerComponent, {static : false}) qrScannerComponent: QrScannerComponent ;

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

  ngAfterViewInit(): void {
    this.qrScannerComponent.getMediaDevices().then(devices => {
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

}
