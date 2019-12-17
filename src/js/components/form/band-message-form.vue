<template>
    <b-container class="row m-2">
        <div v-if="loading" class="col-11 col-lg-6 justify-content-center h-auto loader">
            <div class="">
                <pulse-loader :color="loader.color" :loading="loading" :size="loader.size" />
            </div>
        </div>
        <div v-else class="panel-body col-11 col-lg-6">
            <b-form
                id="frmBandMessage"
                name="frmBandMessage"
                class="mt-2"
                @reset="onReset"
                @submit="submit"
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
    import { getBandContactForm, sendBandContactForm } from '../../store/api'
	import ReCaptchaField from './fields/recaptcha'
	import ButtonField from "./fields/button";
	import VueFormGenerator from "vue-form-generator";
	import "vue-form-generator/dist/vfg.css";
	import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

	export default {
        name: "BandMessageFrom",
		components: {
        	"vue-form-generator": VueFormGenerator.component,
			PulseLoader,
			ReCaptchaField,
			ButtonField,
        },
        data() {
            return {
            	loading: true,
				loader: {
					color: "#007bff",
					size: "1.0rem",
				},
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
			onValidated(isValid, errors) {
				console.log("Validation result: ", isValid, ", Errors:", errors);
			},
            onVerifiy(token) {
				this.form.recaptcha = token;
				document.getElementById('invalid-recaptcha').style.display = (token.length === 0) ? 'block' : 'none';
            },
			submit(e) {
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
                    		this.model       = response.model;
							this.schema      = response.schema;
							this.formOptions = response.formOptions;
                            this.loading     = false
                        }
					})
                    .catch(err => {
						this.loading = false;
                        console.error(err)
                    })
            },
        },
	}
window.onload = () => {
//	document.getElementById('musik-richtung').firstChild.selected = true
}
</script>
