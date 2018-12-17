<script>
export default {
    name: "hb-street-view",
    render(h) {
        return h("div", {}, [
            h("div", {
                attrs: {
                    id: "street-view"
                },
                style: {
                    width: "100%",
                    height: this.height
                }
            }),
            h("script", {
                attrs: {
                    async: true,
                    class: "hb-street-view",
                    src:
                        "https://maps.google.cn/maps/api/js?key=AIzaSyDpfGZo2e8pDHGEFqQkwL-WGv33-YjMMY8&callback=$googleInitPanorama"
                },
                
            })
        ]);
    },
    props: {
        streetView: {
            type: Object,
            required: true
        },
        height: {
            type: String,
            default: "200px"
        }
    },
    created() {
        window.$googleInitPanorama = () => {
            var panorama = new google.maps.StreetViewPanorama(
                document.getElementById("street-view"),
                {
                    pano: "reception",
                    visible: true,
                    zoom: 20,
                    panoProvider: this.getReceptionPanoramaData
                }
            );
        };
    },
    methods: {
        getReceptionPanoramaData() {
            let {
                tile_size,
                world_size,
                tile_url,
                thumb_url
            } = this.streetView;
            return {
                tiles: {
                    tileSize: new google.maps.Size(tile_size[0], tile_size[1]),
                    worldSize: new google.maps.Size(
                        world_size[0],
                        world_size[1]
                    ),
                    getTileUrl(pano, z, x, y) {
                        if (z === 0) {
                            return thumb_url;
                        }
                        return tile_url
                            .replace("%x", x)
                            .replace("%y", y)
                            .replace("%z", z);
                    }
                }
            };
        },
    }
};
</script>
