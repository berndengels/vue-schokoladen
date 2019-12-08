<template>
    <div class="col">
        <h1>Calendar</h1>
        <div>
            <v-calendar
                :v-model="eventDates"
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
                ref="calendar"
                class="calendar"
            />
        </div>
    </div>
</template>
<script>
import VCalendar from 'v-calendar'
	export default {
		name: "Calendar",
        comments: { VCalendar },
        props: ['eventDates'],
		watch: {
			eventDates: function(newVal, oldVal) { // watch it
				console.log('Prop changed: ', newVal, ' | was: ', oldVal);
				return newVal
			},
		},
		methods: {
            handleChange(e) {
                console.log('handleChange');
                console.log(e)
            },
			handleClick(e) {
				this.$emit('click-date', e.id);
			},
		},
	}
</script>
