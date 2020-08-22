import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';
import { ActivatedRoute } from '@angular/router';
import { CitaService } from 'src/app/services/cita.service';
import { Item } from 'src/app/models/item';
import { Cita } from 'src/app/models/Cita';

@Component({
  selector: 'app-cita-detalles-empleado',
  templateUrl: './cita-detalles-empleado.component.html',
  styleUrls: ['./cita-detalles-empleado.component.css']
})
export class CitaDetallesEmpleadoComponent implements OnInit, AfterViewInit {

  @ViewChild(QrScannerComponent, {static : false}) qrScannerComponent: QrScannerComponent;

  constructor(private route: ActivatedRoute, private service: CitaService) { }
  
  items: Item[] = null;
  cita: Cita = null;
  errorQr:boolean;
  mensajeQr:boolean
  stringErrorQr: string="";
  stringMensajeQr:string="";
  scannerVisible : boolean=true;
  botonConfirmar: boolean = true;
  public codigoConfirmado: boolean;

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
      this.verificarResultadoQr(result);
  });
  }

  verificarResultadoQr(resultado: string) {
    if (resultado.match(this.cita.codigo)) {
      this.errorQr = false;
      this.codigoConfirmado = true;
      this.botonConfirmar = false;
      this.mensajeQr = true;
      this.stringMensajeQr = "Identidad confirmada";
      this.scannerVisible = false;
    } else {
      this.scannerVisible=false;
      this.errorQr=true;
      this.stringErrorQr="El código no coincide o no es legible."
    }
  }
  public usuarioEsEmpleado: boolean;
  public envioAceptado: boolean;
  public botonAceptar: boolean;

  public codigoIngresado: string = "";
  public error: boolean;
  public errorMessage: string;
  public alerta: boolean;
  public mensajeAlerta: string;


  confirmacionManual() {
    if (this.codigoIngresado.match(this.cita.codigo)) {
      this.error = false;
      this.codigoConfirmado = true;
      this.botonConfirmar = false;
      this.alerta = true;
      this.mensajeAlerta = "Identidad confirmada"
      this.envioAceptado = false;
    } else {
      this.errorMessage = "El código " + this.codigoIngresado + " es incorrecto"
      this.error = true;
    }
  }

}
