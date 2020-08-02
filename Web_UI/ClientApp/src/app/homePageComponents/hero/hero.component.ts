import { Component, OnInit } from '@angular/core';
import { ListarCategoriaComponent } from '../../categoria/listar-categoria/listar-categoria.component';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria.model';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  constructor(private servicio: CategoriaService) { }
 

  ngOnInit() {
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.servicio.ObtenerTodoCategoria(); 
  }

}
