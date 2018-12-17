export default {
    inject: ['mapCreateFn', 'getMap'],
    created() {
        let _name = this.tagName.split('-')[2]
        let createMethod = this[`create${_name[0].toUpperCase()}${_name.substring(1)}`]
        this.mapCreateFn.push(createMethod)
    },
    beforeDestroy() {
        // this.getMap().remove();
    },
}
