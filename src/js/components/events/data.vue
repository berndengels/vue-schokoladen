<template>
    <div class="col">
        <div :key="index" class="event" v-for="(item, index) in pageOfItems">
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
