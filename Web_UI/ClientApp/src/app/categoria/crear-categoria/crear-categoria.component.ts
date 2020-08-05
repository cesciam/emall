import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../models/categoria.model';
import { CategoriaService } from '../../services/categoria.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent implements OnInit {

  private categoriaForm: FormGroup;
  private submitted: boolean = false;
  private error: object = null;

  public crearCategoria: Categoria = { Id: 0, Nombre: ''};

  constructor(private router: Router, private service: CategoriaService) { }

  ngOnInit() {
    this.categoriaForm = new FormGroup({
      Nombre: new FormControl('', Validators.required)
    });
  }
  get f() {
    return this.categoriaForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    if (this.categoriaForm.invalid)
      return;

    this.service.crearCategoria(this.categoriaForm.value)
      .subscribe(
        (reponse) => this.router.navigate(['crear-categoria']),
        (error) => {
          this.error = error.error;
          window.scroll(0, 0);
        }
      );
  }

  public crear(categoria: Categoria) {
    this.service.crearCategoria(categoria).subscribe(res => {
      this.service.ObtenerTodoCategoria();
    })
  }
}
