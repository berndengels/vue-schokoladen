<template>
  <div class="eventContent col-12">
    <b-card-header header-tag="header" class="p-1 col-12">
      <b-button v-b-toggle="'accordion-' + $props.index" block href="#" variant="dark">
        <div class="d-block float-left">
          <b>{{ $props.event.date | toLocalDate }} {{ $props.event.time }}</b> <span>{{ $props.event.category }}</span>
        </div>
        <div class="d-block">
          {{ $props.event.title }}
        </div>
      </b-button>
    </b-card-header>
    <b-collapse :id="'accordion-' + $props.index" visible accordion="my-accordion" class="col-12">
      <b-card-body>
        <h5 v-if="'' !== $props.event.subtitle">
          {{ $props.event.subtitle }}
        </h5>
        <div v-if="carousel.images.length > 0" class="carousel-wrapper">
          <vue-flux
            :options="carousel.options"
            :images="carousel.images"
            :transitions="carousel.transitions"
          >
            <template v-if="carousel.options.autoplay" v-slot:controls>
              <flux-controls />
            </template>
            <template v-if="carousel.options.autoplay" v-slot:pagination>
              <flux-pagination />
            </template>
          </vue-flux>
        </div>

        <b-card-text v-html="$props.event.descriptionSanitized" />
      </b-card-body>
    </b-collapse>
  </div>
</template>

<script>
    import {
        VueFlux,
        FluxControls,
        FluxPagination,
    } from 'vue-flux';

    export default {
        name: "EventItem",
        components: {
            VueFlux,
            FluxControls,
            FluxPagination,
        },
        filters: {
            toLocalDate: function(v) {
                return (new Date(v)).toLocaleDateString();
            },
        },
        props: {
            event: {
                type: Object,
                default: null,
            },
            index: {
                type: Number,
                default: 0,
            },
        },
        data () {
            return {
                apiURL: apiURL,
                carousel: this.getImages(this),
            }
        },
        methods: {
            getImages(self) {
                var images = [];
                if(this.$props.event.images.length > 0) {
                    images = self.$props.event.images.map(img => {
                        return apiURL + '/media/images/' + img.internalName;
                    })
                }
                const len = images.length;
                return {
                    images: len > 0 ? images : [],
                    transitions: len > 1 ? [ 'kenburn', 'cube', 'book' ] : [],
                    options: {
                        autoplay: len > 1 ? true : false,
                    },
                }
            },
        },
    }
</script>
