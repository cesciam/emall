import { Component, OnInit, Input } from '@angular/core';
import { CalificacionService } from '../services/calificacion.service';
import { Calificacion } from '../models/calificacion.model';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css']
})

export class CalificacionComponent implements OnInit {
  @Input() item: number;
  @Input() comercio: number;

  private calificacion: Calificacion;
  private estrellas: number[] = [];
  private calificacionEnviada: boolean = false;

  constructor (private calificacionService: CalificacionService) { 
    this.calificacion = new Calificacion();
  }

  ngOnInit() {
    if (this.item != null) {
      this.obtenerPuntajePorItem(this.item);
    } else if (this.comercio != null) {
      this.obtenerPuntajePorComercio(this.comercio);
    } else
      this.calificacion.Puntaje = 0;
  }

  crearArray(puntaje: number) {
    for (let i=1; i<=puntaje; i++) {
      this.estrellas.push(1);
    }

    for (let j=puntaje+1; j<=5; j++) {
      this.estrellas.push(0);
    }
  }

  calificar(puntaje: number) {
    let storage: any = JSON.parse(localStorage.getItem('usuario-logueado'));
    let usuario: Usuario = storage['usuario'];

    let nuevaCalificacion = new Calificacion();
    
    if (this.comercio != null)
      nuevaCalificacion.ComercioId = +this.comercio;
    
    if (this.item != null)      
      nuevaCalificacion.ItemId = +this.item;
    
    nuevaCalificacion.Puntaje = puntaje;
    nuevaCalificacion.UsuarioId = +usuario.Id; 

    this.calificacionService.crear(nuevaCalificacion)
      .subscribe((response) => {
        this.calificacionEnviada = true;
      });
  }

  obtenerPuntajePorItem(item: number) {
    this.calificacionService.obtenerPorItemId(item)
      .subscribe((data) => { 
        if (data)
          this.calificacion = data;
        else 
          this.calificacion.Puntaje = 0;

        this.crearArray(this.calificacion['Puntaje']);
      });
  }

  obtenerPuntajePorComercio(comercio: number) {
    this.calificacionService.obtenerPorComercioId(comercio)
      .subscribe((data) => { 
        if (data)
          this.calificacion = data;
        else 
          this.calificacion.Puntaje = 0;

        this.crearArray(this.calificacion['Puntaje']);
      });
  }
}
