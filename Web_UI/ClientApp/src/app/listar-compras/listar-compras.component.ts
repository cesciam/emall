import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Factura } from '../models/factura.model';
import { FacturaService } from '../services/factura.service';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-listar-compras',
  templateUrl: './listar-compras.component.html',
  styleUrls: ['./listar-compras.component.css']
})
export class ListarComprasComponent implements OnInit {

  private usuarioLogueado: Usuario = null;
  private facturas: Factura[];
  private filterCompra = ''; 

  constructor(private facturaService: FacturaService) {
    this.usuarioLogueado = JSON.parse(localStorage.getItem('usuario-logueado'));
  }

  ngOnInit() {
    this.llenarCompras();
  }

  llenarCompras() {
    this.facturaService.obtenerFacturasxUsuario(this.usuarioLogueado['usuario'].Id)
      .subscribe(data => this.facturas = data);
  }

  obtenerTotal(factura: Factura): number {
    let total: number = 0;

    for (let linea of factura.lineas) {
      total = total + linea.precioItem;
    }

    return total;
  }
}
