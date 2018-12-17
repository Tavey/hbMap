<template></template>

<script>
import globalmixin from "@/mixins/globalmixin"
import childmixin from "@/mixins/childmixin"
import { polygon } from "leaflet"

const TAG_NAME = "hb-map-polygon"

export default {
    name: TAG_NAME,
    mixins: [
        globalmixin,
        childmixin
    ],
    data() {
        return {
            tagName: TAG_NAME
        }
    },
    beforeDestroy(){
        this.__map.remove();
    },
    methods: {
        createPolygon() {
            this.__map = polygon(this.position, this.options)
            let rootMap = this.getMap()
            this.__map.addTo(rootMap)
        },
    }
}
</script>
