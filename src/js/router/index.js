import EventsPage from "../components/events";
import Pages from "../components/pages";
import MapPage from "../components/map";
import BandMessageFrom from "../components/form/band-message-form";
import Redirect from "../components/redirect";

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
		path: '/events/theme/:theme?',
		component: EventsPage,
	},
	{
		name: 'page',
		path: '/page/:page',
		component: Pages,
	},
	{
		name: 'map',
		path: '/static/map',
		component: MapPage,
	},
	{
		name: 'contact',
		path: '/contact/formBands',
		component:  BandMessageFrom,
	},
	{
		name: 'login',
		path: '/login',
		alias: '/admin',
		component: Redirect,
	},
];
export default routes
