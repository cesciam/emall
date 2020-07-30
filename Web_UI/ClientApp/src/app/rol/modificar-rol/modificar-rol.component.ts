import { Component, OnInit } from '@angular/core';
import { VistaXRolService } from 'src/app/services/vista-xrol.service';
import { VistaService } from 'src/app/services/vista.service';
import { RolService } from 'src/app/services/rol.service';
import { Rol } from 'src/app/models/rol.model';
import { NgForm } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Vista } from 'src/app/models/vista.model';

@Component({
  selector: 'app-modificar-rol',
  templateUrl: './modificar-rol.component.html',
  styleUrls: ['./modificar-rol.component.css']
})
export class ModificarRolComponent implements OnInit {

  vistasSeleccionadas: Array<Number>;


  constructor(private service: RolService,
    private serviceVista: VistaService,
    private serviceVistaXRol: VistaXRolService,
    private router: Router) {
  }

  ngOnInit() {
    this.getVistaXRol();
  }

  getVistaId(e: any, id: number) {
    if (e.target.checked) {
      this.vistasSeleccionadas.push(id)
    } else {
      this.vistasSeleccionadas = this.vistasSeleccionadas.filter(m => m != id)
    }
  }

  getVistaXRol() {
    this.serviceVistaXRol.getByRol(this.service.formData.id)

  }
  
  fillCheckboxes(id_vista: number){
    return false;
  }

  onSubmit(form: NgForm) {
    this.updateRecord(form);
  }

  updateRecord(form: NgForm) {
    this.service.putRol(form.value).subscribe(res => {
      this.router.navigate(['listar-rol'])
    });

  };

}
