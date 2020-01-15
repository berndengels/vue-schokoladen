<template>
    <div class="row">
        <div v-if="error">
            <h3>Error</h3>
            {{ error }}
        </div>
        <div v-if="loading" class="col justify-content-center h-auto loader">
            <div class="">
                <pulse-loader :color="loader.color" :loading="loading" :size="loader.size" />
            </div>
        </div>
        <div v-else class="col">
            <div class="paginator ml-0">
                <MyPaginator
                    :items="events.data"
                    :labels="paginatorLabels"
                    :page-size="10"
                    @changePage="onChangePage"
                />
            </div>
            <EventsData :page-of-items="pageOfItems" />
        </div>
        <div class="d-none d-md-flex col">
            <Calendar :event-dates="eventDates" @click-date="openModal" />
        </div>
        <EventModal :event-data="selectedEvent" />
    </div>
</template>

<script>
	import MyPaginator from "../plugins/paginator"
	import EventsData from "./events/data"
	import Calendar from "./calendar"
	import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
	import EventModal from "./events/modal";
	import { mapState } from 'vuex'
    import store from "../store/store";

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
			'error',
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
