<template>
    <b-form-group
        :id="'inp-group-' + this.$props.fieldName"
        :label="this.$props.label"
        :label-for="'inp-' + this.$props.fieldName"
        >
        <b-form-input
            type="text"
            @keyup="onChange"
            @change="onChange"
            :value="form.name"
            :id="'inp-' + this.$props.fieldName"
            :required="this.$props.required || false"
            :placeholder="this.$props.placeholder || ''"
        />
        <b-form-invalid-feedback
                :id="'invalid-' + this.$props.fieldName"
        />
    </b-form-group>
</template>

<script>
	import { BFormGroup, BFormInput, BFormInvalidFeedback } from 'bootstrap-vue'

	export default {
		name: "TextField",
		components: { BFormGroup, BFormInput, BFormInvalidFeedback },
        props: [ 'field', 'name', 'required', 'placeholder', 'label'],
		data() {
			return {
				form: {
					name: '',
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

