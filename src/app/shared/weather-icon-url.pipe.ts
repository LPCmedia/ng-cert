import { Pipe, PipeTransform } from '@angular/core';

/** converts the weather to a path for an icon
 * 
 * using: https://openweathermap.org/weather-conditions
 * 
 * doesn't handle night as clear will get the sun icon.
 * doesn't handle extreme conditions
 * defaults to blank url...not great, but hey its for a test.
 */

@Pipe({
  name: 'weatherIconUrl'
})
export class WeatherIconUrlPipe implements PipeTransform {

  transform(weather: any): string {

   let icon = '';

   switch (weather.id) {
      case (800):
        icon = 'https://www.angulartraining.com/images/weather/sun.png';
        break;
      case (weather.id > 800 && weather.id <= 804 ? weather.id: null):
        icon = 'https://www.angulartraining.com/images/weather/clouds.png';
        break;
      case (weather.id >= 200 && weather.id < 600 ? weather.id: null):
        icon = 'https://www.angulartraining.com/images/weather/rain.png';
        break;
      case (weather.id >= 600 && weather.id < 700 ? weather.id: null):
        icon = 'https://www.angulartraining.com/images/weather/snow.png';
        break
      default:
        icon = '';  
    }
    return icon;
  }

}
