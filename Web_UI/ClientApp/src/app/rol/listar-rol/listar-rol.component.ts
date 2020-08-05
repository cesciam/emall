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
  private id_rol : number;
  private id_comercio : number;
  private list : Rol[];
  private filtro = ''; 
  constructor(private service: RolService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id_comercio = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.service.id_comercio = this.id_comercio;
    this.fillList();
  }
  
  fillList(){
    this.service.fillRolComercio(this.id_comercio).subscribe(data=>{
      this.list = data;
    })
  }

  onDelete(id: number){
    this.service.deleteRol(id).subscribe(res=>{
      this.fillList();
      
    })
  }

  onUpdate(id: number){
    this.router.navigate(['listar-rol/',this.service.id_comercio,'modificar-rol', id])
  }

  rolToDelete(id:number){
    this.id_rol=id;
  }
  
  agregarRol() {
    this.router.navigate(['agregar-rol', this.service.id_comercio]);
  }

}
