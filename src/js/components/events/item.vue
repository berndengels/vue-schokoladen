<template>
    <div class="eventContent col-12 m-0 mt-2 p-0">
        <b-card-header class="p-0 m-0 col-12" header-tag="header">
            <b-button block href="#" v-b-toggle="'accordion-' + index" variant="dark">
                <div class="row text-left">
                    <div class="icnCategory d-none d-lg-inline-block col-lg-1 justify-content-center">
                        <div>
                            <i class="icnCategory d-inline-block fa fa-music" :title="event.category" />
                        </div>
                    </div>
                    <div class="titleWrapper col-sm-12 col-lg-11">
                        <span class="dateTime shadow">{{ dateTime }}</span>
                        <span v-if="event.theme" class="theme px-1">{{ event.theme }}</span>
                        <br>
                        <span class="title">{{ event.title }}</span>
                    </div>
                </div>
            </b-button>
        </b-card-header>
        <b-collapse :id="'accordion-' + index" accordion="my-accordion" class="col-12 m-0 p-0" visible>
            <b-card-body class="m-0 p-0">
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
                <div v-if="'' !== event.subtitle">
                    <span class="subtitle">{{ event.subtitle }}</span>
                </div>
                <b-card-text v-html="event.descriptionSanitized" class="description" />
                <div v-if="linkList">
                    <div v-for="(link,idx) in linkList" :key="idx" class="links">
                        <a :href="link" target="_blank">{{ link }}</a>
                    </div>
                </div>
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
            linkList: function () {
                if (this.event.links) {
                    return this.event.links.split("\n")
                }
                return null
            },
            dateTime: function () {
                const strDate = (new Date(this.event.date)).toLocaleString('de-DE', {
                    timeZone: 'Europe/Berlin',
                    weekday: 'short',
                    day: '2-digit',
                    month: 'numeric',
                    year: 'numeric',
                });
                return strDate.replace(/\.,/, '') + " " + this.event.time
            },
            images: function() {
                const images = this.event.images;
                if (images.length > 0) {
                    return images.map(img => myConfig.imageURL + img.internalName)
                }
                return []
            },
        },
	}
</script>
