import { Component, OnInit } from '@angular/core';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-listar-rol',
  templateUrl: './listar-rol.component.html',
  styleUrls: ['./listar-rol.component.css']
})
export class ListarRolComponent implements OnInit {

  constructor(private service: RolService) { }

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



}
