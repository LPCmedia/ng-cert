import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WeatherService } from '../shared/weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  forecastsPerZip: any;
  isLoading$: Subject<boolean> = new Subject();
  fallback?: string;
  zipCode: string = '';

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    const zip = this.route.snapshot.paramMap.get('zipcode');
    if (zip) {
      this.zipCode = zip;
      this.isLoading$.next(true);
      this.weatherService.getFiveDayForecastForZipcode(zip).pipe(
        tap(()=> {this.isLoading$.next(false)})
      ).subscribe(
        (r) => {
          if (r) {
            this.forecastsPerZip = r;
          } else {
            this.fallback = `Could not load ${zip} forecast.`;
          }
        },
      );
    } else {
      this.fallback = `zip code must be provided or forecast lookup failed.`;
    }
  }

}
