import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardComercioComponent } from './dashboard-comercio/dashboard-comercio.component';
import { RegistrarComercioComponent } from './registrar-comercio/registrar-comercio.component';
import { ComercioService } from './services/comercio.service';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { FileUploadModule } from "ng2-file-upload";
import cloudinaryConfiguration from './config';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { PerfilAdminComercioComponent } from './perfil-admin-comercio/perfil-admin-comercio.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    DashboardAdminComponent,
    DashboardComercioComponent,
    RegistrarComercioComponent,
    PerfilAdminComercioComponent
  ],
  imports: [
    CloudinaryModule.forRoot({ Cloudinary }, cloudinaryConfiguration),
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FileUploadModule,
    Ng2CloudinaryModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'registrar-comercio', component: RegistrarComercioComponent },
      { path: 'perfil-admin-comercio', component: PerfilAdminComercioComponent },
    ])
  ],
  providers: [
    ComercioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
