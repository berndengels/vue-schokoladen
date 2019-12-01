<template>
    <!-- The Modal -->
    <div class="modal fade" id="myModal">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
            <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">
                        <span v-html="event.title"></span>
                    </h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <table class="table">
                        <tr>
                            <td>Date</td>
                            <td>{{ event.date }} {{ event.time }}</td>
                        </tr>
                        <tr>
                            <td>Category</td>
                            <td v-html="event.category"></td>
                        </tr>
                        <tr>
                            <td>Subtitle</td>
                            <td v-html="event.subtitle"></td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td v-html="event.description"></td>
                        </tr>
                    </table>
                </div>

                <!-- Modal footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EventModal",
        data() {
            return {
                event: {
                    date: '',
                    time: '',
                    category: '',
                    theme: '',
                    title: '',
                    subtitle: '',
                    description: '',
                    images: [],
                }
            }
        },
        mounted() {
            $('#app').on('click-event', item => {
                console.log('on click-event')
                console.log(item)
                this.event = item;
            });
        },
        beforeDestroy () {
            $('#app').off('click-event');
        }
    }
</script>
<style scoped>
</style>
