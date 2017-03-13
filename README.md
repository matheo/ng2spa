# Alquemedia Weather

Simple SPA to check the current weather on any city, with the forecast for the next three days.

The information is fetched from [OpenWeatherMAP API](https://openweathermap.org/api)
and the design was adapted from [W3Layouts](https://w3layouts.com/sunlight-weather-responsive-widget-template/).

## Local Installation

Clone the repository and execute `npm install` to fetch the required packages.

Be sure to have `angular-cli` installed in your machine with `npm install -g @angular/cli`.

## Build

To get a local copy of the SPA, run:
```
ng build --prod --bh ./
```
you will get a `dist/` folder with the resources and `index.html`.

## TODO

* Customize language and metrics.
* OpenWeatherMap translation is faulty, have to make a custom one.
* Angular animations with a more componentized app.
