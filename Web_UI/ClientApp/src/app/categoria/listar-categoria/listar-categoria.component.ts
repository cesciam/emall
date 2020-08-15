import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria.model';
import { BitacoraService } from '../../services/bitacora.service';

@Component({
  selector: 'app-listar-categoria',
  templateUrl: './listar-categoria.component.html',
  styleUrls: ['./listar-categoria.component.css']
})
export class ListarCategoriaComponent implements OnInit {

  public selectedCategoria: Categoria = { Id: null, Nombre: '' };
  buscarCategoria = '';
  private usuarioLogueado: string;
  public accionMod: string = "Edición categoría";
  public accion: string = "Eliminación categoría";
  private error: object = null;

  public id_usuario: number = Number.parseInt(this.usuarioLogueado);

  constructor(private service: CategoriaService, private bitacora: BitacoraService) {
    this.id_usuario = JSON.parse(localStorage.getItem('usuario-logueado')).usuario.Id;
  }

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
    });
    this.bitacora.llenarBitacora(this.accionMod, this.id_usuario).subscribe(
      (error) => {
        this.error = error.error;
        window.scroll(0, 0);
      });
  }

  eliminar(id: number) {
    this.service.eliminarCategoria(id).subscribe(res => {
      this.service.ObtenerTodoCategoria();
    });
    this.bitacora.llenarBitacora(this.accion, this.id_usuario).subscribe(
      (error) => {
        this.error = error.error;
        window.scroll(0, 0);
      });
   }
}
