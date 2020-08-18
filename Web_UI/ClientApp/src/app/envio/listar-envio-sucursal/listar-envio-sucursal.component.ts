import { Component, OnInit } from '@angular/core';
import { EnvioList } from 'src/app/models/envio-list.model';
import { EnvioService } from 'src/app/services/envio.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar-envio-sucursal',
  templateUrl: './listar-envio-sucursal.component.html',
  styleUrls: ['./listar-envio-sucursal.component.css']
})
export class ListarEnvioSucursalComponent implements OnInit {

  public envios: EnvioList[]
  public estado: string;
  public id_sucursal :number;

  constructor(private service : EnvioService,
    private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.id_sucursal = parseInt(this.activatedRoute.snapshot.paramMap.get('id_sucursal'));
    this.obtenerEnvios()
  }

  estadoToString(estado: number): string {
    switch (estado) {
      case 0:
        return "pendiente";
      case 1:
        return "en camino";
      case 2:
        return "entregado"
    }
  }

  obtenerEnvios() {
    this.service.obtenerEnvioListPorSucursal(this.id_sucursal).subscribe(data=>{
      this.envios=data;
    })
  }

  

}
