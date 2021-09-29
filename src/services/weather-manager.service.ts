import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {WeatherInfo} from "../model/weather-info";

@Injectable({
  providedIn: 'root'
})
export class WeatherManagerService {

  constructor(private cookieService: CookieService) {
  }

  getLastWeatherInfo() {
    if (this.cookieService.check('lastWeatherInfo')) {
      let weatherInfo: WeatherInfo = JSON.parse(this.cookieService.get('lastWeatherInfo'))
      return weatherInfo
    }
    return undefined
  }

  setLastWeatherInfo(weatherInfo: WeatherInfo) {
    this.cookieService.set('lastWeatherInfo', JSON.stringify(weatherInfo), 24855, undefined, undefined, true, 'Lax')
  }

  existsPreferences() {
    return this.cookieService.check('lastWeatherInfo')
  }

}
