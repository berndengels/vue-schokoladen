<template>
    <b-container>
        <div class="panel-body">
            <b-form
                id="frmBandMessage"
                name="frmBandMessage"
                @submit="onSubmit"
                @reset="onReset"
            >
            <vue-form-generator
                :schema="schema"
                :model="model"
                :options="formOptions"
            />
            <ReCaptchaField
                name="recaptcha"
                ref="recaptcha"
                :field.sync="form.recaptcha"
                @verify="onVerifiy"
            />
            <ButtonField
                label="Senden"
                type="submit"
            />
            </b-form>
        </div>
    </b-container>
</template>

<script>
    import { getBandContactForm, sendBandContactForm } from '../../data/api'
	import ReCaptchaField from './fields/recaptcha'
	import ButtonField from "./fields/button";
	import VueFormGenerator from "vue-form-generator";
	import "vue-form-generator/dist/vfg.css";

	export default {
        name: "BandMessageFrom",
		components: {
        	"vue-form-generator": VueFormGenerator.component,
			ReCaptchaField,
			ButtonField,
        },
        data() {
            return {
            	form: {
					recaptcha: '',
                },
            	model: null,
                schema: null,
				formOptions: null,
				error: {
					music_style_id:	null,
					name: null,
					email: null,
					message: null,
					recaptcha: null,
                },
            }
        },
        created() {
            this.getForm()
		},
		methods: {
            onVerifiy(token) {
				this.form.recaptcha = token;
				document.getElementById('invalid-recaptcha').style.display = (token.length === 0) ? 'block' : 'none';
            },
			onSubmit(e) {
				e.preventDefault();

				sendBandContactForm({ ...this.model, ...this.form })
                    .then(response => {
                    	const self = this;
						if(response.errors) {
							Object.keys(response.errors).forEach(function(key) {
//								console.info("%s: %s", key, response.errors[key].shift());
//								self.error[key] = response.errors[key].shift();
							});
							console.info('errors');
							console.info(self.error);
							return
						}
						console.info('response');
						console.info(response)
                    })
                    .catch(response => {});
				return true;
            },
			onReset() {
				this.model = {
					music_style_id:	'',
					name: '',
					email: '',
					message: '',
					recaptcha: '',
				};
				this.error = {
					music_style_id:	null,
					name: '',
					email: '',
					message: '',
					recaptcha: '',
				};
			},
			getForm() {
				getBandContactForm()
                    .then(response => {
                    	if(response) {
                    		this.model      = response.model,
							this.schema      = response.schema;
							this.formOptions = response.formOptions
                        }
					})
                    .catch(err => {
                        console.error(err)
                    })
            },
        },
	}
</script>
