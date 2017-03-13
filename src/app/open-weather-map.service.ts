import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class OpenWeatherMapService {

  constructor(
    private _http: Http
  ) {  }

  getUrl(service: string, lat: number, lng: number, params: string = '') {
    let baseurl = 'http://api.openweathermap.org/data/2.5';
    let apikey = '5861bb35c70f810a6094555db4603d7d';

    return `${baseurl}/${service}?lat=${lat}&lon=${lng}&units=metric&APPID=${apikey}${params}`;  // &lang=es
  }

  weather(coords: Object): Observable<Object> {
    return this._http
      .get(this.getUrl('weather', coords['lat'], coords['lng']))
      .map(this.formatWeather)
      .catch(this.handleError);
  }

  forecast(coords: Object): Observable<Object> {
    return this._http
      .get(this.getUrl('forecast/daily', coords['lat'], coords['lng'], '&cnt=4'))
      .map(this.formatForecast)
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    let err: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const e = body.message || JSON.stringify(body);
      err = `${error.status} ${error.statusText || ''} - ${e}`;
    } else {
      err = error.message ? error.message : error.toString();
    }
    return Observable.throw(err);
  }

  private formatWeather(res: Response) {
    let data = res.json();
    let weather = data.weather.pop();
    return {
      id: weather['id'],
      title: weather['main'],
      description: weather['description'],
      temp: data['main']['temp'].toFixed(0),
      temp_min: data['main']['temp_min'].toFixed(0),
      temp_max: data['main']['temp_max'].toFixed(0),
      humidity: data['main']['humidity'],
      cloudiness: data['clouds']['all'],
      wind_speed: data['wind']['speed'],
      wind_deg: data['wind']['deg'],
    }
  }

  private formatForecast(res: Response) {
    let data = res.json();
    let result = [], weather = {};
    for (let day of data['list']) {
      weather = day.weather.pop();
      result.push({
        dt: day['dt'],
        id: weather['id'],
        title: weather['main'],
        description: weather['description'],
        temp_min: day['temp']['min'].toFixed(0),
        temp_max: day['temp']['max'].toFixed(0),
        humidity: day['humidity'],
        cloudiness: day['clouds'],
        wind_speed: day['speed'],
        wind_deg: day['deg'],
      })
    }
    return result;
  }
}
