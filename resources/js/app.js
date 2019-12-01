window._ = require('lodash');
try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');
} catch (e) {}

window.Vue = require('vue');
window.axios = require('axios');
window.iAxios = window.axios.create({
    ...window.axios.defaults,
    baseURL: 'http://schoki2.loc',
    headers: {
        ...window.axios.defaults.headers,
        common: {
            ...window.axios.defaults.headers.common,
            "X-Requested-With": "XMLHttpRequest",
        }
    },
    timeout: 5000,
    responseType: 'json',
    withCredentials: false,
    maxRedirects: 5,
});

import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import BootstrapVue from 'bootstrap-vue'
import VueCarousel from 'vue-carousel';

Vue.use(VueRouter);
Vue.use(VueAxios, iAxios);
Vue.use(BootstrapVue);
Vue.use(VueCarousel);

window.apiURL = iAxios.defaults.baseURL;
import EventsPage from "./components/events";
import Pages from "./components/pages";
import Map from "./components/map";

const routes = [
    {
        name: 'events',
        path: '/events',
        component: EventsPage
    },
    {
        name: 'eventsByCategory',
        path: '/events/category/:slug?',
        component: EventsPage
    },
    {
        name: 'eventsByTheme',
        path: '/events/theme/:slug?',
        component: EventsPage
    },
    {
        name: 'page',
        path: '/page/:slug',
        component: Pages
    },
    {
        name: 'map',
        path: '/map',
        component: Map
    },
];
const router = new VueRouter({ mode: 'history', routes: routes});

import App from './App.vue';
const app = new Vue(Vue.util.extend({ router }, App)).$mount('#app');
