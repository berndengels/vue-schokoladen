<template>
    <div class="eventContent col-12">
        <b-card-header class="p-1 col-12" header-tag="header">
            <b-button block href="#" v-b-toggle="'accordion-' + index" variant="dark">
                <div class="d-block float-left">
                    <b>{{ dateTime }}</b> <span>{{ event.category }}</span>
                </div>
                <div class="d-block">{{ event.title }}</div>
            </b-button>
        </b-card-header>
        <b-collapse :id="'accordion-' + index" accordion="my-accordion" class="col-12" visible>
            <b-card-body>
                <h5 v-if="'' !== event.subtitle">{{ event.subtitle }}</h5>
                <div class="carousel-wrapper" v-if="images.length > 0">
                    <vue-flux v-if="images.length > 1"
                        :images="images"
                        :options="{ autoplay: true }"
                        :transitions="['kenburn', 'cube', 'book']"
                    >
                        <template v-slot:controls>
                            <flux-controls />
                        </template>
                        <template v-slot:pagination>
                            <flux-pagination />
                        </template>
                    </vue-flux>
                    <vue-flux v-else
                        :images="images"
                        :options="{ autoplay: false }"
                        :transitions="[]"
                    />
                </div>
                <b-card-text v-html="event.descriptionSanitized" />
            </b-card-body>
        </b-collapse>
    </div>
</template>

<script>
	import { FluxControls, FluxPagination, VueFlux } from 'vue-flux';
	import myConfig from "../../inc/config";

	export default {
		name: "EventItem",
		components: {
			VueFlux,
			FluxControls,
			FluxPagination,
		},
		filters: {
			toLocalDate: function (v) {
				return (new Date(v)).toLocaleDateString();
			},
		},
		props: ['event', 'index'],
		computed: {
			dateTime: function () {
				return (new Date(this.event.date)).toLocaleDateString() + ' ' + this.event.time;
            },
            images: function() {
				const images = this.event.images;
				if(images.length > 0) {
					return images.map(img => myConfig.apiURL + '/media/images/' + img.internalName)
                }
				return []
            },
        },
	}
</script>
