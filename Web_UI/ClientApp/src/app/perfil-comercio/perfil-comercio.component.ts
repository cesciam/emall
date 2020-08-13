import { Component, OnInit } from '@angular/core';
import { ComercioService } from '../services/comercio.service';
import { ActivatedRoute } from '@angular/router';
import { Comercio } from '../models/Comercio';
import { Sucursal } from '../models/Sucursal';
import { SucursalService } from '../services/sucursal.service';
import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-perfil-comercio',
  templateUrl: './perfil-comercio.component.html',
  styleUrls: ['./perfil-comercio.component.css']
})
export class PerfilComercioComponent implements OnInit {
  private comercioSeleccionado: Comercio;
  private sucursales: Sucursal[];
  private comercioId: number = this.activatedRoute.snapshot.queryParams['comercio'];

  constructor(private comercioService: ComercioService, private sucursalService: SucursalService, private activatedRoute: ActivatedRoute) {
    this.comercioSeleccionado = new Comercio();
  }

  ngOnInit() {
    this.llenarComercio();
  }

  llenarComercio() {
    let idComercio: number = this.activatedRoute.snapshot.queryParams['comercio'];
    let comercio = new Comercio();
    comercio.id = idComercio;

    this.comercioService.obtenerComercio(comercio)
      .subscribe(data => {
        this.comercioSeleccionado = data
        this.llenarSucursales();
      });
  }

  llenarSucursales() {
    this.sucursalService.ObtenerTodoSucursales(this.comercioSeleccionado.id)
      .subscribe(data => this.sucursales = data);
  }

  /*mapa(sucursal: Sucursal) {
    let me = this;

    let mapProp = {
      center: new google.maps.LatLng(sucursal.latitud, sucursal.longitud),
      zoom: 8,
      scrollwheel: true,
    };

    let map = new google.maps.Map(this.gmap.nativeElement,
      mapProp);

    let marker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(this.lat, this.lng),
      clickable: true
    });

    marker.setMap(map);

    google.maps.event.addListener(map, 'click', function (event) {
      placeMarker(event.latLng);

      me.sucursal.latitud = String(event.latLng.lat());
      me.sucursal.longitud = String(event.latLng.lng());

    });

    function placeMarker(location) {
      marker.setPosition(location);
      marker.setMap(map);
    }
  }*/

  parse(value: string) {
    return parseFloat(value);
  }
}
