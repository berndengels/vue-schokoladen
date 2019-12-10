<template>
    <b-form-group
        :id="'inp-group-' + this.$props.name"
        :label="this.$props.label"
        :label-for="'inp-' + this.$props.name"
        >
        <b-form-textarea
            @keyup="onChange"
            @change="onChange"
            :value="form.message"
            :id="'inp-' + this.$props.name"
            :required="this.$props.required || false"
            :placeholder="this.$props.placeholder || ''"
        />
        <b-form-invalid-feedback
                :id="'invalid-' + this.$props.name"
        />
    </b-form-group>
</template>

<script>
	import { BFormGroup, BFormTextarea, BFormInvalidFeedback } from 'bootstrap-vue'

	export default {
		name: "TextareaField",
		components: { BFormGroup, BFormTextarea, BFormInvalidFeedback },
        props: ['field', 'name', 'required', 'placeholder', 'label'],
		data() {
			return {
				form: {
					message: '',
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

