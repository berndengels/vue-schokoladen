<template>
    <div class="row m-4">
        <div class="mt-3">
            <Page :data="page" />
        </div>
    </div>
</template>

<script>
	import Page from "./pages/page";
	import store from "../store/store";

	export default {
		name: "Pages",
		components: { Page },
		beforeRouteEnter (to, from, next) {
			store.dispatch('GET_PAGE', { slug: to.params.page })
				.then(() => next(vm => {
					vm.page = to.params.page
				}));
		},
		beforeRouteUpdate (to, from, next) {
			store.dispatch('GET_PAGE', { slug: to.params.page })
				.then(() => next(vm => {
					vm.page = to.params.page
				}));
		},
		computed: {
			page: {
				get(){
					return this.$store.state.page
				},
				set(page){
					return page
				},
			},
		},
	}
</script>
