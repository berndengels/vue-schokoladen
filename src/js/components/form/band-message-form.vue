<template>
    <b-container class="row m-2">
        <div v-if="loading" class="col-11 col-lg-6 justify-content-center h-auto loader">
            <div class="">
                <pulse-loader :color="loader.color" :loading="loading" :size="loader.size" />
            </div>
        </div>
        <div v-else class="panel-body col-11 col-lg-6">
            <div v-if="form.response.success" class="mt-3">
                <h3>Deine Nachricht wurde erfolgreich abgeschickt</h3>
                <div class="mt-2" v-html="form.response.message" />
            </div>
            <div v-else>
                <b-form
                    id="frmBandMessage"
                    name="frmBandMessage"
                    class="mt-2"
                    @reset.prevent="onReset"
                    @submit="onSubmit"
                >
                    <vue-form-generator
                        :schema="contactForm.schema"
                        :model="contactForm.model"
                        :options="contactForm.formOptions"
                        @validated="onValidated"
                    />
                    <ReCaptchaField
                        name="recaptcha"
                        ref="recaptcha"
                        :field.sync="form.recaptcha"
                        @verify="onVerifiy"
                    />
                </b-form>
            </div>
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
	import { mapState } from 'vuex'
	import store from "../../store/store";

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
				loader: {
					color: "#007bff",
					size: "1.0rem",
				},
				form: {
            		response: {
            			success: false,
            			error: null,
                        message: '',
                    },
					recaptcha: {
						token: '',
                        error: '',
                    },
                    submitButton: {
						type: 'submit',
						buttonText: 'Submit',
						validateBeforeSubmit: true,
						onSubmit: this.onSubmit,
                    },
                },
				model: null,
				schema: null,
				formOptions: null,
				formError: {
					music_style_id:	null,
					name: null,
					email: null,
					message: null,
					recaptcha: null,
                },
            }
        },
		computed: {
			contactForm() {
                return this.$store.state.contactForm
            },
            error() {
				return this.$store.state.error
            },
			loading: {
				get(){
					return this.$store.state.loading
				},
				set(val){
					return val
				},
			},
		},
        created() {
            store.dispatch('GET_CONTACT_FORM', { form: this.form });
		},
		methods: {
            onValidated(isValid, errors) {
//				console.log("Validation result: ", isValid, ", Errors:", errors);
            },
            onVerifiy(token) {
                this.form.recaptcha.token = token;
                document.getElementById('invalid-recaptcha').style.display = (token.length === 0) ? 'block' : 'none';
            },
            onSubmit(e) {
                document.getElementById('invalid-recaptcha').style.display = (this.form.recaptcha.token.length === 0) ? 'block' : 'none';
                if(this.form.recaptcha.token.length === 0) {
                    return false;
                }
                this.loading = true;

                sendBandContactForm({ ...this.contactForm.model, ...this.form })
                    .then(response => {
                        const self = this;
                        if(response.errors) {
                            Object.keys(response.errors).forEach(function(key) {
                                console.info("%s: %s", key, response.errors[key].shift());
                                self.formError[key] = response.errors[key].shift();
                            });
                            return
                        }
                        this.form.response = {
                            success: true,
                            error: null,
                            message: response.data.message.replace(/[\n\r]/g,'<br>'),
                        };
                        this.loading = false
                    })
                    .catch(err => {
                        console.error('form send error');
                        console.error(err)
                    });
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
                this.formError = {
                    music_style_id:	null,
                    name: '',
                    email: '',
                    message: '',
                    recaptcha: '',
                };
            },
        },
	}
</script>
