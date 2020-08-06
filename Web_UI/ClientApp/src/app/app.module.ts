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
import { PerfilComercioComponent } from './perfil-comercio/perfil-comercio.component';
import { AgregarArchivoComponent } from './agregar-archivo/agregar-archivo.component';
import { ItemProductoComponent } from './item/item-producto/item-producto.component';
import { ItemServicioComponent } from './item/item-servicio/item-servicio.component';
import { ItemBusquedaComponent } from './item/item-busqueda/item-busqueda.component';
import { ItemPerfilComponent } from './item/item-perfil/item-perfil.component';
import { MainHeaderComponent } from './homepagecomponents/main-header/main-header.component';
import { FiltroItemPipe } from './pipes/filtro-item.pipe';
import { PerfilUsuarioComponent } from '../app/perfil-usuario/perfil-usuario.component';
import { EditarUsuarioComponent } from './dashboard-admin/usuario/editar-usuario/editar-usuario.component';
import { SidebarAdminComponent } from './dashboard-admin/sidebar-admin/sidebar-admin.component';
import { ChartsModule } from 'ng2-charts';
import { ReportesComponent } from './reportes/reportes/reportes.component';
import { ComPorCatReporteComponent } from './reportes/com-por-cat-reporte/com-por-cat-reporte.component';
import { EmpleadosPorComercioReporteComponent } from './reportes/empleados-por-comercio-reporte/empleados-por-comercio-reporte.component';
import { UsuarioTipoReporteComponent } from './reportes/usuario-tipo-reporte/usuario-tipo-reporte.component';
import { UsuarioEstadoReporteComponent } from './reportes/usuario-estado-reporte/usuario-estado-reporte.component';
import { AdminReportesComponent } from './dashboard-admin/admin-reportes/admin-reportes.component';
import { AdminPromocionesComponent } from './dashboard-admin/admin-promociones/admin-promociones.component';
import { AdminPromocionesEditComponent } from './dashboard-admin/admin-promociones-edit/admin-promociones-edit.component';
import { AdminPromocionesRegistrarComponent } from './dashboard-admin/admin-promociones-registrar/admin-promociones-registrar.component';
import { AdminConfiguracionComponent } from './dashboard-admin/admin-configuracion/admin-configuracion.component';
import { ItemSucursalClienteComponent } from './item/item-sucursal-cliente/item-sucursal-cliente.component';
import { LandingPageProductoComponent } from './landingPage/landing-page-producto/landing-page-producto.component';
import { FilterImpuestoPipe } from './pipes/filter-impuesto.pipe';
import { FilterCategoriaPipe } from './pipes/filter-categoria.pipe';
import { FiltroRolPipe } from './pipes/filtro-rol.pipe';
import { FiltroEmpleadoPipe } from './pipes/filtro-empleado.pipe';
import { AdminImpuestoCrearComponent } from './dashboard-admin/admin-impuesto-crear/admin-impuesto-crear.component';
import { AdminImpuestoListarComponent } from './dashboard-admin/admin-impuesto-listar/admin-impuesto-listar.component';
import { AdminCategoriaListarComponent } from './dashboard-admin/admin-categoria-listar/admin-categoria-listar.component';
import { AdminCategoriaCrearComponent } from './dashboard-admin/admin-categoria-crear/admin-categoria-crear.component';



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
    PerfilComercioComponent,
    AgregarArchivoComponent,
    ItemProductoComponent,
    ItemServicioComponent,
    ItemBusquedaComponent,
    ItemPerfilComponent,
    MainHeaderComponent,
    FiltroItemPipe,
    PerfilUsuarioComponent,
    EditarUsuarioComponent,
    SidebarAdminComponent,
    ReportesComponent,
    ComPorCatReporteComponent,
    EmpleadosPorComercioReporteComponent,
    UsuarioTipoReporteComponent,
    UsuarioEstadoReporteComponent,
    AdminReportesComponent,
    AdminPromocionesComponent,
    AdminPromocionesEditComponent,
    AdminPromocionesRegistrarComponent,
    AdminConfiguracionComponent,
    ItemSucursalClienteComponent,
    LandingPageProductoComponent,
    FilterImpuestoPipe,
    FilterCategoriaPipe,
    FiltroRolPipe,
    FiltroEmpleadoPipe,
    AdminImpuestoCrearComponent,
    AdminImpuestoListarComponent,
    AdminCategoriaListarComponent,
    AdminCategoriaCrearComponent,
  ],
  imports: [
    CloudinaryModule.forRoot({ Cloudinary }, cloudinaryConfiguration),
    FileUploadModule,
    ChartsModule,
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
      { path: 'agregar-empleado/:comercio', component: AgregarEmpleadoComponent },
      { path: 'listar-empleado/:id_comercio/modificar-empleado/:id', component: ModificarEmpleadoComponent },
      { path: 'listar-empleado', component: ListarEmpleadoComponent },
      { path: 'dashboard-admin', component: DashboardAdminComponent },
      { path: 'dashboard-admin/usuario', component: ListarUsuarioComponent },
      { path: 'dashboard-admin/usuario/listar-usuario', component: ListarUsuarioComponent },
      { path: 'dashboard-admin/usuario/agregar-usuario', component: AgregarUsuarioComponent },
      { path: 'dashboard-comercio', component: DashboardComercioComponent },
      { path: 'listar-rol/:id', component: ListarRolComponent },
      { path: 'agregar-rol/:id', component: AgregarRolComponent },
      { path: 'registrar-comercio', component: RegistrarComercioComponent },
      { path: 'perfil-admin-comercio', component: PerfilAdminComercioComponent },
      { path: 'landing-pulsar', component: LandingPulsarComponent },
      { path: 'dashboard-comercio/modificar', component: ModificarComercioComponent },
      { path: 'dashboard-comercio/registrar-sucursal', component: RegistrarSucursalComponent },
      { path: 'dashboard-comercio/modificar-sucursal', component: ModificarSucursalComponent },
      { path: 'perfil-admin-comercio', component: PerfilAdminComercioComponent },
      { path: 'item-crear/:id_sucursal', component: ItemCrearComponent },
      { path: 'item-sucursal/:id_sucursal', component: ItemSucursalComponent },
      { path: 'item-editar/:id_item', component: ItemEditarComponent },
      { path: 'listar-impuesto', component: ListarImpuestoComponent },
      { path: 'crear-impuesto', component: CrearImpuestoComponent },
      { path: 'listar-categoria', component: ListarCategoriaComponent },
      { path: 'crear-categoria', component: CrearCategoriaComponent },
      { path: 'configuracion', component: ListarConfiguracionComponent },
      { path: 'dashboard-admin/comercio/aprobar-comercios', component: AprobarComercioComponent },
      { path: 'perfil-comercio', component: PerfilComercioComponent },
      { path: 'dashboard-comercio/agregar-archivo', component: AgregarArchivoComponent },
      { path: 'dashboard-admin/comercio/aprobar-comercios', component: AprobarComercioComponent },
      { path: 'listar-rol/:id_comercio/modificar-rol/:id', component: ModificarRolComponent },
      { path: 'item-producto', component: ItemProductoComponent },
      { path: 'item-servicio', component: ItemServicioComponent },
      { path: 'item-busqueda/:busqueda', component: ItemBusquedaComponent },
      { path: 'perfil-usuario', component: PerfilUsuarioComponent },
      { path: 'item-busqueda/:busqueda', component: ItemBusquedaComponent },
      { path: 'dashboard-admin/usuario/editar-usuario/:id', component: EditarUsuarioComponent },
      { path: 'item-busqueda/:busqueda', component: ItemBusquedaComponent },
      { path: 'dashboard-admin/comercio/aprobar-comercios', component: AprobarComercioComponent },
      { path: 'dashboard-admin/reportes', component: AdminReportesComponent },
      { path: 'dashboard-admin/promocion', component: AdminPromocionesComponent },
      { path: 'dashboard-admin/promocion/:id', component: AdminPromocionesEditComponent },
      { path: 'dashboard-admin/promocion/registro', component: AdminPromocionesRegistrarComponent },
      { path: 'dashboard-admin/configuracion', component: AdminConfiguracionComponent },
      { path: 'item-perfil/:id_item', component: ItemPerfilComponent },
      { path: 'item-sucursal-cliente/:id_sucursal', component: ItemSucursalClienteComponent },
      { path: 'landing-producto', component: LandingPageProductoComponent },
      { path: 'dashboard-admin/impuesto/crear', component: AdminImpuestoCrearComponent },
      { path: 'dashboard-admin/categoria/crear', component: AdminCategoriaCrearComponent },
      { path: 'dashboard-admin/impuesto', component: AdminImpuestoListarComponent },
      { path: 'dashboard-admin/categoria', component: AdminCategoriaListarComponent },
    ])
  ],
  exports: [
    AgregarUsuarioComponent,
    EditarUsuarioComponent,
    SidebarAdminComponent,
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
