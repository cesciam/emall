import { Component, OnInit } from '@angular/core';
import { Promocion } from '../../models/promocion';
import { PromocionService } from '../../services/promocion.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { BitacoraService } from '../../services/bitacora.service';

@Component({
  selector: 'app-editar-promocion',
  templateUrl: './editar-promocion.component.html',
  styleUrls: ['./editar-promocion.component.css']
})
export class EditarPromocionComponent implements OnInit {
  /*private promocionForm: FormGroup;*/

  promocionSeleccionada: Promocion;
  idPromocion: number;

  private error: object = null;
  private usuarioLogueado: string;
  public accion: string = "Edición Promoción";

  public id_usuario: number = Number.parseInt(this.usuarioLogueado); 

  constructor(private bitacora: BitacoraService,private route: ActivatedRoute, 
    private service: PromocionService,
    private router: Router) { 
    this.idPromocion = parseInt(this.route.snapshot.params['id']);
    this.id_usuario = JSON.parse(localStorage.getItem('usuario-logueado')).usuario.Id;

  }

  ngOnInit() {
    this.service.obtenerPromocion(this.idPromocion)
    .subscribe(
      (data: Promocion) => this.promocionSeleccionada = data,
      (err: any) => console.log(err)
    );
  }

  save() {
    this.service.editar(this.promocionSeleccionada)
    .subscribe(
      (data: any) => { 
        console.log('editado');
        this.router.navigate(['/dashboard-admin/promocion']);

        this.bitacora.llenarBitacora(this.accion, this.id_usuario).subscribe(
          (error) => {
            this.error = error.error;
            window.scroll(0, 0);
          });
      },
      (err: any) => console.log(err)
    );
  }
}
