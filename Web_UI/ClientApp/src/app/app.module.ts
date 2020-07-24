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
import { HeaderComponent } from './homePageComponents/header/header.component';
import { FooterComponent } from './homePageComponents/footer/footer.component';
import { HomePageComponent } from './homePageComponents/home-page/home-page.component';
import { HeroComponent } from './homePageComponents/hero/hero.component';
import { CategoriesComponent } from './homePageComponents/categories/categories.component';
import { FeaturedSpadComponent } from './homePageComponents/featured-spad/featured-spad.component';
import { BannerComponent } from './homePageComponents/banner/banner.component';
import { LastetProductComponent } from './homePageComponents/lastet-product/lastet-product.component';
import { CommentariesComponent } from './homePageComponents/commentaries/commentaries.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    DashboardAdminComponent,
    DashboardComercioComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    HeroComponent,
    CategoriesComponent,
    FeaturedSpadComponent,
    BannerComponent,
    LastetProductComponent,
    CommentariesComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'homePage', component: HomePageComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
