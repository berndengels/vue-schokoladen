window._ = require('lodash');
try {
	window.Popper = require('popper.js').default;
} catch (e) {}

const Vue = window.Vue = require('vue');
const axios = window.axios = require('axios');
import myConfig from "./inc/config";
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import BootstrapVue from 'bootstrap-vue'
import routes from "./router";
import store from "./store/store";
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import VCalendar from 'v-calendar'

window.iAxios = window.axios.create({
	...axios.defaults,
	baseURL: myConfig.apiURL,
	headers: {
		...axios.defaults.headers,
		common: {
			...axios.defaults.headers.common,
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
