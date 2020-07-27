import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/servicios/empleado.service';

@Component({
  selector: 'app-listar-empleado',
  templateUrl: './listar-empleado.component.html',
  styleUrls: ['./listar-empleado.component.css']
})
export class ListarEmpleadoComponent implements OnInit {

  constructor(private service : EmpleadoService) { }

  ngOnInit(): void {
    this.service.fillList();
  }

  onDelete(id : number){
    if(confirm('Confirma que desea eliminar el registro')){
      this.service.deleteEmpleado(id).subscribe(res=>{
        this.service.fillList();
      })
    }
  }

}
