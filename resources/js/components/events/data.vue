<template>
    <div class="col">
        <div class="event" v-for="(item, index) in this.$props.pageOfItems" :key="index">
            <div class="eventContent col-12">
                <b-card-header header-tag="header" class="p-1 col-12">
                    <b-button block href="#" v-b-toggle="'accordion-' + index" variant="dark">
                        <div class="d-block float-left">
                            <b>{{ item.date | toLocalDate }} {{ item.time }}</b> <span>{{ item.category }}</span>
                        </div>
                        <div class="d-block">{{ item.title }}</div>
                    </b-button>
                </b-card-header>
                <b-collapse :id="'accordion-' + index" visible accordion="my-accordion" class="col-12">
                    <b-card-body>
                        <h5 v-if="'' !== item.subtitle">{{ item.subtitle }}</h5>
                        <div class="carousel-wrapper">
                            <carousel
                                v-if="item.images.length > 0"
                                :controls="true"
                                :interval="3000"
                            >
                            <slide v-for="(img,idx) in item.images" :key="idx">
                                <img :src="apiURL + '/media/images/' + img.internalName" />
                            </slide>
                            </carousel>
                        </div>
                        <b-card-text v-html="item.description"></b-card-text>
                    </b-card-body>
                </b-collapse>
            </div>
        </div>
    </div>
</template>

<script>
    import { Carousel, Slide } from 'vue-carousel';

    export default {
        name: "EventsData",
        components: {Carousel, Slide},
        props: ['pageOfItems'],
        data () {
            return {
                apiURL: apiURL,
            }
        },
        filters: {
            toLocalDate: function(v) {
                return (new Date(v)).toLocaleDateString();
            }
        }
    }
</script>
<style scoped>
    .event {
        width: 100%;
        min-width: 100%;
    }
    .link {
        color: #0069d9;
        text-decoration: underline;
        font-weight: bold;
        cursor: pointer;
    }
</style>
