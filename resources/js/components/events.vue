<template>
    <div class="my-0">
        <div v-if="loader.loading">
            <pulse-loader class="mt-4" :loading="loader.loading" :color="loader.color" :size="loader.size"></pulse-loader>
        </div>
        <div v-else>
            <div class=" clearfix p-0">
                <div class="paginator ml-4 mt-2">
                    <MyPaginator
                        :items="events"
                        :pageSize="10"
                        :labels="paginatorLabels"
                        @changePage="onChangePage"
                    />
                </div>
                <div class="text-center">
                </div>
                <div class="row">
                    <EventsData :page-of-items="pageOfItems" />
                    <Calendar  @click-date="openModal" :events="events" />
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
    import SquareLoader from 'vue-spinner/src/SquareLoader.vue'
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
    import EventModal from "./events/modal";
    import {getEvents} from "../data/api";

    const paginatorLabels = {
        first: '<i class="fas fa-step-backward"></i>',
        last: '<i class="fas fas fa-step-forward"></i>',
        previous: '<i class="fas fa-arrow-circle-left"></i>',
        next: '<i class="fas fa-arrow-circle-right"></i>'
    };

    export default {
        name: "EventsPage",
        components: {
            MyPaginator,
            EventModal,
            EventsData,
            Calendar,
            SquareLoader,
            PulseLoader,
        },
        data() {
            return {
                paginatorLabels,
                selectedEvent: null,
                events: [],
                pageOfItems: [],
                loader: {
                    loading: true,
                    color: "#007bff",
                    size: "1.0rem"
                },
            }
        },
        created() {
            this.getData()
        },
        methods: {
            async getData() {
                return getEvents(this.$route.params.slug || null)
                    .then(data => {
                        this.events = data;
                        this.loader.loading = false;
                    })
                    .catch(err => {
                        console.error(err)
                    });
            },
            onChangePage(pageOfItems) {
                this.pageOfItems = pageOfItems;
            },
            openModal(data) {
                this.selectedEvent = data;
                this.$bvModal.show('myModal')
            }
        }
    }
</script>
