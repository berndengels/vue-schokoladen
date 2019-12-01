<template>
    <div class="container">
        <Page :page-data="data" />
    </div>
</template>

<script>
    import Page from "./pages/page";
    import {getPage} from "../data/api";

    export default {
        name: "Pages",
        components: {Page},
        data () {
            return {
                data: {}
            }
        },
        created() {
            this.get()
        },
        methods: {
            get() {
                 getPage(this.$route.params.slug)
                    .then(data => {
                        this.data = data
                    })
                    .catch(err => {
                        console.error(err)
                    })
            }
        }
    }
</script>
