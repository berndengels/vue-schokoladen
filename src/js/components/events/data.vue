<template>
    <div>
        <div :key="index" class="event" v-for="(item, index) in pageOfItems">
            <EventItem
                :event="item"
                :index="index"
            />
        </div>
        <div class="row">
            <div class="col h-50"><p>&nbsp;</p></div>
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
