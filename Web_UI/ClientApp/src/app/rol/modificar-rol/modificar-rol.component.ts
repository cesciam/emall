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
  id_rol : number;
  private permisos : VistaXRol[];

  constructor(private service: RolService,
    private serviceVista: VistaService,
    private serviceVistaXRol: VistaXRolService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      
  }

  ngOnInit() {
    let id= parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    let id_comercio = parseInt(this.activatedRoute.snapshot.paramMap.get('id_comercio'));
    this.service.id_comercio= id_comercio;
    this.id_rol= id;

    this.initializeForm();
    this.service.getById(this.id_rol);
    
    this.getVistaXRol();
  }

  initializeForm(){
    this.service.formData = new Rol;
  }

  getVistaXRol(): void {
    this.serviceVistaXRol.getByRol(this.id_rol).subscribe(
      (data) => {
        this.permisos = data;
        console.log(this.permisos);
      });
  }
  
  fillCheckboxes(id_vista: number){
    return false;
  }

  onSubmit(form: NgForm) {
    this.updateRecord(form);
  }

  updateRecord(form: NgForm) {
    this.service.putRol(form.value).subscribe();

  };

  updateVistaXRol(){
    this.vistasSeleccionadas.forEach(element => {
      let vistaxrol = new VistaXRol;
      vistaxrol ={
        id:0,
        id_vista:element.valueOf(),
        id_rol:0
      }
      this.serviceVistaXRol.putVistaXRol(vistaxrol).subscribe();
    });
    
  }

  getVistaId(e:any, id: number){
    if(e.target.checked){
      this.vistasSeleccionadas.push(id)
    }else{
      this.vistasSeleccionadas = this.vistasSeleccionadas.filter(m=>m!=id)
    }
  }
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }

}
