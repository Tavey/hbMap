<script>
/**
 * open,close 事件需要绑在map上
 */
import globalmixin from "@/mixins/globalmixin";
import childmixin from "@/mixins/childmixin";
import { translateVnode } from "@/utils/util";
import { popup } from "leaflet";

const TAG_NAME = "hb-map-popup";

export default {
    name: TAG_NAME,
    mixins: [globalmixin, childmixin],
    data() {
        return {
            tagName: TAG_NAME
        };
    },
    props: {
        visible: {
            type: Boolean,
            default: true
        }
    },
    beforeDestroy() {
        this.__map.removeFrom(this.getMap());
        this.getMap().off("popupopen", this.handlePopupOpen);
        this.getMap().off("popupclose", this.handlePopupClose);
    },
    watch: {
        visible(val) {
            if (!val) {
                this.getMap().closePopup();
            } else {
                this.$nextTick(() => {
                    this.__map.setContent(this.$el).openOn(this.getMap());
                });
            }
        },
        position(latlng) {
            latlng && this.__map.setLatLng(latlng) && this.__map.update();
        }
    },
    methods: {
        createPopup() {
            this.__map = popup(this.options);
            this.__map.setLatLng(this.position);
            this.$el && this.__map.setContent(this.$el);
            this.visible && this.__map.openOn(this.getMap());
            this.options.event &&
                this.getMap().on("popupopen", this.handlePopupOpen);
            this.options.event &&
                this.getMap().on("popupclose", this.handlePopupClose);
        },
        handlePopupOpen() {
            this.$emit("open");
        },
        handlePopupClose() {
            this.$emit("close");
        }
    },
    render(h) {
        if (this.visible) {
            return h("div", this.$slots.default);
        }
        return null;
    }
};
</script>
