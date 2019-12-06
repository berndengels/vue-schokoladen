<template>
  <div class="clearfix p-0 m-0">
    <h5>{{ this.$props.pageData.title }}</h5>
    <div v-html="this.$props.pageData.body" />
  </div>
</template>

<script>
export default {
    name: "Page",
    props: {
      pageData: {
        type: Object,
        default: null,
      },
    },
    data () {
        return {
//            data: {},
        }
    },
    computed: {
        data: function () {
            return this.$props.pageData;
        },
    },
}
</script>
