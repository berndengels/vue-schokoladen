import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        events: [],
        loading: true,
    },
    getters: {
        events: (state) => state.events,
        loading: (state) => state.loading,
    },
    actions: {
        GET_EVENTS: ({ commit }, payload ) => {
            const url = !!payload.category ? '/api/events/category/' + payload.category : '/api/events';
            axiosCache
                .get(url)
                .then(response => {
                    commit('SET_EVENTS', response.data)
                })
                .catch(err => {
                    console.error(err)
                })
        },
    },
    mutations: {
        SET_EVENTS: (state, events) => {
            state.loading = false,
            state.events = events
        },
    },
});
export default store
