<template>
    <div>
        <b-modal id="myModal">
            <div>{{ this.$props.eventData.title }}</div>
        </b-modal>
    </div>
</template>

<script>
    import { BModal } from 'bootstrap-vue'

    export default {
        name: "EventModal",
        comments: { BModal },
        props: ['eventData','show'],
        data() {
            return {
                showMe: false,
                event: {
                    title: '',
                },
            }
        },
    }
</script>
