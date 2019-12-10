<template>
    <b-container>
        <b-form id="frmBandMessage" @submit="onSubmit" @reset="onReset" v-if="show">
            <SelectField
                    :field.sync="form.music_style_id"
                    name="music_style_id"
                    label="Musik Style"
                    :options="musicStyles"
                    placeholder="Deine Musik Richtung"
                    required
            />
            <TextField
                    :field.sync="form.name"
                    name="name"
                    label="Name"
                    placeholder="Dein Name"
                    required
            />
            <EmailField
                    :field.sync="form.email"
                    name="email"
                    label="Email"
                    placeholder="Deine Email Adresse"
                    required
            />
            <TextareaField
                    :field.sync="form.message"
                    name="message"
                    label="Nachricht"
                    placeholder="Deine Nachricht an uns"
                    required
            />
            <CaptchaField />
            <ButtonField
                    label="Senden"
                    type="submit"
            />
        </b-form>
    </b-container>
</template>

<script>
	import { BForm,BContainer } from 'bootstrap-vue'
	import SelectField from './fields/select'
    import TextField from './fields/text'
	import EmailField from './fields/email'
	import TextareaField from './fields/textarea'
	import ButtonField from './fields/button'
	import CaptchaField from './fields/captcha'
    import { getMusicStyles } from '../../data/api'

	export default {
        name: "BandMessageFrom",
        components: { BForm, BContainer, SelectField, TextField, EmailField, TextareaField, ButtonField, CaptchaField },
        data() {
            return {
                name: '',
                val: '',
                form: {
                    music_style_id:	null,
                    name: '',
                    email: '',
                    message: '',
                },
                show: true,
                musicStyles: [],
            }
        },
        created() {
            this.getStyles()
		},
		methods: {
			onSubmit(e) {
				e.preventDefault();
                console.info('v-model');
				console.info(this.form)
            },
			onReset() {
				this.form = {
					music_style_id:	null,
						name: '',
						email: '',
						message: '',
				};
			},
			onValidationFeedback() {

			},
            getStyles() {
				getMusicStyles()
                    .then(response => {
						const styles = response.map(item => {
							return {
								value: item.id,
								text: item.name,
							}
						});
						this.musicStyles = [{ text: "Bitte wählen ...", value: null }, ...styles]
					})
                    .catch(err => {
                        console.error(err)
                    })
            },
        },
	}
</script>
