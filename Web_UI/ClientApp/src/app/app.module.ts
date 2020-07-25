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
import { AgregarEmpleadoComponent } from './empleado/agregar-empleado/agregar-empleado.component';
import { ListarEmpleadoComponent } from './empleado/listar-empleado/listar-empleado.component';
import { EmpleadoService } from './servicios/empleado.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    DashboardAdminComponent,
    DashboardComercioComponent,
    AgregarEmpleadoComponent,
    ListarEmpleadoComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'agregar-empleado', component: AgregarEmpleadoComponent },
      { path: 'listar-empleado', component: ListarEmpleadoComponent },
    ])
  ],
  providers: [
    EmpleadoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
