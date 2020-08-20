import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SucursalService } from '../services/sucursal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Sucursal } from '../models/Sucursal';

@Component({
  selector: 'app-modificar-sucursal',
  templateUrl: './modificar-sucursal.component.html',
  styleUrls: ['./modificar-sucursal.component.css']
})

export class ModificarSucursalComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  private sucursalService: SucursalService;
  private sucursalSeleccionada: Sucursal;
  private lat;
  private lng;
  private error: any;

  constructor(sucursalService: SucursalService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.sucursalService = sucursalService;
    this.sucursalSeleccionada = new Sucursal();
  }
    ngAfterViewInit(): void {
        throw new Error("Method not implemented.");
    }
   

  ngOnInit() {
    this.llenarSucursal();
  }

  llenarSucursal() {
    let idSucursal: number = this.activatedRoute.snapshot.queryParams['sucursal'];

    this.sucursalService.obtenerSucursal(idSucursal)
      .subscribe(data => {
        this.sucursalSeleccionada = data;
        
        this.lat = this.sucursalSeleccionada.latitud;
        this.lng = this.sucursalSeleccionada.longitud;
        this.mapa();
      });
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

      me.sucursalSeleccionada.latitud = String(event.latLng.lat());
      me.sucursalSeleccionada.longitud = String(event.latLng.lng());
    });

    function placeMarker(location) {
      marker.setPosition(location);
      marker.setMap(map);
    }
  }

  modificarSucursal() {
    this.sucursalService.modificarSucursal(this.sucursalSeleccionada)
      .subscribe(
        (response) => {
          this.router.navigate(['dashboard-comercio'], { queryParams: { comercio: this.sucursalSeleccionada.idComercio } });
        },
        (error) => {
          console.log(error);
          this.error = error.error;
          window.scroll(0, 0);
        });
  }
}
