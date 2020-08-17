import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';
import { ImpuestoService } from '../../services/impuesto.service';
import { SucursalService } from '../../services/sucursal.service';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import cloudinaryConfig from '../../config';
import { Router } from "@angular/router";
import { Sucursal } from '../../models/Sucursal';
import { ActivatedRoute } from '@angular/router';
import { Impuesto } from '../../models/impuesto.model';
import { BitacoraService } from '../../services/bitacora.service';

@Component({
  selector: 'app-item-crear',
  templateUrl: './item-crear.component.html',
  styleUrls: ['./item-crear.component.css']
})



export class ItemCrearComponent implements OnInit {

  
  sucursal: number;
  message: string;
  impuestos: Impuesto[];
  item: Item;
  error: any;
  sucursales: Sucursal[];
  comercio: number;
  tipo: number;
  sucursalesSeleccionadas: Array<number>;
  inventarios: Array<number>;
  dura: number;
  precio: number;

  private usuarioLogueado: string;
  public accion: string = "Creación Item";

  public id_usuario: number = Number.parseInt(this.usuarioLogueado); 



  uploader: CloudinaryUploader;
  private foto: string;



  constructor(private bitacora: BitacoraService,private route: ActivatedRoute, private service: ItemService, private router: Router, private serviceImpuesto: ImpuestoService, private serviceSucursal: SucursalService) {
    this.comercio = parseInt(this.route.snapshot.params['id_comercio']);
    this.sucursalesSeleccionadas = new Array<number>();
    this.inventarios = new Array<number>();
    this.dura = 0;
    this.precio = 0;

    this.id_usuario = JSON.parse(localStorage.getItem('usuario-logueado')).usuario.Id;



    this.uploader = new CloudinaryUploader(new CloudinaryOptions({ cloudName: cloudinaryConfig.cloud_name, uploadPreset: cloudinaryConfig.upload_preset }));
    this.foto = 'https://mdbootstrap.com/img/Photos/Others/placeholder.jpg';
    this.item = new Item();
  }

  upload() {
    this.uploader.uploadAll();

    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
      let res;
      res = JSON.parse(response);
     
      this.foto = res.url;
      return res;
    };
  }


  llenar() {
    this.serviceSucursal.ObtenerTodoSucursales(this.comercio)
      .subscribe(data => this.sucursales = data);
    this.serviceImpuesto.ObtenerTodoImpuestoItem().subscribe(
      (data: Impuesto[]) => this.impuestos = data,
      (err: any) => console.log(err)
    );
  }

  marcar(e: any, id: number) {
    if (e.target.checked) {
      this.sucursalesSeleccionadas.push(id)
    } else {
      this.sucursalesSeleccionadas = this.sucursalesSeleccionadas.filter(m => m != id)
      let tmp_num2 = this.inventarios.indexOf(id)
      var tmp_inventario = (document.getElementById("inventario" + id)) as HTMLInputElement;
      let numero = Number(tmp_inventario.value);
      this.inventarios.splice(tmp_num2, 1)
      this.inventarios.splice(tmp_num2, 1)
    }
  }

  inventarioadd(e: any, id: number) {
    
    
    var tmp_inventario = (document.getElementById("inventario" + id)) as HTMLInputElement;
    let numero = Number(tmp_inventario.value);

    let tmp_num2 = this.inventarios.indexOf(id)

   

    if (tmp_num2 != -1 && numero > 0) {
      this.inventarios[tmp_num2 + 1] = numero;
      console.log(this.inventarios)
    } else if (tmp_num2 == -1 && numero > 0) {
      this.inventarios.push(id)
      this.inventarios.push(numero)
      console.log(this.inventarios)
    } else if (tmp_num2 != -1 && numero <= 0) {
      
      this.inventarios.splice(tmp_num2, 1)
      this.inventarios.splice(tmp_num2, 1)
      console.log(this.inventarios)
      
    }



    
  }

  duracionadd(e: any) {


    var tmp_duracion = (document.getElementById("duracion")) as HTMLInputElement;
    this.dura = Number(tmp_duracion.value);
    
  }

  precioadd(e: any) {


    var tmp_precio = (document.getElementById("precio")) as HTMLInputElement;
    this.precio = Number(tmp_precio.value);
    
  }


  ngOnInit() {
    this.llenar();
  }


  crearItem() {

    if (this.item.tipo == 'Producto') {
      for (let i = 0; i < this.sucursalesSeleccionadas.length; i++) {

        let value = this.sucursalesSeleccionadas[i];
        var tmp_inventario = (document.getElementById("inventario" + value)) as HTMLInputElement;
        this.item.inventario = Number(tmp_inventario.value);
        this.item.id_sucursal = this.sucursalesSeleccionadas[i];
        this.item.id_foto = this.foto;
        this.item.precio = this.precio;
        var e = (document.getElementById("id_impuesto")) as HTMLSelectElement;
        var sel = e.selectedIndex;

        if (sel == -1) {
          this.error = "Errores en el impuesto";
        } else {
          this.item.id_impuesto = this.impuestos[(sel)].Id;
        }


        
        this.service.crearItem(this.item)
          .subscribe(
            (reponse) => {
              this.router.navigate(['dashboard-comercio'], { queryParams: { comercio: this.comercio } });

              this.bitacora.llenarBitacora(this.accion, this.id_usuario).subscribe(
                (error) => {
                  this.error = error.error;
                  window.scroll(0, 0);
                });
            },
            (error) => {
              this.error = "Errores en el registro";
              window.scroll(0, 0);
            });

      }

    } else if (this.item.tipo == 'Servicio') {
      for (let i = 0; i < this.sucursalesSeleccionadas.length; i++) {
        this.item.precio = this.precio;
        this.item.duracion = this.dura;
        this.item.inventario = 0;
        this.item.id_sucursal = this.sucursalesSeleccionadas[i];
        this.item.id_foto = this.foto;
        var e = (document.getElementById("id_impuesto")) as HTMLSelectElement;
        var sel = e.selectedIndex;

        if (sel == -1) {
          this.error = "Errores en el impuesto";
        } else {
          this.item.id_impuesto = this.impuestos[(sel)].Id;
        }


        
        this.service.crearItem(this.item)
          .subscribe(
            (reponse) => {
              this.router.navigate(['dashboard-comercio'], { queryParams: { comercio: this.comercio } });
            },
            (error) => {
              this.error = "Errores en el registro";
              window.scroll(0, 0);
            });

      }

    }




  }

  





}

