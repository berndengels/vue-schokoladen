<template>
    <b-form-group>
        <b-button
            :variant="this.$props.variant || 'primary'"
            :type="this.$props.type || 'button'"
        >
        {{ this.$props.label || 'Enter' }}
        </b-button>
    </b-form-group>
</template>

<script>
	import { BFormGroup, BButton } from 'bootstrap-vue'
	export default {
		name: "ButtonField",
		components: { BFormGroup, BButton },
        props: ['label','type','variant','handle'],
	}
</script>

