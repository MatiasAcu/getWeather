import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {WeatherInfo} from "../model/weather-info";
import {catchError, timeout} from "rxjs/operators";
import {EMPTY} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class MainScreenService {

  private UNITS = new Map([["UNITS.METRIC", "metric"], ["UNITS.IMPERIAL", "imperial"]])
  private DEFAULT_URL = "https://getweatherrest-1631637655591.azurewebsites.net/"

  constructor(private http: HttpClient) {
  }


  /**
   *update methods: Makes a call to the backend services and retreats a promises with the weather info,
   * if timeout returns empty promises
   */
  updateScreenByCity(cityName: string, unit: string, langCode: string) {

    const params = new HttpParams()
      .set("cityName", cityName)
      .set('langCode', langCode)
      .set('unit', this.getUnit(unit))
    return this.http.get<WeatherInfo>(this.DEFAULT_URL + "/weather?q=", {params}).pipe(
      timeout(10000), catchError(e => {
        return EMPTY
      }))
      .toPromise()
  }

  updateScreenByGPS(unit: string, langCode: string) {
    return this.getLocation().then(coords => {
      const params = new HttpParams()
        .set('lat', coords[0])
        .set('lon', coords[1])
        .set('langCode', langCode)
        .set('unit', this.getUnit(unit))
      return this.http.get<WeatherInfo>(this.DEFAULT_URL + "/weather?q=", {params}).pipe(
        timeout(10000), catchError(e => {
          return EMPTY
        })
      ).toPromise()
    })
  }


  /**
   *
   * @private getLocation(): Uses navigator geolocation to get the longitude and latitude of the client
   * and returns it as an array [lon,lat]
   */
  private getLocation(): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(Error('No support for geolocation'));
        return;
      }

      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        resolve([latitude.toString(), longitude.toString()]);
      });
    });
  }

  private getUnit(unit_code: string): string {
    let result = this.UNITS.get(unit_code)
    if (typeof result == 'string') {
      return result
    } else {
      return 'metric'
    }
  }


}


