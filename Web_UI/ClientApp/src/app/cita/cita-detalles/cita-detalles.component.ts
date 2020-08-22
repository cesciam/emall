import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CitaService } from 'src/app/services/cita.service';
import { Cita } from 'src/app/models/Cita';
import { QrScannerComponent } from 'angular2-qrscanner';
import { Item } from 'src/app/models/item';
import { Multa } from 'src/app/models/multa';
import { CitaList } from 'src/app/models/CitaList';
import { MultaService } from 'src/app/services/multa.service';

@Component({
  selector: 'app-cita-detalles',
  templateUrl: './cita-detalles.component.html',
  styleUrls: ['./cita-detalles.component.css']
})
export class CitaDetallesComponent implements OnInit {
  

  cita: Cita = null;
  items: Item[] = null;
  private id_usuario: number;
  constructor(private route: ActivatedRoute, private service: CitaService, private multaService: MultaService, private router:Router) { }

  ngOnInit() {
    this.id_usuario = JSON.parse(localStorage.getItem('usuario-logueado')).usuario.Id;
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

  cancelarCita(cita:Cita) {
    let idCita = this.route.snapshot.params['id'];
    this.service.eliminarCita(idCita)
    .subscribe((Response)=>{});

    let multa: Multa;
    multa = new Multa();

    multa.id_usuario = this.id_usuario;
    multa.id_item = cita.id_empleado;
    // multa.id_comercio = cita.id_comercio;
    multa.id_sucursal = cita.id_sucursal;
    multa.fecha = cita.fecha;
    this.multaService.crearMulta(multa)
      .subscribe(
        (reponse) => {
        },
        (error) => {
          window.scroll(0, 0);
        });

        this.router.navigate(['/perfil-usuario']);
  }
}
