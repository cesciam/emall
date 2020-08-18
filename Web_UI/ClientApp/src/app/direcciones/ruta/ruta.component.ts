import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CitaList } from 'src/app/models/CitaList';
import { Usuario } from 'src/app/models/usuario.model';
import { Direccion } from 'src/app/models/direccion.model';
import { CitaService } from '../../services/cita.service';
import { DireccionService } from '../../services/direccion.service';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.css']
})

export class RutaComponent implements OnInit {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  private seccion: string = 'citas';
  private citas: CitaList[] = [];
  private direcciones: Direccion[];
  private citaId: number;
  private ubicacionId: number;
  private usuarioLogueado: Usuario = null;

  //gmaps
  private directionsService;
  private directionsRenderer;
  private origin: Direccion;
  private destination: Direccion;

  constructor(
    private route: ActivatedRoute,
    private citaService: CitaService,
    private direccionService: DireccionService, 
    private router: Router
  ) {
    let storageData = JSON.parse(localStorage.getItem('usuario-logueado'));
    this.usuarioLogueado = storageData['usuario'];

    let cita = this.route.snapshot.paramMap.get('id');
    
    if (cita) {
      console.log('cita param' + cita);
      this.citaId = +cita;
      this.seleccionarCita(+cita);
    }
  }

  ngOnInit() {
    this.obtenerCitasPorCliente();
    
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.destination = new Direccion();
    this.origin = new Direccion();
    this.origin.Latitud = '9.93246201483166';
    this.origin.Longitud = '-84.03185770759849';
  }
  
  initMap() {
    const init = new Promise((resolve, reject) => {
      let origin = new google.maps.LatLng(+this.origin.Latitud, +this.origin.Longitud);

      var mapOptions = {
        zoom: 14,
        center: origin
      }

      let map = new google.maps.Map(this.gmap.nativeElement, mapOptions);
      this.directionsRenderer.setMap(map);

      resolve();
    });

    return init;
  }

  calcularRuta() { 
    let me = this;
    let origin = new google.maps.LatLng(+this.origin.Latitud, +this.origin.Longitud);
    let destination = new google.maps.LatLng(+this.destination.Latitud, +this.destination.Longitud);

    let request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode['DRIVING']
    };

    this.directionsService.route(request, function(response, status) {
      if (status == 'OK') {
        me.directionsRenderer.setDirections(response);
      }
    });
  }

  seleccionarCita(id: number) { 
    this.citaId = id;
    this.changeSection('ubicacion');
  }

  seleccionarUbicacion(id: number) {
    this.ubicacionId = id;

    if (this.ubicacionId == 0) {
      let me = this;

      navigator.geolocation.getCurrentPosition(function(position) {
        me.origin.Latitud = String(position.coords.latitude);
        me.origin.Longitud = String(position.coords.longitude);
      });
    } else {
      this.origin = this.direcciones.find(direccion => direccion.Id === id);
    }

    this.changeSection('ruta');
  }

  changeSection(section: string) {
    this.seccion = section;

    if (this.seccion == 'citas')
      this.obtenerCitasPorCliente()
    else if (this.seccion == 'ubicacion')
      this.obtenerDirecciones();
    else if (this.seccion == 'ruta')
      this.obtenerRuta();
  }

  obtenerCitasPorCliente() { 
    this.citaService.obtenerCitasPorCliente(+this.usuarioLogueado.Id)
      .subscribe((data) => {
        this.citas = data;
      });
  }

  obtenerDirecciones() {
    this.direccionService.obtenerDireccionesPorUsuarioId(+this.usuarioLogueado.Id)
    .subscribe((data) => {
      this.direcciones = data;
    });
  }

  obtenerDireccionPorCita() {
    this.direccionService.obtenerDireccionPorCitaId(this.citaId)
      .subscribe((direccion) => {
        this.destination.Latitud = direccion.Latitud;
        this.destination.Longitud = direccion.Longitud;

        this.calcularRuta();
      });
  }

  obtenerRuta() {
    this.initMap().then(() => {
      this.obtenerDireccionPorCita();
    });
  }
}