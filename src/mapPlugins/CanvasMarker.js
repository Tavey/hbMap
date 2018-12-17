import { Layer, DomUtil, Util} from 'leaflet' 

export var CanvasMarker = Layer.extend({
    initialize: function (options, markers) {
        Util.setOptions(this, options)
    },
    
    addMarker: function(marker) {
        Util.stamp(marker)

        if (!this.markers) this.markers = []
        
        this.markers.push(marker)

        if (marker.event) {
            if (!this.eventList) {
                this.eventList = {}
            }

            if (!this.eventList[marker.event.type]) {
                this.eventList[marker.event.type] = []
            }

            this.eventList[marker.event.type].push(marker.event.eventFn)
        }
        
        this._drawMarker(marker)
    },
    replaceMarker: function(markerArr) {
        this.markers = markerArr;
        this._redraw();
    },
    onAdd: function(map, markergroup) {
        this._map = map

        if (!this._canvas) {
            this._initCanvas()
        }
        
        // this._initEventList() 

        if (this.options.pane) {
            this.getPane().appendChild(this._canvas);
          } else {
            map._panes.overlayPane.appendChild(this._canvas);
          }
    
          map.on('moveend', this._reset, this);
    },
    onRemove: function (map) {
        if (this.options.pane) {
          this.getPane().removeChild(this._canvas);
        } else {
          map.getPanes().overlayPane.removeChild(this._canvas);
        }
      },
    addTo: function (map, markers) {
        map.addLayer(this);
        return this;
    },
    _initEventList: function() {
        this.markers.forEach(({event}) => {
            for (let k in event) {
                if (!this.eventList[k]) this.eventList[k] = []
                this.eventList[k].push[event[k]]
            }
        })


        Object.keys(this.eventList).forEach(m => {
            this._canvas.addEventListener(m, (e) => {
                this.eventList[m],forEach(fn => {
                    typeof fn === 'function' && fn(e)
                })
            })
        }) 
    },
    _initCanvas: function() {
        this._canvas = DomUtil.create("canvas", "hb-map-marker")
        
        let {x, y} = this._map.getSize()
        this._canvas.width = x
        this._canvas.height = y

        DomUtil.addClass(this._canvas, `leaflet-zoom-${ this.options.zoomAnimation ? 'animated' : 'hide'}`)

        return this
    },
    _drawMarker: function(marker) {
        let point = this._map.latLngToContainerPoint(marker.position)
        let _ctx = this._canvas.getContext("2d")

        typeof marker.render === 'function' && marker.render(_ctx, point)
    },
    _redraw: function(clear) {
        if (!this._map) {
            return false;
        }

        if (clear) {
            this._canvas.getContext("2d").clearRect(0, 0, this._canvas.width, this._canvas.height)
            this.markers = null;
        }
          
        this.markers &&  this.markers.forEach(m => {
            this._drawMarker(m)
        })
    },
    _reset: function () {
        if (!this._map) return false;
        var topLeft = this._map.containerPointToLayerPoint([0, 0]);
        DomUtil.setPosition(this._canvas, topLeft);
    
        var size = this._map.getSize();
    
        this._canvas.width = size.x;
        this._canvas.height = size.y;
    
        this._redraw();
    },
      
})

export default (options) => {
    return new CanvasMarker(options)
}