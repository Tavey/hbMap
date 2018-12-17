<template></template>
<script>
import globalmixin from "@/mixins/globalmixin";
import childmixin from "@/mixins/childmixin";
import { polyline } from "leaflet";

const TAG_NAME = "hb-map-polyline";

export default {
    name: TAG_NAME,
    mixins: [globalmixin, childmixin],
    props: {
        visible: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            tagName: TAG_NAME
        };
    },
    watch: {
        visible(val) {
            val
                ? this.__map.addTo(this.getMap())
                : this.getMap().removeLayer(this.__map);
        },
        options(val) {
            val && this.__map && this.__map.setStyle(val);
        },
        position(val) {
            val.length > 1 && this.__map.setLatLngs(val);
        }
    },
    methods: {
        createPolyline() {
            this.__map = polyline(this.position, this.options);
            let rootMap = this.getMap();
            this.__map.addTo(rootMap);
        }
    }
};
</script>
