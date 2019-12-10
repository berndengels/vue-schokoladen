<template>
    <div class="my-0">
        <div v-if="loading" class="container">
            <div class="row align-content-center mt-4">
                <pulse-loader :color="loader.color" :loading="loading" :size="loader.size" class="col justify-center" />
            </div>
        </div>
        <div v-else>
            <div class="clearfix p-0">
                <div class="paginator ml-4 mt-2">
                    <MyPaginator
                        :items="events.data"
                        :labels="paginatorLabels"
                        :page-size="10"
                        @changePage="onChangePage"
                    />
                </div>
                <div class="text-center" />
                <div class="row">
                    <EventsData :page-of-items="pageOfItems" />
                    <Calendar :event-dates="eventDates" @click-date="openModal" />
                    <EventModal :event-data="selectedEvent" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import MyPaginator from "../plugins/paginator"
	import EventsData from "./events/data"
	import Calendar from "./calendar"
	import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
	import EventModal from "./events/modal";
	import { mapState } from 'vuex'
    import store from "../data/store";

	const paginatorLabels = {
		first: '<i class="fas fa-step-backward"></i>',
		last: '<i class="fas fas fa-step-forward"></i>',
		previous: '<i class="fas fa-arrow-circle-left"></i>',
		next: '<i class="fas fa-arrow-circle-right"></i>',
	};

	export default {
		name: "EventsPage",
		components: {
			MyPaginator,
			EventModal,
			EventsData,
			Calendar,
			PulseLoader,
		},
		data() {
			return {
				category: this.$route.params.category || null,
				paginatorLabels,
				selectedEvent: null,
				pageOfItems: [],
				loader: {
					color: "#007bff",
					size: "1.0rem",
				},
			}
		},
        beforeRouteEnter(to, from, next) {
            store.dispatch('GET_EVENTS', { category: to.params.category })
                .then(() => next(vm => {
                    vm.category = to.params.category
                }));
        },
		beforeRouteUpdate (to, from, next) {
			store.dispatch('GET_EVENTS', { category: to.params.category })
                .then(() => next(vm => {
                    vm.category = to.params.category
                }));
		},
		computed: mapState([
			'events',
			'loading',
			'eventDates',
		]),
		methods: {
            onChangePage(pageOfItems) {
                this.pageOfItems = pageOfItems;
            },
			openModal(date) {
				this.selectedEvent = this.events.data.find(item => {
					if( date === item.date.split(' ').shift() ) {
						return item;
					}
                });
                if(this.selectedEvent) {
					this.$bvModal.show('myModal')
                }
			},
		},
	}
</script>
