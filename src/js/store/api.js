import { menuTypes } from "../inc/const";

export const getEvents = (category = null) => {
	const url = category ? '/api/spa/events/category/' + category : '/api/events';
	return axiosCache
		.get(url)
		.then(response => {
			return response.data;
		})
		.catch(err => {
			return err;
		});
};

export const getMenu = (type) => {
	if (menuTypes.indexOf(type) === -1) {
		alert('menu type: ' + type + ' not found!');
		return null;
	}
	return axiosCache
		.get('/api/spa/menu/' + type)
		.then(response => {
			return response.data;
		})
		.catch(err => {
			return err;
		});
};

export const getPage = (slug) => {
	return axiosCache
		.get('/api/spa/page/' + slug)
		.then(response => {
			return response.data;
		})
		.catch(err => {
			return err;
		});
};
export const getMusicStyles = () => {
	return axiosCache
		.get('/api/spa/musicStyles')
		.then(response => {
			return response.data;
		})
		.catch(err => {
			return err;
		});
};
export const getBandContactForm = () => {
	return axiosCache
		.get('/api/spa/contact/bands/fields')
		.then(response => {
			return response.data;
		})
		.catch(err => {
			return err;
		});
};
export const sendBandContactForm = (data) => {
	return axiosCache
		.post('/api/spa/contact/bands/send', data)
		.then(response => {
			if(200 == response.status) {
				return response.data;
			}
		})
		.catch(err => {
			if(422 == err.response.status) {
				return err.response.data;
			}
			return err;
		});
};
