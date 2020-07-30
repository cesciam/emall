import { Component, OnInit } from '@angular/core';
import { RolService } from 'src/app/services/rol.service';
import { Rol } from 'src/app/models/rol.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-rol',
  templateUrl: './listar-rol.component.html',
  styleUrls: ['./listar-rol.component.css']
})
export class ListarRolComponent implements OnInit {

  constructor(private service: RolService,
    private router: Router) { }

  ngOnInit() {
    this.service.fillList();
  }
  
  onDelete(id: number){
    if(confirm('Confirma que desea eliminar el registro')){
      this.service.deleteRol(id).subscribe(res=>{
        this.service.fillList();
      })
    }
  }

  onUpdate(id: number){
    this.service.getById(id);
    //localStorage.setItem("rol", JSON.stringify(rol));
    this.router.navigate(['modificar-rol'])
  }


}
