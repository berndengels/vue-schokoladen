<template>
  <div class="col">
    <div v-for="(item, index) in pageOfItems" :key="index" class="event">
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
        props: ['pageOfItems'],
    }
</script>
