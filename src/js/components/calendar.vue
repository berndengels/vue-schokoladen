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
	import Vuetify from 'vuetify'

	export default {
		name: "Calendar",
		vuetify: new Vuetify(),
        props: ['eventDates'],
		data() {
			return {
/*
				attrs: [{
                    key: 'today',
                    highlight: {
                        backgroundColor: '#ff8080',
                    },
                    contentStyle: {
                        color: '#fff',
                        backgroundColor: '#a00',
                    },
                    dates: [],
                }],
 */
			};
		},
/*
		computed: {
			dates: function (el) {
				console.info(el)
				var calendar = this.$refs.calendar
				calendar.attribute.dates = this.eventDates
				calendar.reactive()
				calendar.refresh()
                return this.eventDates
			}
		},
 */
		watch: {
			eventDates: function(newVal, oldVal) { // watch it
				console.log('Prop changed: ', newVal, ' | was: ', oldVal);
				return newVal
			},
		},
		mounted() {
//			this.attrs[0].dates = this.eventDates
			this.$refs.calendar.checkChange()
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
