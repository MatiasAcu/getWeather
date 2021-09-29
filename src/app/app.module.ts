import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {MatSidenavModule} from "@angular/material/sidenav";
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MainMenuButtonsComponent} from './main-menu-buttons/main-menu-buttons.component';
import {MainScreenComponent} from './main-screen/main-screen.component';
import {SidenavMenuComponent} from './sidenav-menu/sidenav-menu.component';
import {FirstCapLetterPipe} from '../pipes/first-cap-letter.pipe';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatOptionModule} from "@angular/material/core";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslocoRootModule} from "../modules/transloco-module/transloco-module.module";
import {MultiplyPipe} from '../pipes/multiply.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MainMenuButtonsComponent,
    MainScreenComponent,
    SidenavMenuComponent,
    FirstCapLetterPipe,
    MultiplyPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatOptionModule,
    ReactiveFormsModule,
    TranslocoRootModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
