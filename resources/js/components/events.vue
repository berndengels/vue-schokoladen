<template>
    <div class="my-0">
        <div v-if="loader.loading">
            <pulse-loader class="mt-4" :loading="loader.loading" :color="loader.color" :size="loader.size"></pulse-loader>
        </div>
        <div v-else>
            <div class=" clearfix p-0">
                <div class="paginator ml-4 mt-2">
                    <jw-pagination
                            :items="events"
                            :pageSize="10"
                            @changePage="onChangePage"
                    />
                </div>
                <div class="row">
                    <EventsData :page-of-items="pageOfItems" />
                    <Calendar :event-data="events" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import JwPagination from "jw-vue-pagination"
    import EventsData from "./events/data"
    import Calendar from "./calendar"
    import SquareLoader from 'vue-spinner/src/SquareLoader.vue'
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
    import {getEvents} from "../data/api";

    export default {
        name: "EventsPage",
        components: {JwPagination, EventsData, Calendar, SquareLoader, PulseLoader},
        data() {
            return {
                events: [],
                pageOfItems: [],
                loader: {
                    loading: true,
                    color: "#007bff",
                    size: "1.0rem"
                }
            }
        },
        created() {
            this.getData()
        },
        methods: {
            async getData() {
                console.log('category');
                console.log(this.$route.params.slug);

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
            }
        }
    }
</script>
