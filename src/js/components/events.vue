<template>
    <div class="row m-2">
        <div v-if="loading" class="col justify-content-center h-auto loader">
            <div class="">
                <pulse-loader :color="loader.color" :loading="loading" :size="loader.size" class="" />
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
        <div class="col">
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
//				category: this.$route.params.category || null,
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
