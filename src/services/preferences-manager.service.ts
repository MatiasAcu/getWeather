import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Preferences} from "../model/preferences";

@Injectable({
  providedIn: 'root'
})
export class PreferencesManagerService {

  private DEFAULT_PREFERENCES: Preferences = {
    unit: 'Metric', language: {name: 'LANGUAGES.EN', code: 'en'},
    locations: [], lastGPSLocation: ''
  }

  constructor(private cookieService: CookieService) {
  }


  getPreferences() {
    if (this.cookieService.check('preferences')) {
      let preferences: Preferences = JSON.parse(this.cookieService.get('preferences'))
      return preferences
    } else {
      return this.DEFAULT_PREFERENCES;
    }
  }

  setPreferences(preferences: Preferences) {
    this.cookieService.set('preferences', JSON.stringify(preferences), 24855, undefined, undefined, true, 'Lax')
  }

  existsPreferences() {
    return this.cookieService.check('preferences')
  }

}
