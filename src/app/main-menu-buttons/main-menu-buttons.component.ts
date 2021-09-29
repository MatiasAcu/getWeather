import {Component, EventEmitter, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-main-menu-buttons',
  templateUrl: './main-menu-buttons.component.html',
  styleUrls: ['./main-menu-buttons.component.css']
})
export class MainMenuButtonsComponent implements OnInit {

  @Output()
  openMenu = new EventEmitter<string>();

  visible: string = 'visible'

  constructor() {
  }

  ngOnInit(): void {
  }

  openPreferencesMenu() {
    this.openMenu.emit("Preferences Menu")
    this.visible = 'invisible'
  }

  openLocationsMenu() {
    this.openMenu.emit("Locations Menu")
    this.visible = 'invisible'
  }

  setVisible(bool: boolean) {
    if (bool) {
      this.visible = 'visible'
    } else {
      this.visible = 'invisible'
    }

  }

}
