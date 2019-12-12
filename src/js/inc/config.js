// _keys.js must added manualy, cause is ignored by git
import keys from './_keys'

const myConfig = {
	Location: {
		address: "Ackerstrasse 169, 10115 Berlin",
		fon: "030 - 282 65 27",
		email: "info@schokoladen-mitte.de",
		lat: 52.529745,
		lng: 13.397245,
		zoom: 15,
	},
	apiURL: 'http://schoki2.loc',
//    apiURL: 'https://test.schokoladen-mitte.de',
	NOCAPTCHA_SITEKEY: keys.NOCAPTCHA_SITEKEY,
	NOCAPTCHA_SITEKEY_INVISIBLE: keys.NOCAPTCHA_SITEKEY_INVISIBLE,
	NOCAPTCHA_SITEKEY_v3: keys.NOCAPTCHA_SITEKEY_v3,
};
export default myConfig
