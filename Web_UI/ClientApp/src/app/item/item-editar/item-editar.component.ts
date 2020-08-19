import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import cloudinaryConfig from '../../config';
import { Archivo } from '../../models/Archivo';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { Impuesto } from '../../models/impuesto.model';
import { ImpuestoService } from '../../services/impuesto.service';
import { BitacoraService } from '../../services/bitacora.service';

@Component({
  selector: 'app-item-editar',
  templateUrl: './item-editar.component.html',
  styleUrls: ['./item-editar.component.css']
})
export class ItemEditarComponent implements OnInit {

  item_seleccionado: Item;
  item_archivo: Archivo;
  impuestos: Impuesto[];
  uploader: CloudinaryUploader;
  error: any;
  stringImpuesto: string;
  impuestoactual: Impuesto;

  private usuarioLogueado: string;
  public accion: string = "Edición Item";

  public id_usuario: number = Number.parseInt(this.usuarioLogueado); 


  constructor(private bitacora: BitacoraService,private route: ActivatedRoute, private service: ItemService, private router: Router, private serviceImpuesto: ImpuestoService) {
    this.id_usuario = JSON.parse(localStorage.getItem('usuario-logueado')).usuario.Id;

    let itemID: number = parseInt(this.route.snapshot.params['id_item']);
    this.serviceImpuesto.ObtenerTodoImpuestoItem().subscribe(
      (data: Impuesto[]) => this.impuestos = data,
      (err: any) => console.log(err)
    );
    this.obtenerItem(itemID);
    this.uploader = new CloudinaryUploader(new CloudinaryOptions({ cloudName: cloudinaryConfig.cloud_name, uploadPreset: cloudinaryConfig.upload_preset }));

    



  }

  async obtenerItem(itemId: number) {
    this.item_seleccionado = await this.service.ObtenerItem(itemId);
    this.impuestoactual = await this.service.ObtenerImpuestoItem(this.item_seleccionado.id_impuesto);

    


  }


  ngOnInit() {

    this.serviceImpuesto.ObtenerTodoImpuestoItem().subscribe(
      (data: Impuesto[]) => this.impuestos = data,
      (err: any) => console.log(err)
    );
    

  }

  upload() {
    this.uploader.uploadAll();

    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
      let res;
      res = JSON.parse(response);
      console.log(res);
      this.item_seleccionado.id_foto = res.url;

      return res;
    };
  }


  save(): void {




    var e = (document.getElementById("id_impuesto")) as HTMLSelectElement;
    var sel = e.selectedIndex;
    console.log(sel);
    if (sel == -1) {
      this.item_seleccionado.id_impuesto = this.item_seleccionado.id_impuesto;
    } else {
      this.item_seleccionado.id_impuesto = this.impuestos[(sel - 1)].Id;
      console.log(this.item_seleccionado.id_impuesto);
    }
    

    this.service.updateItem(this.item_seleccionado)
      .subscribe(
        (reponse) => this.router.navigate(['item-sucursal', this.item_seleccionado.id_sucursal]),
        (error) => {
          this.error = "Errores en el registro";
          window.scroll(0, 0);
        });
    this.bitacora.llenarBitacora(this.accion, this.id_usuario).subscribe(
      (error) => {
        this.error = error.error;
        window.scroll(0, 0);
      });
  }



}
