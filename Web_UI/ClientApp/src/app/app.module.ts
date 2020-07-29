import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { LandingPulsarComponent } from './landingPage/landing-pulsar/landing-pulsar.component';
import { RegistrarComercioComponent } from './registrar-comercio/registrar-comercio.component';
import { ComercioService } from './services/comercio.service';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { FileUploadModule } from "ng2-file-upload";
import cloudinaryConfiguration from './config';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { PerfilAdminComercioComponent } from './perfil-admin-comercio/perfil-admin-comercio.component';
import { ModificarComercioComponent } from './modificar-comercio/modificar-comercio.component';
import { RegistrarSucursalComponent } from './registrar-sucursal/registrar-sucursal.component';
import { AgmCoreModule } from '@agm/core';

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
    DashboardComercioComponent,
    RegistrarComercioComponent,
    PerfilAdminComercioComponent,
    LandingPulsarComponent,
    ModificarComercioComponent,
    RegistrarSucursalComponent,
  ],
  imports: [
    NgxMaskModule.forRoot(maskConfig),
    CloudinaryModule.forRoot({ Cloudinary }, cloudinaryConfiguration),
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FileUploadModule,
    Ng2CloudinaryModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyAdxnSzcqddE8WFixFcWcXYO3mhMKV0Aus' }),
    RouterModule.forRoot([
      { path: '', component: HomePageComponent, pathMatch: 'full' },
      { path: 'autenticacion', component: AutenticacionComponent },
      { path: 'agregar-empleado', component: AgregarEmpleadoComponent },
      { path: 'listar-empleado', component: ListarEmpleadoComponent },
      { path: 'listar-empleado', component: ListarEmpleadoComponent },
      { path: 'dashboard-admin', component: DashboardAdminComponent },
      { path: 'dashboard-admin/usuario', component: ListarUsuarioComponent },
      { path: 'dashboard-admin/usuario/listar-usuario', component: ListarUsuarioComponent },
      { path: 'dashboard-admin/usuario/agregar-usuario', component: AgregarUsuarioComponent },
      { path: 'dashboard-comercio', component: DashboardComercioComponent },
      { path: 'registrar-comercio', component: RegistrarComercioComponent },
      { path: 'perfil-admin-comercio', component: PerfilAdminComercioComponent },
      { path: 'dashboard-comercio', component: DashboardComercioComponent },
      { path: 'landing-pulsar', component: LandingPulsarComponent },
      { path: 'dashboard-comercio/modificar', component: ModificarComercioComponent },
      { path: 'dashboard-comercio/registrar-sucursal', component: RegistrarSucursalComponent },
    ])
  ],
  providers: [
    EmpleadoService,
    ComercioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
