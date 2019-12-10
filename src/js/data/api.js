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
export const sendBandMessageForm = (data) => {
	return axiosCache
		.get('/api/spa/musicStyles')
		.then(response => {
			return response.data;
		})
		.catch(err => {
			return err;
		});
};
