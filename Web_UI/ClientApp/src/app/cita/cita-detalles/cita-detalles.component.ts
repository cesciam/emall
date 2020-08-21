import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CitaService } from 'src/app/services/cita.service';
import { Cita } from 'src/app/models/Cita';

@Component({
  selector: 'app-cita-detalles',
  templateUrl: './cita-detalles.component.html',
  styleUrls: ['./cita-detalles.component.css']
})
export class CitaDetallesComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: CitaService) { }

  ngOnInit() {
    let idCita = this.route.snapshot.params['id'];
    this.service.obtenerCita(idCita)
    .subscribe(
      (data: Cita) => {console.log(data);
      }
    );
  }

}
