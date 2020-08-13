import { Component, OnInit } from '@angular/core';
import { BitacoraService } from 'src/app/services/bitacora.service';

@Component({
  selector: 'app-listar-bitacora',
  templateUrl: './listar-bitacora.component.html',
  styleUrls: ['./listar-bitacora.component.css']
})
export class ListarBitacoraComponent implements OnInit {

  constructor(private service: BitacoraService) { }

  ngOnInit() {
    this.obtenerTodo(); 
  }

  public obtenerTodo(): void {
    this.service.ObtenerTodoBitacora()
    console.log(this.service.ObtenerTodoBitacora())
  }

}
