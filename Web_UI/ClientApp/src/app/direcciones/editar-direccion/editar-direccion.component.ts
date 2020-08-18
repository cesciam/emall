import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Direccion } from 'src/app/models/direccion.model';
import { Router, ActivatedRoute } from "@angular/router";
import { DireccionService } from '../../services/direccion.service';
import { Provincia } from 'src/app/models/provincia.model';
import { Canton } from 'src/app/models/canton.model';
import { Distrito } from 'src/app/models/distrito.model';
import { Usuario } from 'src/app/models/usuario.model';

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
  private lat;
  private lng;
  private isSendingData: boolean = false;
  private submitted: boolean = false;
  private error: object = null;
  private usuarioLogueado: Usuario = null;
  private direccion: Direccion;

  constructor( 
    private router: Router,
    private route: ActivatedRoute,
    private direccionService: DireccionService
  ) { 
    this.direccion = new Direccion();
  }

  ngOnInit() {
    this.direccionForm = new FormGroup({
      Alias: new FormControl('', [Validators.required]),
      Detalles: new FormControl('', [Validators.required]), 
      Provincia: new FormControl('', [Validators.required]), 
      Canton: new FormControl('', [Validators.required]), 
      Distrito: new FormControl('', [Validators.required]), 
    });

    this.obtenerDireccion()  
      .then(() => {
        this.direccionForm.controls['Alias'].setValue(this.direccion.Alias);
        this.direccionForm.controls['Detalles'].setValue(this.direccion.Detalles);
        this.lat = +this.direccion.Latitud;
        this.lng = +this.direccion.Longitud;
        this.direccionForm.controls['Provincia'].setValue(this.direccion.ProvinciaId);

        this.obtenerCantones();
        this.mapa();
      })
      .then(() => {
        this.direccionForm.controls['Canton'].setValue(this.direccion.CantonId);
        this.obtenerDistritos();
      })
      .then(() => {
        this.direccionForm.controls['Distrito'].setValue(this.direccion.DistritoId);
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

  obtenerDireccion() {
    let id: number = +this.route.snapshot.paramMap.get('id');

    const obtenerDatos = new Promise((resolve, reject) => {
      this.direccionService.obtenerDireccionPorId(id)
        .subscribe(data => {
          this.direccion = data;
          resolve();
        }, (error) => {
            reject();
        });
    });

    return obtenerDatos;
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

  sanitizeData(data: FormGroup): Direccion {
    let direccionEditada: Direccion = new Direccion();

    direccionEditada.Id = this.direccion.Id;
    direccionEditada.Alias = this.direccionForm.controls['Alias'].value;
    direccionEditada.ProvinciaId = +this.direccionForm.controls['Provincia'].value;
    direccionEditada.CantonId = +this.direccionForm.controls['Canton'].value;
    direccionEditada.DistritoId = +this.direccionForm.controls['Distrito'].value;
    direccionEditada.Detalles = this.direccionForm.controls['Detalles'].value;
    direccionEditada.Latitud = String(this.direccion.Latitud);
    direccionEditada.Longitud = String(this.direccion.Longitud);
    direccionEditada.UsuarioId = this.direccion.UsuarioId;

    return direccionEditada;
  }

  editarDireccion() {
    this.direccionService.editarDireccion(this.sanitizeData(this.direccionForm))
      .subscribe(
        (response) => {
          this.isSendingData = false;
          this.router.navigate(['/direcciones/listar-direccion']);
        },
        (error) => {
          this.isSendingData = false;
          this.error = error.error;

          if (!this.error.hasOwnProperty('message')) {
            this.error = { message: 'Error general al editar la direccion. Vuelva a intertarlo en unos minutos' };
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
    
    this.editarDireccion();
  }
}
