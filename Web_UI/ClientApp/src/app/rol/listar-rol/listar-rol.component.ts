import { Component, OnInit } from '@angular/core';
import { RolService } from 'src/app/services/rol.service';
import { Rol } from 'src/app/models/rol.model';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar-rol',
  templateUrl: './listar-rol.component.html',
  styleUrls: ['./listar-rol.component.css']
})
export class ListarRolComponent implements OnInit {
  constructor(private service: RolService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let id= parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.service.id_comercio = id;
    this.service.fillRolComercio();
  }
  
  onDelete(id: number){
    if(confirm('Confirma que desea eliminar el registro')){
      this.service.deleteRol(id).subscribe(res=>{
        this.service.fillList();
      })
    }
  }

  onUpdate(id: number){
    this.router.navigate(['listar-rol/',this.service.id_comercio,'modificar-rol', id])
  }


}
