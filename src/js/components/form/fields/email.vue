<template>
    <b-form-group
        :id="'inp-group-' + this.$props.name"
        :label="this.$props.label"
        :label-for="'inp-' + this.$props.name"
        >
        <b-form-input
            type="email"
            @keyup="onChange"
            @change="onChange"
            :value="form.email"
            :id="'inp-' + this.$props.name"
            :required="this.$props.required || false"
            :placeholder="this.$props.placeholder || ''"
        />
        <b-form-invalid-feedback :id="'invalid-' + this.$props.name">
            Bitte eine  Email-Adresse angeben!
        </b-form-invalid-feedback>
    </b-form-group>
</template>

<script>
	import { BFormGroup, BFormInput, BFormInvalidFeedback } from 'bootstrap-vue'

	export default {
		name: "EmailField",
		components: { BFormGroup, BFormInput, BFormInvalidFeedback },
        props: ['name', 'model', 'required', 'placeholder', 'label'],
		data() {
			return {
				form: {
					email: '',
				},
			}
		},
		methods: {
			onChange: function (e) {
				this.$emit('update:field', (typeof e.target !== 'undefined') ? e.target.value : e.toString());
			},
		},
	}
</script>

