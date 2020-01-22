// _env.js must added manualy, cause is ignored by git
import _env from './_env'

const myConfig = {
	Location: {
		address: "Ackerstrasse 169, 10115 Berlin",
		fon: "030 - 282 65 27",
		email: "info@schokoladen-mitte.de",
		lat: 52.529745,
		lng: 13.397245,
		zoom: 15,
	},
	originURL: _env.url.ORIGIN,
	apiURL: _env.url.API,
	adminURL: _env.url.ADMIN,
	imageURL: _env.url.MEDIA + '/images/',
	audioURL: _env.url.MEDIA + '/audios/',
	NOCAPTCHA_SITEKEY: _env.nocaptcha.NOCAPTCHA_SITEKEY,
};

export default myConfig
