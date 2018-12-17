<template></template>
<script>
import canvasMarker from '@/mapPlugins/CanvasMarker'
import globalmixin from "@/mixins/globalmixin"
import childmixin from "@/mixins/childmixin"

const TAG_NAME = "hb-map-canvasmarker"

export default {
    name: TAG_NAME,
    data() {
        return {
            tagName: TAG_NAME
        }
    },
    mixins: [
        globalmixin,
        childmixin
    ],
    props: {
        markGroup: {
            type: Array
        }
    },
    beforeDestroy() {
        this.__map.remove();
    },
    watch: {
        markGroup(val) {
            this.__map.replaceMarker(val);
        }
    },
    methods: {
        createCanvasmarker() {
                this.__map = canvasMarker()
                this.__map.addTo(this.getMap())
                this.markGroup && this.markGroup.forEach(m => this.__map.addMarker(m))    
        },
        redraw(clear) {
            this.__map && this.__map._redraw(clear);
        },
    }
}
</script>
