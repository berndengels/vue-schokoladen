<template>
    <div class="row m-4">
        <div class="mt-3">
            <Page :data="data" :audios="audios" />
        </div>
    </div>
</template>

<script>
	import Page from "./pages/page";
	import { getPage } from "../store/api";

	export default {
		name: "Pages",
		components: { Page },
		data() {
			return {
				data: {
					title: '',
                    body: '',
                },
                audios: null,
			}
		},
		created() {
			this.get(this.$route.params.page)
		},
		beforeRouteUpdate (to, from, next) {
			this.get(to.params.page);
			next()
		},
		methods: {
			get(pageSlug) {
				getPage(pageSlug)
					.then(data => {
						this.data = {
							title: data.title,
							body: data.body,
                        };
                        this.audios = data.audios || null
					})
					.catch(err => {
						console.error(err)
					})
			},
		},
	}
</script>
