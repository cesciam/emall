import { Component, OnInit } from '@angular/core';
import { BitacoraService } from 'src/app/services/bitacora.service';
import { Bitacora } from '../../models/bitacora.model';

@Component({
  selector: 'app-listar-bitacora',
  templateUrl: './listar-bitacora.component.html',
  styleUrls: ['./listar-bitacora.component.css']
})
export class ListarBitacoraComponent implements OnInit {

  private error: object = null;
   bitacoras: Bitacora[];

  constructor(private service: BitacoraService) { }

  ngOnInit() {
    this.obtenerTodo(); 
  }

  public obtenerTodo(){
    this.service.ObtenerTodoBitacora().subscribe(
      (data: Bitacora[]) => this.bitacoras = data,
      (err: any) => console.log(err)
    );
    
  }

}
