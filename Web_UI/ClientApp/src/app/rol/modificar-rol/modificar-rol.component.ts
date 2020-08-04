import { Component, OnInit } from '@angular/core';
import { VistaXRolService } from 'src/app/services/vista-xrol.service';
import { VistaService } from 'src/app/services/vista.service';
import { RolService } from 'src/app/services/rol.service';
import { Rol } from 'src/app/models/rol.model';
import { NgForm } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { Vista } from 'src/app/models/vista.model';
import { VistaXRol } from 'src/app/models/vista-xrol.model';

@Component({
  selector: 'app-modificar-rol',
  templateUrl: './modificar-rol.component.html',
  styleUrls: ['./modificar-rol.component.css']
})
export class ModificarRolComponent implements OnInit {

  vistasSeleccionadas: Array<Number>;
  vistasDeseleccionadas: Array<Number>;
  id_rol: number;
  private permisoSucursales: boolean;
  private permisoProductos: boolean;
  private permisoEmpleados: boolean;
  private permisoRoles: boolean;
  private permisoPromociones: boolean;
  private permisoArchivos: boolean;
  private permisoEditarComercio: boolean;

  private vistasXRol : VistaXRol[]

  constructor(private service: RolService,
    private serviceVista: VistaService,
    private serviceVistaXRol: VistaXRolService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    let id_comercio = parseInt(this.activatedRoute.snapshot.paramMap.get('id_comercio'));
    this.service.id_comercio = id_comercio;
    this.id_rol = id;

    this.initializeForm();
    this.service.getById(this.id_rol);

    this.getVistaXRol();
    this.vistasSeleccionadas = new Array<Number>();
    this.vistasDeseleccionadas = new Array<Number>();
  }

  initializeForm() {
    this.service.formData = new Rol;
  }

  getVistaXRol(): void {
    let permisos: VistaXRol[];
    this.serviceVistaXRol.getByRol(this.id_rol).subscribe(
      (data) => {
        permisos = data;
        this.vistasXRol = data;
        this.fillCheckboxes(permisos);
      });
  }

  fillCheckboxes(permisos: VistaXRol[]) {
    for (let permiso of permisos) {
      switch (permiso.id_vista) {
        case 1:
          this.permisoSucursales = true;
          break;
        case 2:
          this.permisoProductos = true;
          break;
        case 3:
          this.permisoEmpleados = true;
          break;
        case 4:
          this.permisoRoles = true;
          break;
        case 5:
          this.permisoPromociones = true;
          break;
        case 6:
          this.permisoArchivos = true;
          break;
        case 7:
          this.permisoEditarComercio = true;
          break;
      };
    }
  }

  onSubmit(form: NgForm) {
    this.updateRecord(form);
    this.updateVistaXRol();
  }

  updateRecord(form: NgForm) {
    this.service.putRol(form.value).subscribe();

  };

  verArray(){
  console.log(this.vistasSeleccionadas)
  console.log(this.vistasDeseleccionadas)
}

  updateVistaXRol() {
    if (this.vistasDeseleccionadas.length > 0) {
      this.vistasDeseleccionadas.forEach(element => {
        switch (element) {
          case 1:
            if (this.permisoSucursales) {
              this.serviceVistaXRol.deleteVistaXRol(this.id_rol, 1).subscribe();
            }
            break;
          case 2:
            if (this.permisoProductos) {
              this.serviceVistaXRol.deleteVistaXRol(this.id_rol, 2).subscribe();
            }
            break;
          case 3:
            if (this.permisoEmpleados) {
              this.serviceVistaXRol.deleteVistaXRol(this.id_rol, 3).subscribe();
            }
            break;
          case 4:
            if (this.permisoRoles) {
              this.serviceVistaXRol.deleteVistaXRol(this.id_rol, 4).subscribe();
            }
            break;
          case 5:
            if (this.permisoPromociones) {
              this.serviceVistaXRol.deleteVistaXRol(this.id_rol, 5).subscribe();
            }
            break;
          case 6:
            if (this.permisoArchivos) {
              this.serviceVistaXRol.deleteVistaXRol(this.id_rol, 6).subscribe();
            }
            break;
          case 7:
            if (this.permisoEditarComercio) {
              this.serviceVistaXRol.deleteVistaXRol(this.id_rol, 7).subscribe();
            }
            break;
        }
      });
    }
    if (this.vistasSeleccionadas.length > 0) {
      this.vistasSeleccionadas.forEach(element => {
        switch (element) {
          case 1:
            if (!this.permisoSucursales) {
              let vistaxrol = new VistaXRol;
              vistaxrol = {
                id: 0,
                id_vista: 1,
                id_rol: this.id_rol,
              }
              this.serviceVistaXRol.postVistaXRolUpdate(vistaxrol).subscribe();
            }
            break;
          case 2:
            if (!this.permisoProductos) {
              let vistaxrol = new VistaXRol;
              vistaxrol = {
                id: 0,
                id_vista: 2,
                id_rol: this.id_rol,
              }
              this.serviceVistaXRol.postVistaXRolUpdate(vistaxrol).subscribe();
            }
            break;
          case 3:
            if (!this.permisoEmpleados) {
              let vistaxrol = new VistaXRol;
              vistaxrol = {
                id: 0,
                id_vista: 3,
                id_rol: this.id_rol,
              }
              this.serviceVistaXRol.postVistaXRolUpdate(vistaxrol).subscribe();
            }
            break;
          case 4:
            if (!this.permisoRoles) {
              let vistaxrol = new VistaXRol;
              vistaxrol = {
                id: 0,
                id_vista: 4,
                id_rol: this.id_rol,
              }
              this.serviceVistaXRol.postVistaXRolUpdate(vistaxrol).subscribe();
            }
            break;
          case 5:
            if (!this.permisoPromociones) {
              let vistaxrol = new VistaXRol;
              vistaxrol = {
                id: 0,
                id_vista: 5,
                id_rol: this.id_rol,
              }
              this.serviceVistaXRol.postVistaXRolUpdate(vistaxrol).subscribe();
            }
            break;
          case 6:
            if (!this.permisoArchivos) {
              let vistaxrol = new VistaXRol;
              vistaxrol = {
                id: 0,
                id_vista: 6,
                id_rol: this.id_rol,
              }
              this.serviceVistaXRol.postVistaXRolUpdate(vistaxrol).subscribe();
            }
            break;
          case 7:
            if (!this.permisoEditarComercio) {
              let vistaxrol = new VistaXRol;
              vistaxrol = {
                id: 0,
                id_vista: 7,
                id_rol: this.id_rol,
              }
              this.serviceVistaXRol.postVistaXRolUpdate(vistaxrol).subscribe();
            }
            break;
        }
      });
    }
  }

  getVistaId(e: any, id: number) {
    if (e.target.checked) {
      this.vistasSeleccionadas.push(id)
    } else {
      this.vistasSeleccionadas = this.vistasSeleccionadas.filter(m => m != id)
      this.vistasDeseleccionadas.push(id)
    }
    //TODO: Validar que si un numero esta en ambas listas, se elimine
    
  }

}
