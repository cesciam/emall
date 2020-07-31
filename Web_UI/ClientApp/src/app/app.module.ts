import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardComercioComponent } from './dashboard-comercio/dashboard-comercio.component';
import { HeaderComponent } from './homePageComponents/header/header.component';
import { FooterComponent } from './homePageComponents/footer/footer.component';
import { HomePageComponent } from './homePageComponents/home-page/home-page.component';
import { HeroComponent } from './homePageComponents/hero/hero.component';
import { FeaturedSpadComponent } from './homePageComponents/featured-spad/featured-spad.component';
import { BannerComponent } from './homePageComponents/banner/banner.component';
import { BlogComponent } from './homePageComponents/blog/blog.component';
import { AgregarUsuarioComponent } from './dashboard-admin/usuario/agregar-usuario/agregar-usuario.component';
import { ListarUsuarioComponent } from './dashboard-admin/usuario/listar-usuario/listar-usuario.component';
import { AgregarEmpleadoComponent } from './empleado/agregar-empleado/agregar-empleado.component';
import { ListarEmpleadoComponent } from './empleado/listar-empleado/listar-empleado.component';
import { EmpleadoService } from './services/empleado.service';
import { AutenticacionComponent } from './autenticacion/autenticacion.component';
import { ListarRolComponent } from './rol/listar-rol/listar-rol.component';
import { RolService } from './services/rol.service';
import { VistaService } from './services/vista.service';
import { HorarioService } from './services/horario.service';
import { VistaXRolService } from './services/vista-xrol.service';
import { AgregarRolComponent } from './rol/agregar-rol/agregar-rol.component';
import { ModificarRolComponent } from './rol/modificar-rol/modificar-rol.component';
import { ModificarEmpleadoComponent } from './empleado/modificar-empleado/modificar-empleado.component';
import { ModificarComercioComponent } from './modificar-comercio/modificar-comercio.component';
import { RegistrarSucursalComponent } from './registrar-sucursal/registrar-sucursal.component';
import { AgmCoreModule } from '@agm/core';
import { FilterComercioPipe } from './pipes/filter-comercio.pipe';
import { FilterSucursalPipe } from './pipes/filter-sucursal.pipe';
import { ModificarSucursalComponent } from './modificar-sucursal/modificar-sucursal.component';
import { LandingPulsarComponent } from './landingPage/landing-pulsar/landing-pulsar.component';
import { ListarPromocionComponent } from './promocion/listar-promocion/listar-promocion.component';
import { RegistrarComercioComponent } from './registrar-comercio/registrar-comercio.component';
import { PerfilAdminComercioComponent } from './perfil-admin-comercio/perfil-admin-comercio.component';
import { EditarPromocionComponent } from './promocion/editar-promocion/editar-promocion.component';
import { RegistrarPromocionComponent } from './promocion/registrar-promocion/registrar-promocion.component';
import { FiltroPromocionPipe } from './pipes/filtro-promocion.pipe';
import { ItemSucursalComponent } from './item/item-sucursal/item-sucursal.component';
import { ItemCrearComponent } from './item/item-crear/item-crear.component';
import { ItemService } from './services/item.service';
import { ItemEditarComponent } from './item/item-editar/item-editar.component';
import { CardsComercioComponent } from './homepagecomponents/cards-comercio/cards-comercio.component';
import { ComercioService } from './services/comercio.service';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { FileUploadModule } from "ng2-file-upload";
import cloudinaryConfiguration from './config';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { ListarConfiguracionComponent } from './configuracion/listar-configuracion/listar-configuracion.component';
import { ListarImpuestoComponent } from '../app/impuesto/listar-impuesto/listar-impuesto.component';
import { CrearImpuestoComponent } from '../app/impuesto/crear-impuesto/crear-impuesto.component';
import { ListarCategoriaComponent } from '../app/categoria/listar-categoria/listar-categoria.component';
import { CrearCategoriaComponent } from '../app/categoria/crear-categoria/crear-categoria.component'; 
import { AprobarComercioComponent } from './aprobar-comercio/aprobar-comercio.component';
import { ItemProductoComponent } from './item/item-producto/item-producto.component';
import { ItemServicioComponent } from './item/item-servicio/item-servicio.component';
import { ItemBusquedaComponent } from './item/item-busqueda/item-busqueda.component';
import { ItemPerfilComponent } from './item/item-perfil/item-perfil.component';


const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardAdminComponent,
    DashboardComercioComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    HeroComponent,
    FeaturedSpadComponent,
    BannerComponent,
    BlogComponent,
    AgregarUsuarioComponent,
    ListarUsuarioComponent,
    DashboardComercioComponent,
    AgregarEmpleadoComponent,
    ListarEmpleadoComponent,
    AutenticacionComponent,
    ListarRolComponent,
    AgregarRolComponent,
    ModificarRolComponent,
    ModificarEmpleadoComponent,
    DashboardComercioComponent,
    RegistrarComercioComponent,
    PerfilAdminComercioComponent,
    LandingPulsarComponent,
    ModificarComercioComponent,
    RegistrarSucursalComponent,
    FilterComercioPipe,
    FilterSucursalPipe,
    ModificarSucursalComponent,
    ModificarEmpleadoComponent,
    DashboardComercioComponent,
    RegistrarComercioComponent,
    PerfilAdminComercioComponent,
    ListarPromocionComponent,
    EditarPromocionComponent,
    RegistrarPromocionComponent,
    FiltroPromocionPipe,
    ItemSucursalComponent,
    ItemCrearComponent,
    ItemEditarComponent,
    CardsComercioComponent,
    ListarConfiguracionComponent,
    ListarImpuestoComponent,
    CrearImpuestoComponent,
    ListarCategoriaComponent,
    CrearCategoriaComponent,
    AprobarComercioComponent,
    ItemProductoComponent,
    ItemServicioComponent,
    ItemBusquedaComponent,
    ItemPerfilComponent,
  ],
  imports: [
    CloudinaryModule.forRoot({ Cloudinary }, cloudinaryConfiguration),
    FileUploadModule,
    Ng2CloudinaryModule,
    NgxMaskModule.forRoot(maskConfig),
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyAdxnSzcqddE8WFixFcWcXYO3mhMKV0Aus' }),
    RouterModule.forRoot([
      { path: '', component: HomePageComponent, pathMatch: 'full' },
      { path: 'autenticacion', component: AutenticacionComponent },
      { path: 'agregar-empleado', component: AgregarEmpleadoComponent },
      { path: 'modificar-empleado', component: ModificarEmpleadoComponent },
      { path: 'listar-empleado', component: ListarEmpleadoComponent },
      { path: 'dashboard-admin', component: DashboardAdminComponent },
      { path: 'dashboard-admin/usuario', component: ListarUsuarioComponent },
      { path: 'dashboard-admin/usuario/listar-usuario', component: ListarUsuarioComponent },
      { path: 'dashboard-admin/usuario/agregar-usuario', component: AgregarUsuarioComponent },
      { path: 'dashboard-comercio', component: DashboardComercioComponent },
      { path: 'listar-rol', component: ListarRolComponent },
      { path: 'agregar-rol', component: AgregarRolComponent },
      { path: 'registrar-comercio', component: RegistrarComercioComponent },
      { path: 'perfil-admin-comercio', component: PerfilAdminComercioComponent },
      { path: 'landing-pulsar', component: LandingPulsarComponent },
      { path: 'dashboard-comercio/modificar', component: ModificarComercioComponent },
      { path: 'dashboard-comercio/registrar-sucursal', component: RegistrarSucursalComponent },
      { path: 'dashboard-comercio/modificar-sucursal', component: ModificarSucursalComponent },
      { path: 'registrar-comercio', component: RegistrarComercioComponent },
      { path: 'perfil-admin-comercio', component: PerfilAdminComercioComponent },
      { path: 'promociones', component: ListarPromocionComponent },
      { path: 'promocion/:id', component: EditarPromocionComponent },
      { path: 'promocion-registro', component: RegistrarPromocionComponent },
      { path: 'item-crear/:id_sucursal', component: ItemCrearComponent },
      { path: 'item-sucursal/:id_sucursal', component: ItemSucursalComponent },
      { path: 'item-editar/:id_item', component: ItemEditarComponent },
      { path: 'configuracion', component: ListarConfiguracionComponent },
      { path: 'listar-impuesto', component: ListarImpuestoComponent },
      { path: 'crear-impuesto', component: CrearImpuestoComponent },
      { path: 'listar-categoria', component: ListarCategoriaComponent },
      { path: 'crear-categoria', component: CrearCategoriaComponent },
      { path: 'configuracion', component: ListarConfiguracionComponent },
      { path: 'dashboard-admin/comercio/aprobar-comercios', component: AprobarComercioComponent },
      { path: 'item-producto', component: ItemProductoComponent },
      { path: 'item-servicio', component: ItemServicioComponent }
    ])
  ],
  exports: [
    AgregarUsuarioComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    EmpleadoService,
    RolService,
    VistaService,
    HorarioService,
    VistaXRolService,
    ItemService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
