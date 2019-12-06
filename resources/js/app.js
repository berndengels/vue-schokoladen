window._ = require('lodash');
try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');
} catch (e) {}

const Vue = window.Vue = require('vue');
const axios = window.axios = require('axios');
import { setup } from 'axios-cache-adapter'

const axiosCache = window.axiosCache = setup({
    ...window.axios.defaults,
    baseURL: 'http://schoki2.loc',
//    baseURL: 'https://test.schokoladen-mitte.de',
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

const iAxios = window.iAxios = window.axios.create({
    ...window.axios.defaults,
    baseURL: 'http://schoki2.loc',
//    baseURL: 'https://test.schokoladen-mitte.de',
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

import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import BootstrapVue from 'bootstrap-vue'

Vue.use(VueRouter);
Vue.use(VueAxios, iAxios);
Vue.use(BootstrapVue);

const apiURL = window.apiURL = iAxios.defaults.baseURL;

import store from "./data/store";
import EventsPage from "./components/events";
import Pages from "./components/pages";
import MapPage from "./components/map";

const routes = [
    {
        name: 'events',
        path: '/',
        component: EventsPage,
    },
    {
        name: 'eventsByCategory',
        path: '/events/category/:slug?',
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
const router = new VueRouter({ mode: 'history', routes: routes });

import VCalendar from 'v-calendar';

Vue.use(VCalendar, {
    firstDayOfWeek: 2,  // Monday
});
import App from './App.vue';
try {
    const app = new Vue(Vue.util.extend({ router, store }, App)).$mount('#app');
} catch(err) {}
