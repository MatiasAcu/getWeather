import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PreferencesManagerService} from "../../services/preferences-manager.service";
import {Preferences} from "../../model/preferences";
import {AutocompleteService} from "../../services/autocomplete.service";
import {FormControl} from "@angular/forms";
import {catchError, debounceTime, finalize, switchMap, tap} from "rxjs/operators";
import {EMPTY, Observable, of} from "rxjs";
import {TranslocoService} from "@ngneat/transloco";


@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.css']
})
export class SidenavMenuComponent implements OnInit {

  filteredLocationsName !: string[]
  locations = new Observable<string[]>()
  gpsLocation = new Observable<string>()
  selectedUnit!: string;
  selectedLanguage!: string
  languagesName: Map<string | undefined, string> = new Map([['LANGUAGES.EN', 'en'], ['LANGUAGES.ES', 'es'], ['LANGUAGES.DE', 'de']])
  units = ['UNITS.METRIC', 'UNITS.IMPERIAL']
  status: string = ""
  containerClass: string = 'closed'
  menuClass: string = 'invisible'
  selectedIndex: number = -1;
  locationAutocomplete = new FormControl();
  autoCompleteLoading = false;


  @Output()
  closeMenu = new EventEmitter<boolean>()

  @Output()
  updateMainView = new EventEmitter<string>()

  constructor(private preferencesManagerService: PreferencesManagerService, private autoCompleteService: AutocompleteService, private translocoService: TranslocoService,) {
  }

  ngOnInit(): void {
    let preferences: Preferences = this.preferencesManagerService.getPreferences()
    this.selectedUnit = preferences.unit
    this.selectedLanguage = preferences.language.name
    this.updateLocations()
    this.autocompleteObserver()

  }

  /**
   * open and close animations for the menu
   */
  open(message: string) {
    this.status = message
    this.containerClass = 'open'
    this.menuClass = 'visible'
  }

  close() {
    this.status = ''
    this.containerClass = 'closed'
    this.menuClass = 'invisible'
    this.closeMenu.emit(true)
  }

  updateView(location: string) {
    this.updateMainView.emit(location)
  }

  setIndex(i: number) {
    this.selectedIndex = i
  }

  setSelectedUnit(unit: string) {
    let unit_code = this.getKeyByValue(unit)
    if (typeof unit_code == 'string') {
      this.selectedUnit = unit_code;
      let preferences = this.preferencesManagerService.getPreferences()
      preferences.unit = unit_code;
      this.preferencesManagerService.setPreferences(preferences)
      this.updateMainView.emit(preferences.locations[this.selectedIndex])
    }
  }

  setSelectedLanguage(language: string) {
    let lang = this.getKeyByValue(language)
    let lang_code = this.languagesName.get(lang)
    if (typeof lang_code == 'string' && typeof lang == 'string') {
      this.selectedLanguage = lang
      let preferences = this.preferencesManagerService.getPreferences()
      preferences.language = {name: lang, code: lang_code}
      this.preferencesManagerService.setPreferences(preferences)
      this.translocoService.setActiveLang(lang_code)
      this.updateMainView.emit(preferences.locations[this.selectedIndex])
    }
  }

  getLanguageName() {
    return Array.from(this.languagesName.keys())
  }

  insertNewLocation(location: string) {
    let preferences = this.preferencesManagerService.getPreferences()
    if (!(location in preferences.locations)) {
      preferences.locations[preferences.locations.length] = location
      this.preferencesManagerService.setPreferences(preferences)
      this.updateLocations()
    }
  }

  deleteLocation(location: string) {
    let preferences = this.preferencesManagerService.getPreferences()
    preferences.locations.forEach((element, index) => {
      if (element == location) {
        preferences.locations.splice(index, 1)
      }
    })
    this.preferencesManagerService.setPreferences(preferences)
    this.updateLocations()
  }

  updateGpsLocation(location: string) {
    if (!(location in this.preferencesManagerService.getPreferences().locations)) {
      this.gpsLocation = of(location)
    }
  }

  /**
   *
   * @private autocompleteObserver(): Makes the calls for the autocomplete service and updates the views
   */
  private autocompleteObserver() {
    this.locationAutocomplete.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.filteredLocationsName = []
          this.autoCompleteLoading = true
        }),
        switchMap(cityName => this.autoCompleteService.getLocationsLike(cityName)
          .pipe(
            finalize(() => {
              this.autoCompleteLoading = false
            }),
            catchError(() => EMPTY)),
        )
      )

      .subscribe(data => {
          this.filteredLocationsName = data.sort(function (a, b) {
            return a.length - b.length || a.localeCompare(b);
          });
        },
        error => {
          this.filteredLocationsName = [error]
        }
      )

  }

  /**
   * @private getKeyByValue: method that gets the key of a json from value.
   * Used when changing the view's language
   */
  private getKeyByValue(value: string) {
    const json = this.translocoService.getTranslation(this.translocoService.getActiveLang())
    return Object.keys(json).find(key => json[key] === value)
  }

  private updateLocations() {
    this.locations = of(this.preferencesManagerService.getPreferences().locations)
  }
}


