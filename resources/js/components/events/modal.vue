<template>
  <div>
    <b-modal id="myModal"
             :title="dateTime + ' ' + event.title"
             :hide-footer="true"
             :scrollable="true"
    >
      <div v-if="!!event.subtitle">
        <h3 class="theme">
          {{ event.subtitle }}
        </h3>
      </div>
      <div>
        <h5 class="category">
          {{ event.category }}
          <span v-if="!!event.theme" class="theme">({{ event.theme }})</span>
        </h5>
      </div>
      <div v-html="event.descriptionSanitized" />
      <div v-if="linkList">
        <a v-for="(link,idx) in linkList" :key="idx" :href="link" target="_blank">{{ link }}</a><br>
      </div>
      <p />
    </b-modal>
  </div>
</template>

<script>
    import { BModal } from 'bootstrap-vue'

    export default {
        name: "EventModal",
        comments: { BModal },
        props: {
            eventData: {
                type: Object,
                default: null,
            },
        },
        data() {
            return {
                event: {},
            }
        },
        computed: {
            linkList: function(){
                if(this.event.links) {
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
                return strDate.replace(/\.,/,'') + " " + this.event.time
            },
        },
        watch: {
            eventData: function(nVal) {
                this.event = nVal
            },
        },
    }
</script>
