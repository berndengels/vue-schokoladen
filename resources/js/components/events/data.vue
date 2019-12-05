<template>
    <div class="col">
        <div class="event" v-for="(item, index) in this.$props.pageOfItems" :key="index">
            <EventItem
                :event="item"
                :index="index"
            />
        </div>
    </div>
</template>

<script>
    import EventItem from './item'

    export default {
        name: "EventsData",
        components: { EventItem },
        data() {
            return {
                event: {}
            }
        },
        props: ['pageOfItems'],
    }
</script>
