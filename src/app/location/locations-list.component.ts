import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ZipCodeService } from '../shared/zip-code.service';
import { switchMap } from 'rxjs/operators';
import { WeatherService } from '../shared/weather.service';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css']
})
export class LocationsListComponent {

  weatherPerZipcode$: Observable<Array<any>>;

  constructor(
    private zipcodeService: ZipCodeService,
    private weatherService: WeatherService,
  ) {
    this.weatherPerZipcode$ = this.zipcodeService.zipcodes$.pipe(
      switchMap((zips) => {
        return this.weatherService.getWeatherPerZipcodes(zips);
      })
    );
  }

  deleteZipcode(zip: string): void {
    this.zipcodeService.deleteZipcode(zip);
  }

}
