import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-listar-categoria',
  templateUrl: './listar-categoria.component.html',
  styleUrls: ['./listar-categoria.component.css']
})
export class ListarCategoriaComponent implements OnInit {

  public selectedCategoria: Categoria = { Id: null, Nombre: '' };

  constructor(private service: CategoriaService) { }

  ngOnInit() {
    this.obtenerTodo(); 
  }

  obtenerTodo() {
    this.service.ObtenerTodoCategoria(); 

  }

  obtener(nombre: string) {
    this.service.ObtenerCategoria(nombre); 
  }

  public editar(categoria: Categoria) {

    this.selectedCategoria = categoria; 
  }

  public completarModificar(selectedCategoria: Categoria) {
    this.service.modificarCategoria(selectedCategoria).subscribe(res => {
      this.obtenerTodo();
    }) 
  }

  eliminar(id: number) {
    this.service.eliminarCategoria(id).subscribe(res => {
      this.service.ObtenerTodoCategoria();
    })
   }
}
