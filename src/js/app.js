window._ = require('lodash');
try {
	window.Popper = require('popper.js').default;
} catch (e) {}

const Vue = window.Vue = require('vue');
const axios = window.axios = require('axios');
import { setup } from 'axios-cache-adapter'
import myConfig from "./inc/config";
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import BootstrapVue from 'bootstrap-vue'
import routes from "./router";
import store from "./store/store";
import { sync } from 'vuex-router-sync';
import EventsPage from "./components/events";
import Pages from "./components/pages";
import MapPage from "./components/map";
import BandMessageFrom from './components/form/band-message-form';
import App from './App.vue';
import VCalendar from 'v-calendar'

const axiosCache = window.axiosCache = setup({
    ...window.axios.defaults,
    baseURL: myConfig.apiURL,
    headers: {
        ...window.axios.defaults.headers,
        common: {
            ...window.axios.defaults.headers.common,
            "X-Requested-With": "XMLHttpRequest",
        },
    },
    timeout: 5000,
    responseType: 'json',
    withCredentials: false,
    maxRedirects: 5,
    cache: {
        maxAge: 120 * 60 * 1000, // 2 hours
    },
});
Vue.use(VueRouter);
Vue.use(VueAxios, axiosCache);
Vue.use(BootstrapVue);

const router = new VueRouter({
	routes: routes,
	mode: 'history',
});

sync(store, router);

Vue.use(VCalendar, {
	firstDayOfWeek: 2,  // Monday
});

try {
	const app = new Vue(Vue.util.extend({
		router,
		store,
	}, App)).$mount('#main');
} catch (err) {
}
