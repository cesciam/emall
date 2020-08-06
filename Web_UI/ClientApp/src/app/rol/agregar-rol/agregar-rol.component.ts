import { Component, OnInit, Input } from '@angular/core';
import { RolService } from 'src/app/services/rol.service';
import { NgForm } from '@angular/forms';
import { VistaService } from 'src/app/services/vista.service';
import { VistaXRolService } from 'src/app/services/vista-xrol.service';
import { Vista } from 'src/app/models/vista.model';
import { VistaXRol } from 'src/app/models/vista-xrol.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-rol',
  templateUrl: './agregar-rol.component.html',
  styleUrls: ['./agregar-rol.component.css']
})
export class AgregarRolComponent implements OnInit {

  vistasSeleccionadas: Array<number>;

  constructor(private service: RolService,
    private serviceVista: VistaService,
    private serviceVistaXRol: VistaXRolService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.service.id_comercio = id;
    this.resetForm();
    this.vistasSeleccionadas = new Array<number>();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.service.formData = {
      id: 0,
      nombre: '',
      descripcion: '',
      id_comercio: this.service.id_comercio
    }
  }


  async onSubmit(form: NgForm) {
    this.insertRecord(form);
    await new Promise(resolve => setTimeout(() => resolve(), 1000))
    .then(() => this.insertVistaXRol());
    
    
    form.resetForm();
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }

  insertRecord(form: NgForm) {
    this.service.postRol(form.value).subscribe(res => {
      this.resetForm();
    });
  }

  insertVistaXRol() {
    var vistasSeleccionadasOrdenadas = this.vistasSeleccionadas.sort()

    for(var i =0; i < vistasSeleccionadasOrdenadas.length; i++){
      console.log(vistasSeleccionadasOrdenadas[i])
      let vistaxrol = new VistaXRol;
      vistaxrol = {
        id: 0,
         id_vista: vistasSeleccionadasOrdenadas[i],
         id_rol: 0
       }
       
       this.serviceVistaXRol.postVistaXRol(vistaxrol).subscribe();
    }
    // vistasSeleccionadasOrdenadas.forEach(element => {
    //   console.log(element)
    //   let vistaxrol = new VistaXRol;
    //   vistaxrol = {
    //     id: 0,
    //     id_vista: element,
    //     id_rol: 0
    //   }
    //   this.serviceVistaXRol.postVistaXRol(vistaxrol).subscribe();
    // });

  }

  getVistaId(e: any, id: number) {
    if (e.target.checked) {
      this.vistasSeleccionadas.push(id)
    } else {
      this.vistasSeleccionadas = this.vistasSeleccionadas.filter(m => m != id)
    }
  }

}
