import Vue from 'vue';
import Vuex from 'vuex';

import { set } from '../utils';

import accountModule from './account';
import transactionModule from './transaction';
import currencyModule from './currency';
import itemModule from './item';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		modeRegistration: false,
	},
	mutations: {
		setModeRegistration: set('modeRegistration'),
	},
	actions: {
		changeModeRegistration({ commit }, modeRegistration) {
			commit('setModeRegistration', modeRegistration);
		},
		clearData({ commit }) {
			commit('account/resetState');
			commit('transaction/resetState');
			commit('currency/resetState');
			commit('item/resetState');
		},
	},
	modules: {
		account: accountModule,
		transaction: transactionModule,
		currency: currencyModule,
		item: itemModule,
	},
});
