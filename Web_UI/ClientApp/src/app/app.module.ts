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
import { RegistrarComercioComponent } from './registrar-comercio/registrar-comercio.component';
import { PerfilAdminComercioComponent } from './perfil-admin-comercio/perfil-admin-comercio.component';
import { LandingPulsarComponent } from './landingPage/landing-pulsar/landing-pulsar.component';
import { FiltroPromocionPipe } from './pipes/filtro-promocion.pipe';
import { ListarPromocionComponent } from './promocion/listar-promocion/listar-promocion.component';
import { EditarPromocionComponent } from './promocion/editar-promocion/editar-promocion.component';
import { RegistrarPromocionComponent } from './promocion/registrar-promocion/registrar-promocion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    ListarPromocionComponent,
    EditarPromocionComponent,
    RegistrarPromocionComponent,
    FiltroPromocionPipe,
  ],
  imports: [
    NgxMaskModule.forRoot(maskConfig),
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
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
      { path: 'modificar-rol', component: ModificarRolComponent },
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
    VistaXRolService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
