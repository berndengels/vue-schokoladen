<template>
    <div class="container">
        <h5>Page</h5>
        <div class="clearfix p-0 m-0">
            <div class="col-12 m-0 p-0 float-left">
                <Map />
            </div>
        </div>
    </div>
</template>

<script>
    import Map from "./pages/map";

    export default {
        name: "Map",
        components: {Map},
        data () {
            return {
                data: []
            }
        },
        methods: {
        }
    }
</script>
