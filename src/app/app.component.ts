import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public address: Object;
  public place: Object;
  public coords: Object;

  constructor(
    private zone: NgZone
  ) {}

  getAddress(place: Object) {
    this.zone.run(() => {
      if (place['formatted_address']) {
        this.address = place['formatted_address'];
        this.place = place;
        let location = place['geometry']['location'];
        this.coords = {
          lat: location.lat(),
          lng: location.lng()
        };
      } else {
        this.place = null;
        this.coords = null;
      }
    });
  }
}
