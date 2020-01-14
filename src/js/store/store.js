import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
	devtools: true,
	state: {
		events: {
			category: null,
			data: [],
			count: 0,
		},
		eventDates: [],
		contactForm: {
			schema: {},
			model: {},
			formOptions: {},
		},
		page: {
			title: '',
			body: '',
			audios: [],
		},
		loading: true,
		error: null,
	},
	getters: {
		"error":		function (state) { return state.error },
		"events":		function (state) { return state.events },
		"loading":		function (state) { return state.loading },
		"eventDates":	function (state) { return state.eventDates },
		"contactForm":	function (state) { return state.contactForm },
		"page":			function (state) { return state.page },
	},
	actions: {
		"GET_EVENTS": function ({ commit }, payload) {
			const category = payload.category;
			const url = !!category ? '/api/spa/events/category/' + category : '/api/spa/events';
			iAxios
				.get(url)
				.then(function (response) {
					const events = {
						category: category,
						data: response.data,
						count: response.data.length,
					};
					commit('SET_EVENTS', events)
				})
				.catch(function (err) {
					commit('SET_ERROR', err)
				})
		},
		"GET_CONTACT_FORM": function ({ commit }, payload) {
			iAxios
				.get('/api/spa/contact/bands/fields')
				.then(function (response) {
					if(response.data.schema) {
						response.data.schema.fields.push(payload.form.submitButton)
					}
					commit('SET_CONTACT_FORM', response.data)
				})
				.catch(function (err) {
					commit('SET_ERROR', err)
				})
		},
		"GET_PAGE": function ({ commit }, payload) {
			const slug = payload.slug;
			const url = '/api/spa/page/' + slug;
			iAxios
				.get(url)
				.then(function (response) {
					commit('SET_PAGE', response.data )
				})
				.catch(function (err) {
					commit('SET_ERROR', err)
				})
		},
	},
	mutations: {
		SET_EVENTS: function (state, events) {
			state.loading		= false;
			state.events		= events;
			state.error			= null;
			state.eventDates	= events.data.map(item => item.date.split(' ').shift())
		},
		SET_CONTACT_FORM: function (state, data) {
			state.loading		= false;
			state.error			= null;
			state.contactForm	= data;
		},
		SET_PAGE: function (state, data) {
			state.loading		= false;
			state.error			= null;
			state.page 			= data;
		},
		SET_ERROR: function (state, error) {
			state.loading		= false;
			state.error			= error;
			console.error('store error');
			console.error(state.error)
		},
	},
});
export default store
