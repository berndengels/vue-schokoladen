import { menuTypes } from "../inc/const";

export const getEvents = (category = null) => {
	const url = category ? '/api/events/category/' + category : '/api/events';
	return iAxios
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
	return iAxios
		.get('/api/menu/' + type)
		.then(response => {
			return response.data;
		})
		.catch(err => {
			return err;
		});
};

export const getPage = (slug) => {
	return iAxios
		.get('/api/page/' + slug)
		.then(response => {
			return response.data;
		})
		.catch(err => {
			return err;
		});
};
