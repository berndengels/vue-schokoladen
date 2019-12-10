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
		loading: true,
		error: null,
	},
	getters: {
		"error":		(state) => state.error,
		"events":		(state) => state.events,
		"loading":		(state) => state.loading,
		"eventDates":	(state) => state.eventDates,
	},
	actions: {
		"GET_EVENTS": ({ commit }, payload) => {
			const category = payload.category;
			const url = !!category ? '/api/spa/events/category/' + category : '/api/spa/events';
			axiosCache
				.get(url)
				.then(response => {
					const events = {
						category: category,
						data: response.data,
						count: response.data.length,
					};
					commit('SET_EVENTS', events)
				})
				.catch(err => {
					commit('SET_ERROR', err)
				})
		},
	},
	mutations: {
		SET_EVENTS: (state, events) => {
			state.loading		= false;
			state.events		= events;
			state.error			= null;
			state.eventDates	= events.data.map(item => item.date.split(' ').shift())
		},
		SET_ERROR: (state, error) => {
			state.loading		= false;
			state.events		= null;
			state.error			= error;
			state.eventDates	= []
		},
	},
});
export default store
