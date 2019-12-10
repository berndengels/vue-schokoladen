<template>
    <b-form-group
        :id="'inp-group-' + this.$props.name"
        :label="this.$props.label"
        :label-for="'inp-' + this.$props.name"
    >
        <b-form-select
            type="text"
            @change="onChange"
            :value="form.music_style_id"
            :id="'inp-' + this.$props.name"
            :options="this.$props.options"
            :required="this.$props.required || false"
            :placeholder="this.$props.placeholder || ''"
            :selected="this.$props.selected || null"
        />
        <b-form-invalid-feedback :id="'invalid-' + this.$props.name">
            Bitte eine Deine Musik Richtung auswählen!
        </b-form-invalid-feedback>
    </b-form-group>
</template>

<script>
	import { BFormGroup, BFormSelect, BFormInvalidFeedback } from 'bootstrap-vue'

	export default {
		name: "SelectField",
		components: { BFormGroup, BFormSelect, BFormInvalidFeedback },
        props: ['field', 'name', 'required', 'placeholder', 'label', 'options', 'selected'],
		data() {
			return {
				form: {
					music_style_id: null,
				},
			}
		},
		methods: {
			onChange: function (val) {
				this.$emit('update:field', val);
			},
		},
	}
</script>

