import { Component, OnInit } from '@angular/core';
import { EnvioService } from 'src/app/services/envio.service';
import { ActivatedRoute } from '@angular/router';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { EnvioList } from 'src/app/models/envio-list.model';
import { Envio } from 'src/app/models/envio.model';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Sucursal } from 'src/app/models/Sucursal';
import { Impuesto } from 'src/app/models/impuesto.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-envio-detalle-cliente',
  templateUrl: './envio-detalle-cliente.component.html',
  styleUrls: ['./envio-detalle-cliente.component.css']
})
export class EnvioDetalleClienteComponent implements OnInit {

  private id_envio :number;
  private envioList: EnvioList;
  private envio: Envio;
  private sucursal: Sucursal;
  private total: number = 0;

  constructor(private service : EnvioService,
    private activatedRoute: ActivatedRoute,
    private serviceSucursal: SucursalService,
    private serviceItem: ItemService,) { 
      
    }

  ngOnInit() {
    this.id_envio = parseInt(this.activatedRoute.snapshot.paramMap.get('id_envio'));
    this.inicializar();
    this.obtenerEnvio();
  }

  inicializar(){
    this.envioList = new EnvioList;
    this.envio = new Envio;
    this.sucursal = new Sucursal;
  }

  obtenerEnvio(){
    this.service.obtenerEnvioListPorId(this.id_envio).subscribe(
      data=>{
        this.envioList=data;
      }
    )
    this.service.obtenerEnvioPorId(this.id_envio).subscribe(
      data=>{
        this.envio=data;
        this.calcularTotal()
        this.obtenerSucursal()
      }
    )
  }

  async calcularTotal(){
    this.envio.items.forEach(async element => {
      let impuesto: Impuesto = await this.serviceItem.ObtenerImpuestoItem(element.id_impuesto);
      element.precio = element.precio + (element.precio / 100 * impuesto.Porcentaje);
        this.total = this.total + element.precio;
    });
  }

  obtenerSucursal(){
    this.serviceSucursal.obtenerSucursal(this.envio.items[0].id_sucursal)
    .subscribe(data=>{
      this.sucursal = data;
    })
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

}
