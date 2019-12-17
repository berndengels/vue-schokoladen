<template>
    <div>
        <div id="address">
            <div>
                <span>{{ location.address }}</span><br>
                <span>Fon: {{ location.fon }}</span><br>
                <span>Email: <a :href="'mailto:' + location.email" target="_blank">{{ location.email }}</a></span>
            </div>
        </div>
        <div class="mt-2" id="map">
            <l-map :center="center" :zoom="zoom" style="height: 100%; width: 100%">
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
	import { Icon } from "leaflet";
	import "leaflet.icon.glyph";
	import { LMap, LMarker, LPopup, LTileLayer } from 'vue2-leaflet'
	import myConfig from "../../inc/config";

	delete Icon.Default.prototype._getIconUrl;
	Icon.Default.mergeOptions({
		iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
		iconUrl: require("leaflet/dist/images/marker-icon.png"),
		shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
	});

	export default {
		name: "Map",
		components: { LMap, LTileLayer, LMarker, LPopup },
		data() {
			return {
				location: myConfig.Location,
				zoom: myConfig.Location.zoom,
				center: [myConfig.Location.lat, myConfig.Location.lng],
				url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
				markerLatLng: [myConfig.Location.lat, myConfig.Location.lng],
			}
		},
		methods: {
			openPopup: function (event) {
				var self = this;
				this.popupTarget = event.target;
				this.$nextTick(() => self.popupTarget.openPopup());
			},
		},
	}
</script>
<style scoped>
    div#map {
        display: block;
        float: left;
        clear: both;
        width: 600px;
        max-width: 100%;
        height: 400px;
        max-height: 70%;
    }
</style>
