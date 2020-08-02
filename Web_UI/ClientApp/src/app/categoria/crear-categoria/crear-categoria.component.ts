import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../models/categoria.model';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent implements OnInit {

  public crearCategoria: Categoria = { Id: 0, Nombre: ''};

  constructor(private service: CategoriaService) { }

  ngOnInit() {
  }

  public crear(categoria: Categoria) {
    this.service.crearCategoria(categoria).subscribe(res => {
      this.service.ObtenerTodoCategoria();
    })
  }
}
