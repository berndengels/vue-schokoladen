<template>
        <div class="row m-4">
            <div class="mt-3 col-sm-12 col-lg-8">
                <Map />
            </div>
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
