import {DivIcon} from 'leaflet';

export var DomMarkersIcon = DivIcon.extend({
    options: {
        element: null // a initialized DOM element
        //same options as divIcon except for html
    },

    createIcon: function () {
        if (!this.options.element) return;

        let div = this.options.element;
        this._setIconStyles(div, 'icon');
        return div;
    },
    createShadow: function () {
        return null;
    }
});

export function domMarkersIcon(options) {
    return new DomMarkersIcon(options);
}
