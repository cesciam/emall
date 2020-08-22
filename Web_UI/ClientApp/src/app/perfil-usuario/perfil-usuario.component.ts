import { ComercioService } from '../services/comercio.service';
import { Usuario } from '../models/usuario.model';
import { PerfilAdminComercioComponent } from '../perfil-admin-comercio/perfil-admin-comercio.component';
import { Component, OnInit } from '@angular/core';
import { Comercio } from '../models/Comercio';
import { CitaService } from '../services/cita.service';
import { CitaList } from '../models/CitaList';
import { EnvioService } from '../services/envio.service';
import { EnvioList } from '../models/envio-list.model';
import { MultaService } from '../services/multa.service';
import { Multa } from '../models/multa';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  private usuarioLogueado: Usuario = null;
  private id: number;
  private comercios: Comercio[];
  private section: string = 'info';
  private image: string;

  private citas: CitaList[];
  private pedidos: EnvioList[];

  private error: any;
  private id_usuario: number;

  constructor(private comercioService: ComercioService,
     private citaService: CitaService,
    private enviosService: EnvioService,
    private multaService: MultaService,
    private router: Router) {
    this.usuarioLogueado = JSON.parse(localStorage.getItem('usuario-logueado'));
  }

  ngOnInit() {
    let usuarioBuscar: any = JSON.parse(localStorage.getItem('usuario-logueado'));
    let usuarioActivado: Usuario = usuarioBuscar.usuario;
    this.id_usuario = JSON.parse(localStorage.getItem('usuario-logueado')).usuario.Id;

    if (this.usuarioLogueado['usuario'].Foto != null) {
      this.image = this.usuarioLogueado['usuario'].Foto.enlace;
    } else {
      this.image = null;
    }

    this.comerciosDuenno(usuarioActivado);

    this.citaService.obtenerCitasPorCliente(parseInt(usuarioActivado.Id))
    .subscribe(
      (data: CitaList[]) => {
        for(let i = 0; i < data.length; i++){
          var hour = new Date(data[i].hora_inicio).getHours();
          var deit = new Date(data[i].hora_inicio);
          var minute = (deit.getMinutes()<10?'0':'') + deit.getMinutes() ;
          data[i].hora_i = hour +":"+minute;

          hour = new Date(data[i].hora_fin).getHours();
          deit = new Date(data[i].hora_fin);
          minute = (deit.getMinutes()<10?'0':'') + deit.getMinutes() ;
          data[i].hora_f = hour +":"+minute;

          var dateObj = new Date(data[i].fecha);
          var month = dateObj.getUTCMonth() + 1; //months from 1-12
          var day = dateObj.getDate();
          var year = dateObj.getUTCFullYear();
          var date=  day + "/" +month + "/" + year;
          data[i].fecha_s = date;
        }
        this.citas = data;
      }
    );
    this.obtenerPedidos(parseInt(this.usuarioLogueado['usuario'].Id));
  }

  obtenerPedidos(id:number){
    this.enviosService.obtenerEnvioListPorUsuario(id).subscribe(
      data=>{
        this.pedidos = data;
      }
    )
  }

  estadoPedidoToString(estado:number):string{
    switch (estado) {
      case 0:
        return "pendiente";
      case 1:
        return "en camino";
      case 2:
        return "entregado"
    }
  }

  changeSection(section: string): void {
    this.section = section;
    window.scroll(0, 0);
  }

  comerciosDuenno(usuario: Usuario) {
    let comercio: Comercio = new Comercio();

    comercio.idAdmin = parseInt(usuario.Id);
    this.comercioService.ObtenerComerciosAdmin(comercio)
      .subscribe(data => this.comercios = data);
  }

  cancelarCita(cita: CitaList) {
    
    this.citaService.eliminarCita(cita.id)
    .subscribe((Response)=>{});

    let multa: Multa;
    multa = new Multa();

    multa.id_usuario = this.id_usuario;
    multa.id_item = cita.id_empleado;
    multa.id_comercio = cita.id_comercio;
    multa.id_sucursal = cita.id_sucursal;
    multa.fecha = cita.fecha;
    this.multaService.crearMulta(multa)
      .subscribe(
        (reponse) => {
        },
        (error) => {
          window.scroll(0, 0);
        });

        //this.router.navigate(['']);
  }


}
