/* ************************************************************************** */
/* leaflet-handy-controls                                                     */
/* http://github.com/jefferey/leaflet-handy-controls                          */
/*                                                                            */
/* Author: Jeff Smith [ www.jeffereysmith.com ]                               */
/* License: MIT License                                                       */
/* ************************************************************************** */

L.Control.HandyToggleButton = L.Control.extend({
    options: {
        position: 'topleft',
        onClick: undefined,
        icon: "<span>Button</span>"
    },
    toggled: false,
    initialize: function(icon, onClick, options) {
        L.Util.setOptions(this, options);

        if (typeof icon === 'string') {
            this.options.icon = icon;
        }

        if (typeof onClick === 'function') {
            this.options.onClick = onClick;
        }
    },
    setToggled: function(toggled) {
        this.toggled = toggled;
        if (this.toggled) {
            L.DomUtil.addClass(this.button, 'toggled-on');
        }
        else {
            L.DomUtil.removeClass(this.button, 'toggled-on');
        }
    },
    onButtonClick: function(e) {
        this.setToggled(!this.toggled);

        if (this.options.onClick) {
            this.options.onClick(this.toggled, e);
        }
    },
    onAdd: function() {
        this.button = L.DomUtil.create('div', 'handy-toggle-button leaflet-bar');
        this.button.innerHTML = this.options.icon;
        L.DomEvent.addListener(this.button, 'click', this.onButtonClick, this);
        L.DomEvent.disableClickPropagation(this.button);
        return this.button;
    },
    onRemove: function() {
        if (this.button) {
            L.DomEvent.removeListener(this.button, 'click', this.onButtonClick, this);
        }
    }
});

L.Control.HandySlider = L.Control.extend({
    options: {
        position: 'topleft',
        min: 0.0,
        max: 1.0,
        step: 0.1,
        onChange: undefined
    },
    value: 0,
    initialize: function(onChange, options) {
        L.Util.setOptions(this, options);

        if (!isNaN(this.options.value)) {
            this.value = Math.max(Math.min(this.options.value, this.options.max), this.options.min);
        }

        if (typeof onChange === 'function') {
            this.options.onChange = onChange;
        }
    },
    sliderChanged: function(e) {
        this.value = this.slider.value;

        if (this.options.onChange) {
            this.options.onChange(this.value, e);
        }
    },
    onAdd: function() {
        var container = L.DomUtil.create('div', 'handy-slider-container');
        this.slider = L.DomUtil.create('input', 'handy-slider', container);
        this.slider.type = 'range';
        this.slider.setAttribute('min', this.options.min);
        this.slider.setAttribute('max', this.options.max); 
        this.slider.setAttribute('step', this.options.step);
        this.setValue(this.value);

        if (this.options.background) {
            container.style.background = this.options.background;
            L.DomUtil.addClass(container, 'leaflet-bar');
        }

        L.DomEvent.addListener(this.slider, 'input', this.sliderChanged, this);
        L.DomEvent.disableClickPropagation(container);
        return container;
    },
    onRemove: function() {
        L.DomEvent.removeListener(this.slider, 'input', this.sliderChanged, this);
    },
    setValue: function (value) {
        this.value = value;
        if (this.slider) {
            this.slider.value = this.value;
        }
    }
});

L.Control.HandyToggleSlider = L.Control.extend({
    options: {
        position: 'topleft'
    },
    initialize: function(icon, onButtonClick, onSliderChange, options) {
        L.Util.setOptions(this, options);

        this.button = new L.Control.HandyToggleButton(icon, onButtonClick, options);
        this.slider = new L.Control.HandySlider(onSliderChange, options);
    },
    onAdd: function() {
        this.container = L.DomUtil.create('div', 'handy-group leaflet-bar');
        this.container.appendChild(this.button.onAdd());
        this.container.appendChild(this.slider.onAdd());
        
        return this.container;
    },
    setToggled: function(toggled) {
        if (this.button) {
            this.button.setToggled(toggled);
        }
    },
    setValue: function(value) {
        if (this.slider) {
            this.slider.setValue(value);
        }
    }
});