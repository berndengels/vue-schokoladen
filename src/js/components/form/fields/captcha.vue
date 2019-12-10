<template>
    <b-form-group>
        <vue-recaptcha :sitekey="captchaSiteKey" />
    </b-form-group>
</template>

<script>
	import { BFormGroup, BFormInvalidFeedback } from 'bootstrap-vue'
    import VueRecaptcha from 'vue-recaptcha';
	import myConfig from "../../../inc/config";

	export default {
		name: "CaptchaField",
		components: { BFormGroup, BFormInvalidFeedback, VueRecaptcha },
		props: ['name', 'required', 'placeholder', 'label'],
        data() {
			return {
				captchaSiteKey: myConfig.NOCAPTCHA_SITEKEY,
            }
        },
	}
</script>

