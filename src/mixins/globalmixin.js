import {Util} from "leaflet"

export default {
    props: {
        options: {
            type: Object
        },
        position: {
            type: Array
        }
    },
    watch: {
        options(val) {
            Util.setOptions(this.getInstance(), val);
        }
    },
    methods: {
        getInstance() {
            return this.__map
        }
    }
}
