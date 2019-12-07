<template>
    <div class="row col-12">
        <table class="event">
            <tr :key="k" v-for="(val,k) in car">
                <td>{{ key }}</td>
                <td>{{ val }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
	export default {
		name: "EventDetail",
		props: ['event'],
	}
</script>
<style scoped>
</style>
