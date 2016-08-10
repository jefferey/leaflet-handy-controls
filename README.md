# leaflet-handy-controls

A casually growing collection of leaflet controls.

-----------------------------------------------------------------------------------

## Installation

### Bower

    bower install --save leaflet-handy-controls

### NPM

    npm install --save leaflet-handy-controls

### Direct Links

[js](https://raw.githubusercontent.com/jefferey/leaflet-handy-controls/master/src/leaflet-handy-controls.js)
[css](https://raw.githubusercontent.com/jefferey/leaflet-handy-controls/master/css/leaflet-handy-controls.css)

-----------------------------------------------------------------------------------

## Usage

```javascript
var myToggleButton = new L.Control.HandyToggleButton('<span>Click Me</span>', onButtonClickHandler, [options]);
myMap.addControl(myToggleButton);

var mySlider = new L.Control.HandySlider(onValueChangeHandler, [options]);
myMap.addControl(mySlider);

var myToggleSlider = new L.Control.HandyToggleSlider('<span>Click Me</span>', onButtonClickHandler, onValueChangeHandler, [options]);
myMap.addControl(myToggleSlider);
```
