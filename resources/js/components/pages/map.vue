<template>
    <div>
        <h3 class="page-header mt-2">Adresse</h3>
        <div id="address" class="col-12">
            <div>
                <span>{{ location.address }}</span><br>
                <span>Fon: {{ location.fon }}</span><br>
                <span>Email: <a :href="'mailto:' + location.email" target="_blank">{{ location.email }}</a></span>
            </div>
        </div>
        <div id="map" class="mt-2">
            <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center">
                <l-tile-layer :url="url" />
                <l-marker :lat-lng="markerLatLng" @add="openPopup">
                    <l-popup :options="{ autoClose: false, closeOnClick: false }">
                        <div>
                            <span>{{ location.address }}</span><br>
                            <span>Fon: {{ location.fon }}</span><br>
                            <span>Email: <a :href="'mailto:' + location.email" target="_blank">{{ location.email }}</a></span>
                        </div>
                    </l-popup>
                </l-marker>
            </l-map>
        </div>
    </div>
</template>

<script>
    import Location from "../../inc/config";
    import { Icon } from "leaflet";
    import "leaflet.icon.glyph";
    import {
        LMap,
        LTileLayer,
        LMarker,
        LPopup
    } from 'vue2-leaflet'

    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });

    export default {
        name: "Map",
        components: {LMap, LTileLayer, LMarker, LPopup},
        data () {
            return {
                location: Location,
                zoom: Location.zoom,
                center: [Location.lat, Location.lng],
                url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                markerLatLng: [Location.lat, Location.lng],
            }
        },
        methods: {
            openPopup: function (event) {
                var self = this;
                this.popupTarget = event.target;
                this.$nextTick(function () {
                    self.popupTarget.openPopup();
                });
            },
        }
    }
</script>
<style scoped>
    div#map {
        display: block;
        float: left;
        clear: both;
        width: 400px;
        height: 400px;
    }
</style>
