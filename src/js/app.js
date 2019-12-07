window._ = require('lodash');
try {
	window.Popper = require('popper.js').default;
} catch (e) {
}

const Vue = window.Vue = require('vue');
const axios = window.axios = require('axios');
//import { setup } from 'axios-cache-adapter'
import myConfig from "./inc/config";
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import BootstrapVue from 'bootstrap-vue'
import store from "./data/store";
import { sync } from 'vuex-router-sync';
import EventsPage from "./components/events";
import Pages from "./components/pages";
import MapPage from "./components/map";
import Vuetify from 'vuetify/lib'
import vuetify from './plugins/vuetify';
import App from './App.vue';
/*
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
        maxAge: 15 * 60 * 1000,
    },
});
*/
const iAxios = window.iAxios = window.axios.create({
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
});

Vue.use(VueRouter);
Vue.use(VueAxios, iAxios);
Vue.use(BootstrapVue);

const routes = [
	{
		name: 'events',
		path: '/',
		component: EventsPage,
	},
	{
		name: 'eventsByCategory',
		path: '/events/category/:category',
		component: EventsPage,
	},
	{
		name: 'eventsByTheme',
		path: '/events/theme/:slug?',
		component: EventsPage,
	},
	{
		name: 'page',
		path: '/page/:slug',
		component: Pages,
	},
	{
		name: 'map',
		path: '/static/map',
		component: MapPage,
	},
];
const router = new VueRouter({
	routes: routes,
	mode: 'history',
});

sync(store, router);
/*
Vue.use(VCalendar, {
	firstDayOfWeek: 2,  // Monday
});
*/
try {
	const app = new Vue(Vue.util.extend({
		router,
		store,
		vuetify,
	}, App)).$mount('#app');
} catch (err) {
}
