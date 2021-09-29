import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  private DEFAULT_URL: string = "https://getweatherrest-1631637655591.azurewebsites.net/"

  constructor(private http: HttpClient) {
  }

  getLocationsLike(cityName: string) {
    const params = new HttpParams()
      .set("cityName", cityName)

    return this.http.get<Array<string>>(this.DEFAULT_URL + "/locations/like?q=", {params})
  }
}
