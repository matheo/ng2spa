import { Component, NgZone } from '@angular/core';
import { OpenWeatherMapService } from './open-weather-map.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  address: Object;
  coords: Object;
  city: Object;
  weather: Object;
  forecast: Object;
  error: string;

  constructor(
    private zone: NgZone,
    private api: OpenWeatherMapService
  ) {}

  reset(all: boolean = true) {
    if (all) this.address = null;
    this.coords = null;
    this.city = null;
    this.weather = null;
    this.forecast = null;
    this.error = null;
  }

  query() {
    this.api.weather(this.coords)
    .subscribe(
      weather => this.weather = weather,
      error => this.error = <any>error
    );

    this.api.forecast(this.coords)
    .subscribe(
      forecast => this.forecast = forecast,
      error => this.error = <any>error
    );
  }

  getAddress(place: Object) {
    this.zone.run(() => {
      if (place['formatted_address']) {
        this.formatPlace(place);
      } else {
        this.reset(false);
      }
    });
  }

  formatPlace(place: Object) {
    this.address = place['formatted_address'];
    this.city = {
      'name': place['vicinity'],
      'tz': place['utc_offset']
    };

    let location = place['geometry']['location'];
    this.coords = {
      lat: location.lat(),
      lng: location.lng()
    };

    this.query();
  }
}
