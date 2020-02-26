import * as Cookies from "js-cookie";
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { config } from 'src/app.config';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './panel/users/users.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FoodsComponent } from './panel/foods/foods.component';
import { DashboardComponent } from './panel/dashboard/dashboard.component';
import { PanelComponent } from './panel/panel.component';
import { AllergensComponent } from './panel/allergens/allergens.component';
import { CategoriesComponent } from './panel/categories/categories.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestaurantsComponent } from './panel/restaurants/restaurants.component';
import { LogoutComponent } from './logout/logout.component';

function tokenGetter() {
  return Cookies.get("token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    PanelComponent,
    DashboardComponent,
    FoodsComponent,
    AllergensComponent,
    CategoriesComponent,
    UsersComponent,
    RestaurantsComponent,
    LogoutComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [config.WHITE_LIST_DOMAIN]
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
