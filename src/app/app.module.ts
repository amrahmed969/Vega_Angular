import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { FormsModule } from '@angular/forms';
import { CounterComponent } from './counter/counter.component';
import { HomeComponent } from './home/home.component';
import { FetchdataComponent } from './fetchdata/fetchdata.component';
import { HttpClientModule } from "@angular/common/http"
import { CommonModule } from '@angular/common';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { PaginationComponentComponent } from './shared/pagination-component/pagination-component.component';
import { AuthModule } from '@auth0/auth0-angular';



@NgModule({
  declarations: [
    AppComponent,
    VehicleFormComponent,
    NavmenuComponent,
    CounterComponent,
    HomeComponent,
    FetchdataComponent,
    VehicleListComponent,
    PaginationComponentComponent,
        

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    AuthModule.forRoot({
      domain: 'dev-aoletybq.us.auth0.com',
      clientId: '78FT3pMgagX1RJ8NzdIVyVhGml2VYTsg'
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
