import { Routes } from '@angular/router'
import { ForecastComponent } from './forecast/forecast.component';
import { LocationComponent } from './location/location.component'

export const ROUTES: Routes = [{
  path: '',
  component: LocationComponent,
}, {
  path: 'forecast/:zipcode',
  component: ForecastComponent,
}];

