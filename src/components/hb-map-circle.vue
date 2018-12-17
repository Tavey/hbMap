<template></template>

<script>
import globalmixin from "@/mixins/globalmixin";
import childmixin from "@/mixins/childmixin";
import { circle, LeafletEditable } from "leaflet";

const TAG_NAME = "hb-map-circle";

export default {
    name: TAG_NAME,
    mixins: [globalmixin, childmixin],
    data() {
        return {
            tagName: TAG_NAME
        };
    },
    beforeDestroy() {
        this.__map.remove();
    },
    methods: {
        createCircle() {
            this.__map = circle(this.position, this.options);
            let rootMap = this.getMap();
            this.__map.addTo(rootMap);
        }
    }
};
</script>
