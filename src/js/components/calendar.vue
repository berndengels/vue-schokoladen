<template>
    <!--div class="col"-->
        <div class="calendar-wrapper col-6">
            <div class="col-12">
                <h2><i class="fas fa-calendar-day" /> Event Kalender</h2>
                <v-calendar
                    class="calendar shadow"
                    :attributes="[{
                key: 'today',
                highlight: {
                    backgroundColor: '#ff8080',
                },
                contentStyle: {
                    color: '#fff',
                    backgroundColor: '#a00',
                },
                dates: eventDates,
            }]"
                    @dayclick="handleClick"
                />
            </div>
        </div>
    <!--/div-->
</template>
<script>
import VCalendar from 'v-calendar'
	export default {
		name: "Calendar",
        comments: { VCalendar },
        props: ['eventDates'],
		methods: {
			handleClick(e) {
				this.$emit('click-date', e.id);
			},
		},
	}
</script>
