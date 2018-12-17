<template></template>
<script>
    import {marker, icon, divIcon, Util} from "leaflet"
    import globalmixin from "@/mixins/globalmixin"
    import childmixin from "@/mixins/childmixin"

    const TAG_NAME = "hb-map-marker"

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
        props: {
            position: {
                type: Array,
                required: true
            },
            angle: {
                type: Number,
            },
            markercluster: {
                type: Boolean
            },
            visible: {
                type: Boolean,
                default: true
            }
        },
        watch: {
            visible(val) {
                if (val) {
                    this.__map.addTo(this.getMap())
                } else {
                    this.close()
                }
            },
            position(val) {
                val && this.__map.setLatLng(val)
            },
            "options.icon" (val) {
                this.__map.setIcon(val);
            }
        },
        updated() {
            !this.markercluster && this.__map.setLatLng(this.position);
            Util.setOptions(this.__map, this.options);
        },
        beforeDestroy() {
            this.__map.off('click', this.handleClick);
            this.__map.remove();
        },
        methods: {
            handleClick(e) {
                this.$emit('click', e, this);
            },
            createMarker() {
                    this.__map = marker(this.position, {...this.options});
                    this.visible && !this.markercluster && this.__map.addTo(this.getMap());
                    this.__map.on('click', this.handleClick);
            },
            close() {
                this.getMap().closePopup(this.__map)
            }
        }
    }
</script>
