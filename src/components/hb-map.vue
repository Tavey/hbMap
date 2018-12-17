<template>
    <div
        :id="mapId"
        :style="{height: height}"
    >
        <slot></slot>
    </div>
</template>
<script>
import { TILE_URL } from "@/utils/consts.js";
import L from "leaflet";
// import '@/utils/Leaflet.Editable.js';

const TAG_NAME = "hb-map";
const mapType = [
    "m", // 路形图
    "t", // 地形图
    "p", // 带标签的地形图
    "s", // 卫星图
    "y", // 带标签的卫星图
    "h" // 标签层 (路名、地名等)
];

export default {
    name: TAG_NAME,
    data() {
        return {
            tagName: TAG_NAME,
            createFn: []
        };
    },
    props: {
        options: {
            type: Object
        },
        position: [Array, Boolean],
        zoom: {
            type: Number,
            default: 12
        },
        mapId: {
            type: String
        },
        type: {
            type: String,
            default: "m"
        },
        locale: {
            type: String,
            default: "zh-cn"
        },
        height: {
            type: String,
            default: "0"
        },
        zoomControlPosition: {
            type: String,
            default: "topLeft"
        }
    },
    watch: {
        createFn: fnarr => {
            fnarr.forEach((fn, i) => {
                typeof fn === "function" && fn();
                fnarr.splice(i, 1);
            });
        },
        type(val) {
            if (mapType.findIndex(type => type === val) === -1) return;
            this.__tileLayer.options.type = val;
            this.__tileLayer.redraw();
        }
    },
    provide() {
        return {
            mapCreateFn: this.createFn,
            getMap: this.getInstance
        };
    },
    mounted() {
        this.createMap();
    },
    beforeDestroy() {
        this.createFn.forEach(fn => (fn = null));
        this.createFn = [];

        this.__map
            .off("zoomStart", this.handleMapZoomStart)
            .off("moveStart", this.handleMapMoveStart)
            .off("zoom", this.handleMapZoom)
            .off("move", this.handleMapMove)
            .off("zoomEnd", this.handleMapZoomEnd)
            .off("moveEnd", this.handleMapMoveEnd)
            .off("mouseover", this.handleMapMouseOver)
            .off("mouseout", this.handleMapMouseOut);

        this.__map.remove();
    },
    methods: {
        getInstance() {
            return this.__map;
        },
        createMap() {
            let vm = this;
            vm.__map = L.map(vm.mapId, vm.options);

            if (vm.position) {
                vm.__map.fitBounds(vm.position, {
                    maxZoom: this.zoom
                });
            } else {
                vm.__map.fitWorld();
            }

            vm.__map
                .on("zoomstart", vm.handleMapZoomStart)
                .on("movestart", vm.handleMapMoveStart)
                .on("zoom", vm.handleMapZoom)
                .on("move", vm.handleMapMove)
                .on("zoomend", vm.handleMapZoomEnd)
                .on("moveend", vm.handleMapMoveEnd)
                .on("mouseover", vm.handleMapMouseOver)
                .on("mouseout", vm.handleMapMouseOut);

            vm.__tileLayer = L.tileLayer(TILE_URL, {
                type: vm.type,
                locale: vm.locale
            }).addTo(vm.__map);

            vm.__map.attributionControl.setPrefix("HB Map Svc");
        },
        handleMapZoomStart(e) {
            this.$emit("zoom-start", e);
        },
        handleMapMoveStart(e) {
            this.$emit("move-start", e);
        },
        handleMapZoom(e) {
            this.$emit("zoom", e);
        },
        handleMapMove(e) {
            this.$emit("move", e);
        },
        handleMapZoomEnd(e) {
            this.$emit("zoom-end", e);
        },
        handleMapMoveEnd(e) {
            this.$emit("move-end", e);
        },
        handleMapMouseOver(e) {
            this.$emit("mouse-over", e);
        },
        handleMapMouseOut(e) {
            this.$emit("mouse-out", e);
        }
    }
};
</script>
<style scoped>
#map {
    width: 100%;
    height: 100%;
}
</style>

