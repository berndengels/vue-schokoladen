<template>
    <div class="col-12">
        <Map />
    </div>
</template>

<script>
	import Map from "./pages/map";

	export default {
		name: "MapPage",
		components: { Map },
		data() {
			return {
				data: [],
			}
		},
		methods: {},
	}
</script>
