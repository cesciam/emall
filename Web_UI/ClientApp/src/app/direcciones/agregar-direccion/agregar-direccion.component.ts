import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Direccion } from 'src/app/models/direccion.model';
import { Router } from '@angular/router';
import { DireccionService } from 'src/app/services/direccion.service';
import { Provincia } from 'src/app/models/provincia.model';
import { Canton } from 'src/app/models/canton.model';
import { Distrito } from 'src/app/models/distrito.model';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-agregar-direccion',
  templateUrl: './agregar-direccion.component.html',
  styleUrls: ['./agregar-direccion.component.css']
})

export class AgregarDireccionComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  private direccionForm: FormGroup;
  private direccion: Direccion;
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
    private direccionService: DireccionService,
  ) { 
    this.direccion = new Direccion();
  }

  ngAfterViewInit(): void {
    this.mapa();
  }

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

      me.direccion.Latitud = String(event.latLng.lat());
      me.direccion.Longitud = String(event.latLng.lng());
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

    this.direccion.Alias = this.direccionForm.controls['Alias'].value;
    this.direccion.ProvinciaId = +this.direccionForm.controls['Provincia'].value;
    this.direccion.CantonId = +this.direccionForm.controls['Canton'].value;
    this.direccion.DistritoId = +this.direccionForm.controls['Distrito'].value;
    this.direccion.Detalles = this.direccionForm.controls['Detalles'].value;
    this.direccion.UsuarioId = +this.usuarioLogueado.Id;

    return this.direccion;
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

  registrarDireccion() {
    this.isSendingData = true;

    this.direccionService.registrarDireccion(this.sanitizeData(this.direccionForm))
      .subscribe(
        (response) => {
          this.isSendingData = false;
          this.router.navigate(['/direcciones/listar-direccion']);
        },
        (error) => {
          this.isSendingData = false;
          this.error = error.error;

          if (!this.error.hasOwnProperty('message')) {
            this.error = { message: 'Error general al registrar la dirección. Vuelva a intertarlo en unos minutos' };
          }

          window.scroll(0, 0);
        });
  }

  onSubmit() {
    this.submitted = true;

    if (this.direccionForm.invalid) {
      window.scroll(0, 0);
      return;
    }
   
    this.registrarDireccion();
  }
}
