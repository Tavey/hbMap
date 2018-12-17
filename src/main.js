import "./utils/extend";

import Map from "./components/hb-map.vue";
import Canvasmarker from "./components/hb-map-canvasmarker.vue";
import Circle from "./components/hb-map-circle.vue";
import Marker from "./components/hb-map-marker.vue";
import Polygon from "./components/hb-map-polygon.vue";
import Polyline from "./components/hb-map-polyline.vue";
import Popup from "./components/hb-map-popup.vue";
import StreetView from "./components/hb-street-view.vue";

const components = [
    Map,
    Canvasmarker,
    Circle,
    Marker,
    Polygon,
    Polyline,
    Popup,
    StreetView
];

export default {
    install(Vue, options) {
        components.forEach(component => {
            Vue.component(component.name, component);
        });
    }
};
