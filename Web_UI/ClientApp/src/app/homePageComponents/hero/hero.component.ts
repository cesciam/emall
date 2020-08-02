import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  buscar() {
    let busqueda = (document.getElementById("busqueda") as HTMLInputElement).value;
    console.log(busqueda);
    this.router.navigate(['item-busqueda', busqueda]);
  }

  

}
