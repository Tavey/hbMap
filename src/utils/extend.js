// import L from 'leaflet';
import { Marker, DomUtil } from "leaflet";
import { DomMarkersIcon, domMarkersIcon } from "../mapPlugins/DomMarkerIcon";
import { MovingMarker, movingMarker } from "../mapPlugins/MovingMarker";
import "../mapPlugins/Leaflet.Editable";

const extendIcon = options => {
    let $setPos = Marker.prototype._setPos;

    Marker.include({
        _setPos: function(pos) {
            $setPos.call(this, pos);
            if (this.options.angle)
                this._icon.style[DomUtil.TRANSFORM] += `rotate(${
                    this.options.angle
                }deg)`;
            if (this.options.angleOrigin)
                this._icon.style[
                    L.DomUtil.TRANSFORM + "Origin"
                ] = this.options.angleOrigin;
        }
    });
};

extendIcon();

window.L.Marker.MovingMarker = MovingMarker;
window.L.Marker.movingMarker = movingMarker;

window.L.DomMarkers = {};
window.L.DomMarkers.Icon = DomMarkersIcon;
window.L.DomMarkers.icon = domMarkersIcon;
// window.L.LeafletEditable = LeafletEditable
