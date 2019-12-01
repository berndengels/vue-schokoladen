<template>
    <div class="clearfix p-0 m-0">
        <h5>{{ this.$props.pageData.title }}</h5>
        <div v-html="this.$props.pageData.body"></div>
    </div>
</template>

<script>
export default {
    name: "Page",
    props: ['pageData'],
    data () {
        return {
            data: this.$props.pageData
        }
    },
    created() {
//        this.data = this.getData();
    },
    computed: {
        getData: function () {
            this.data = this.$props.pageData;
            return this.data
        }
    }
}
</script>
