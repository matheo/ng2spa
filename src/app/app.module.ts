import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FirstWordPipe } from './first-word.pipe'
import { GoogleplaceDirective } from 'ng2-gmaps-places/directives/googleplace.directive';
import { OpenWeatherMapService } from './open-weather-map.service';

@NgModule({
  declarations: [
    AppComponent,
    FirstWordPipe,
    GoogleplaceDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    OpenWeatherMapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
