<template>
  <div class="my-0">
    <div v-if="loading">
      <pulse-loader class="mt-4" :loading="loading" :color="loader.color" :size="loader.size" />
    </div>
    <div v-else>
      <div class="clearfix p-0">
        <div class="paginator ml-4 mt-2">
          <MyPaginator
            :items="events"
            :page-size="10"
            :labels="paginatorLabels"
            @changePage="onChangePage"
          />
        </div>
        <div class="text-center" />
        <div class="row">
          <EventsData :page-of-items="pageOfItems" />
          <Calendar :events="events" @click-date="openModal" />
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
//    import {getEvents} from "../data/api";
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
                paginatorLabels,
                selectedEvent: null,
//                events: null,
//                loading: true,
                pageOfItems: [],
                loader: {
                    color: "#007bff",
                    size: "1.0rem",
                },
            }
        },
      computed: mapState([
        'events',
        'loading',
      ]),
        mounted() {
            console.info('stored events');
            console.info(this.$store.getters.events);
            this.$store.dispatch('GET_EVENTS', { category: this.$route.params.slug || null })
        },
        methods: {
            onChangePage(pageOfItems) {
                this.pageOfItems = pageOfItems;
            },
            openModal(data) {
                this.selectedEvent = data;
                this.$bvModal.show('myModal')
            },
        },
    }
</script>
