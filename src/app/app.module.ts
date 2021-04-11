import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ZipCodeService } from './shared/zip-code.service';
import { AddLocationComponent } from './location/add-location.component';
import { LocationsListComponent } from './location/locations-list.component';
import { ForecastComponent } from './forecast/forecast.component';
import { LocationComponent } from './location/location.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { WeatherService } from './shared/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { WeatherIconUrlPipe } from './shared/weather-icon-url.pipe';
@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule.forRoot(ROUTES, {useHash: true})],
  providers:    [ ZipCodeService, WeatherService],
  declarations: [ AppComponent, AddLocationComponent, LocationsListComponent, ForecastComponent, LocationComponent, WeatherIconUrlPipe ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
