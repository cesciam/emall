import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DireccionService } from '../../services/direccion.service';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Provincia } from 'src/app/models/provincia.model';
import { Canton } from 'src/app/models/canton.model';
import { Distrito } from 'src/app/models/distrito.model';
import { Usuario } from 'src/app/models/usuario.model';
import { Direccion } from 'src/app/models/direccion.model';

@Component({
  selector: 'app-editar-direccion',
  templateUrl: './editar-direccion.component.html',
  styleUrls: ['./editar-direccion.component.css']
})
export class EditarDireccionComponent implements OnInit {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  private direccionForm: FormGroup;
  private provincias: Provincia[];
  private cantones: Canton[];
  private distritos: Distrito[];
  private lat = 9.9323298;
  private lng = -84.0310371;
  private isSendingData: boolean = false;
  private submitted: boolean = false;
  private error: object = null;
  private usuarioLogueado: Usuario = null;

  constructor( 
    private router: Router,
    private route: ActivatedRoute,
    private direccionService: DireccionService
    ) { }

  ngOnInit() {
    this.direccionForm = new FormGroup({
      Alias: new FormControl('', [Validators.required]),
      Detalles: new FormControl('', [Validators.required]), 
      Provincia: new FormControl('', [Validators.required]), 
      Canton: new FormControl('', [Validators.required]), 
      Distrito: new FormControl('', [Validators.required]), 
    });

    this.obtenerProvincias();
  }
  
  mapa() {
    let me = this;

    let mapProp = {
      center: new google.maps.LatLng(this.lat, this.lng),
      zoom: 8,
      scrollwheel: true,
    };

    let map = new google.maps.Map(this.gmap.nativeElement, mapProp);

    let marker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(this.lat, this.lng),
      clickable: true
    });

    marker.setMap(map);

    google.maps.event.addListener(map, 'click', function (event) {
      placeMarker(event.latLng);

      this.lat = event.latLng.lat();
      this.lng = event.latLng.lng();
    });

    function placeMarker(location) {
      marker.setPosition(location);
      marker.setMap(map);
    }
  }

  get f() {
    return this.direccionForm.controls;
  }

  sanitizeData(data: FormGroup): Direccion {
    let storageData = JSON.parse(localStorage.getItem('usuario-logueado'));
    this.usuarioLogueado = storageData['usuario'];
    let direccion: Direccion = new Direccion();

    direccion.Alias = this.direccionForm.controls['Alias'].value;
    direccion.ProvinciaId = +this.direccionForm.controls['Provincia'].value;
    direccion.CantonId = +this.direccionForm.controls['Canton'].value;
    direccion.DistritoId = +this.direccionForm.controls['Distrito'].value;
    direccion.Detalles = this.direccionForm.controls['Detalles'].value;
    direccion.Latitud = String(this.lat);
    direccion.Longitud = String(this.lng);
    direccion.UsuarioId = +this.usuarioLogueado.Id;

    return direccion;
  }

  obtenerProvincias() {
    this.direccionService.obtenerProvincias()
    .subscribe((data) => { 
      this.provincias = data;
    });
  }

  obtenerCantones() {
    let provincia = this.direccionForm.controls['Provincia'].value;
    
    this.direccionService.obtenerCantones(provincia)
    .subscribe(data => this.cantones = data);
  }

  obtenerDistritos() {
    let provincia = this.direccionForm.controls['Provincia'].value;
    let canton = this.direccionForm.controls['Canton'].value;

    this.direccionService.obtenerDistritos(provincia, canton)
    .subscribe(data => this.distritos = data);
  }

}
