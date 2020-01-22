<template>
    <span />
</template>

<script>
	import myConfig from "../inc/config";

	export default {
		name: "Redirect",
		props: ['url'],
        created() {
			switch(this.$router.currentRoute.name) {
				case 'login':
        			window.location = myConfig.adminURL;
					break;
            }
		},
	}
</script>
