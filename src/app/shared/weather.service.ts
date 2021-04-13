
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const API_BASE_PATH: string = 'http://api.openweathermap.org/data/2.5';

const API_KEY: string = '5a4b2d457ecbef9eb2a71e480b947604';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getWeatherPerZipcodes(zipcodes: Array<string>): Observable<any> {

    // fix when zipcodes are empty return an empty list as the inner obs will be empty...
    if (zipcodes.length === 0) {
      return of([]);
    }
    return forkJoin(
      zipcodes.map((zip) => {
        return this.httpClient.get(`${API_BASE_PATH}/weather`, { params: {zip, appid: API_KEY, units: 'imperial'}})
          .pipe(
            catchError(_ => of(null)),
            map((r) => ({ weather: r, zip}),
          )
        )
      }),
    );
  }

  getFiveDayForecastForZipcode(zip: string): Observable<any> {
    return this.httpClient.get(`${API_BASE_PATH}/forecast/daily`, {params: {zip, appid: API_KEY, units: 'imperial', cnt: '5'}})
      .pipe(
        catchError(_ => of(null))
      );
  }
}
