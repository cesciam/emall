import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Sucursal } from '../models/Sucursal';
import { SucursalService } from '../services/sucursal.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registrar-sucursal',
  templateUrl: './registrar-sucursal.component.html',
  styleUrls: ['./registrar-sucursal.component.css']
})
export class RegistrarSucursalComponent implements OnInit, AfterViewInit {

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  @Input() sucursal: Sucursal;
  private sucursalService: SucursalService;
  private lat = 9.9323298;
  private lng = -84.0310371;
  private error: any;

  constructor(sucursalService: SucursalService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.sucursalService = sucursalService;
    this.sucursal = new Sucursal();

  }
  ngAfterViewInit(): void {
    this.mapa();
    }

  ngOnInit() {
    this.inicializarSucursal();
  }

  inicializarSucursal() {
    let idComercio: number = parseInt(this.activatedRoute.snapshot.queryParams['comercio']);
    this.sucursal.idComercio = idComercio;

    let usuarioLogeado = JSON.parse(localStorage.getItem('usuario-logueado'));
    this.sucursal.idPersona = usuarioLogeado.usuario.Id;

    console.log(this.sucursal);
    }

  mapa() {
    let me = this;

    let mapProp = {
      center: new google.maps.LatLng(this.lat, this.lng),
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
  }

  registrarSucursal() {
    this.sucursalService.registrarSucursal(this.sucursal)
      .subscribe(
        (response) => {
          this.router.navigate(['dashboard-comercio'], { queryParams: { comercio: this.sucursal.idComercio } });
        },
        (error) => {
          console.log(error);
          this.error = error.error;
          window.scroll(0, 0);
        });
  }


}
