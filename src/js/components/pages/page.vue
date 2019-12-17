<template>
    <div class="col-12 col-lg-8">
        <h5>{{ this.$props.data.title }}</h5>
        <div v-html="this.$props.data.body" />
        <div v-if="this.$props.audios" class="audios">
            <div v-for="audio in this.$props.audios" :key="audio.id">
                <aplayer :float="true"
                     :music="{
                	    theme: '#000000',
                	    artist: 'SchokiRadio',
                	    title: audio.externalName.split('.')[0],
                        src: myConfig.audioURL + audio.internalName,
                    }"
                />
            </div>
        </div>
    </div>
</template>

<script>
	import Aplayer from 'vue-aplayer'
	import myConfig from "../../inc/config";

	export default {
		name: "Page",
		components: { Aplayer },
		props: ['data','audios'],
        data() {
			return {
				myConfig: myConfig,
            }
        },
	}
</script>
