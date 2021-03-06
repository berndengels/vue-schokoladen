import { menuTypes } from "../inc/const";

export const getEvents = function(category) {
	const url = "undefined" !== category ? '/api/spa/events/category/' + category : '/api/events';
	return iAxios
		.get(url)
		.then(response => {
			return response.data;
		})
		.catch(function(err) {
			return err;
		});
};

export const getMenu = function(type) {
	if (menuTypes.indexOf(type) === -1) {
		return null;
	}
	return iAxios
		.get('/api/spa/menu/' + type)
		.then(function(response) {
			return response.data;
		})
		.catch(function(err) {
			return err;
		});
};

export const getPage = (slug) => {
	return iAxios
		.get('/api/spa/page/' + slug)
		.then(function(response) {
			return response.data;
		})
		.catch(function(err) {
			return err;
		});
};
export const getBandContactForm = () => {
	return iAxios
		.get('/api/spa/contact/bands/fields')
		.then(function(response) {
			return response.data;
		})
		.catch(function(err) {
			return err;
		});
};
export const sendBandContactForm = (data) => {
	return iAxios
		.post('/api/spa/contact/bands/send', data)
		.then(function(response) {
			if(200 == response.status) {
				return response.data;
			}
			else if(422 == response.status) {
				return response.data;
			}
		})
		.catch(function(err) {
			if(422 == err.response.status) {
				return err.response.data;
			}
			return err;
		});
};
