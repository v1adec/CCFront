import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
	theme: {
		options: {
			customProperties: true,
		},
		themes: {
			light: {
				primary: '#2699FB',
				secondary: '#0E2F3F',
				accent: '#82B1FF',
				error: '#EB5757',
				info: '#2196F3',
				success: '#0BA500',
				warning: '#FFC107',
			},
		},
	},
	icons: {
		iconfont: 'mdi',
	},
})
