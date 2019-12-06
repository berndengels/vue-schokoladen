<template>
  <div class="col">
    <h1>Calendar</h1>
    <div>
      <v-calendar class="calendar"
                  :attributes="attrs"
                  @dayclick="handleClick"
      />
    </div>
  </div>
</template>

<script>
    import VCalendar from 'v-calendar';

    export default {
        name: "Calendar",
        comments: { VCalendar },
        props: ['events'],
        data() {
            return {
                attrs: [
                    {
                        key: 'today',
                        highlight: {
                            backgroundColor: '#ff8080',
                        },
                        // Just use a normal style
                        contentStyle: {
                            color: '#fff',
                            backgroundColor: '#a00',
                        },
                        dates: this.getDates(),
                    },
                ],
            };
        },
        methods: {
            handleClick(e) {
                const event = this.$props.events.find(item => {
                    var date = item.date.split(' ').shift();
                    if(date === e.id) {
                        return item;
                    }
                });
                this.$emit('click-date', event);
            },
            getDates() {
                return this.$props.events.map(item => {
                    return item.date.split(' ').shift();
                });
            },
        },
    }
</script>
