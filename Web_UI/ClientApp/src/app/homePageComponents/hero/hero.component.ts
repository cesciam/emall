import { Component, OnInit } from '@angular/core';
import { ListarCategoriaComponent } from '../../categoria/listar-categoria/listar-categoria.component';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria.model';
import { Router } from "@angular/router";


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  constructor(private servicio: CategoriaService, private router: Router) { }
 

  ngOnInit() {
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.servicio.ObtenerTodoCategoria(); 
  }

  buscar() {
    let busqueda = (document.getElementById("busqueda") as HTMLInputElement).value;
    console.log(busqueda);

    if (busqueda === "") {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['item-busqueda', busqueda]);
    }
  }

}
