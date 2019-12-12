<template>
    <b-form-group>
        <div
            id="recaptcha"
            class="g-recaptcha"
            :value="form.recaptcha"
            :data-sitekey="captchaSiteKey"
            :name="this.$props.name"
        />
        <b-form-invalid-feedback :id="'invalid-' + this.$props.name">
            Bitte das Captcha ausfüllen!
        </b-form-invalid-feedback>
    </b-form-group>
</template>

<script>
	import { BFormGroup, BFormInvalidFeedback } from 'bootstrap-vue'
	import myConfig from "../../../inc/config";

	export default {
		name: "ReCaptchaField",
		components: { BFormGroup, BFormInvalidFeedback },
		props: ['name'],
        data() {
			return {
				widgetId: 0,
				captchaSiteKey: myConfig.NOCAPTCHA_SITEKEY,
				form: {
					recaptcha: '',
                },
            }
        },
		mounted() {
			this.render()
		},
		methods: {
			onChange: function (e) {
				this.$emit('update:field', this.form.recaptcha);
			},
			reset () {
				window.grecaptcha.reset(this.widgetId)
			},
			render () {
				if (window.grecaptcha) {
					const self = this;
					this.widgetId = window.grecaptcha.render('recaptcha', {
						sitekey: this.captchaSiteKey,
						// the callback executed when the user solve the recaptcha
						callback: (token) => {
							this.form.recaptcha = token;
							// emit an event called verify with the response as payload
							this.$emit('verify', token)
							// reset the recaptcha widget so you can execute it again
//							this.reset()
						},
					})
				}
			},
		},
	}
</script>

