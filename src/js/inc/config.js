// _keys.js must added manualy, cause is ignored by git
import keys from './_keys'
const apiURL = 'http://schoki2.loc';
const apiLiveURL = 'https://www.schokoladen-mitte.de';

const myConfig = {
	Location: {
		address: "Ackerstrasse 169, 10115 Berlin",
		fon: "030 - 282 65 27",
		email: "info@schokoladen-mitte.de",
		lat: 52.529745,
		lng: 13.397245,
		zoom: 15,
	},
	apiURL: apiURL,
//    apiURL: 'https://test.schokoladen-mitte.de',
	imageURL: apiLiveURL + '/media/images/',
	audioURL: apiLiveURL + '/media/audios/',

	NOCAPTCHA_SITEKEY: keys.NOCAPTCHA_SITEKEY,
	NOCAPTCHA_SITEKEY_INVISIBLE: keys.NOCAPTCHA_SITEKEY_INVISIBLE,
	NOCAPTCHA_SITEKEY_v3: keys.NOCAPTCHA_SITEKEY_v3,
};

export default myConfig
