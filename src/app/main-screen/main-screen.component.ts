import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MainScreenService} from "../../services/main-screen.service";
import {WeatherInfo} from "../../model/weather-info";
import {PreferencesManagerService} from "../../services/preferences-manager.service";
import {TranslocoService} from "@ngneat/transloco";
import {WeatherManagerService} from "../../services/weather-manager.service";


@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {

  loaded: boolean = false
  weatherInfo: WeatherInfo | undefined
  translated = {translated: false}
  error: string = ''

  @Output()
  locationUpdated = new EventEmitter<string>()

  @Output()
  mainScreenUpdated = new EventEmitter<string>()

  constructor(private mainScreenService: MainScreenService,
              private preferencesManager: PreferencesManagerService,
              private translocoService: TranslocoService,
              private weatherManagerService: WeatherManagerService) {
  }

  ngOnInit(): void {
    navigator.permissions.query({name: 'geolocation'}).then(permission => {
      if (permission.state == "granted") {
        this.updateMainScreen()
      } else {
        if (this.preferencesManager.existsPreferences()) {
          this.updateMainScreen(this.preferencesManager.getPreferences().lastGPSLocation)
        } else {
          this.setError('GPS disabled')
        }
        this.locationUpdated.emit("GPS disabled")
      }
    })
    this.translocoService.setActiveLang(this.preferencesManager.getPreferences().language.code)
  }

  getError() {
    return this.error
  }

  setError(message: string) {
    this.error = message
  }

  isLoaded() {
    return this.loaded
  }

  /**
   * Translate animation
   */
  translate() {
    this.translated = {translated: !this.translated.translated}
  }

  updateMainScreen(location?: string) {
    this.loaded = false
    this.error = ''
    let preferences = this.preferencesManager.getPreferences()
    if (typeof location == 'string') {
      this.mainScreenService.updateScreenByCity(location, preferences.unit, preferences.language.code).then(data => {
        if (data == null) {
          if (this.weatherManagerService.existsPreferences()) {
            this.weatherInfo = this.weatherManagerService.getLastWeatherInfo()
            this.loaded = true
          } else {
            this.setError("Cant connect to server")
          }
        } else {
          this.weatherInfo = data
          this.loaded = true
          this.weatherManagerService.setLastWeatherInfo(data)
        }
      })
    } else {
      this.mainScreenService.updateScreenByGPS(preferences.unit, preferences.language.code).then(data => {
        if (data == null) {
          if (this.weatherManagerService.existsPreferences()) {
            this.weatherInfo = this.weatherManagerService.getLastWeatherInfo()
            this.loaded = true
            this.locationUpdated.emit(preferences.lastGPSLocation)
          } else {
            this.setError("Cant connect to server")
            this.locationUpdated.emit(preferences.lastGPSLocation)
          }
        } else {
          this.weatherInfo = data
          this.loaded = true
          preferences.lastGPSLocation = data.city.name + ',' + data.city.country
          this.weatherManagerService.setLastWeatherInfo(data)
          this.preferencesManager.setPreferences(preferences)
          this.locationUpdated.emit(this.weatherInfo.city.name + ',' + this.weatherInfo.city.country)
        }
      })
    }

  }

}
