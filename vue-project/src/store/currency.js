import { set } from '../utils';
import currencyClient from '@/api/currency';

const getDefaultState = () => {
	return {
		currencies: [],
	};
};

const state = getDefaultState();

const mutations = {
	setCurrencies: set('currencies'),
	resetState(state) {
		Object.assign(state, getDefaultState());
	},
};

const getters = {
	currencyName: state => id =>
		state.currencies.find(currency => currency.Id === id)?.Name,
};

const actions = {
	async fetchCurrencies({ commit }) {
		const { list } = await currencyClient.getCurrencies();
		commit('setCurrencies', list);
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions,
};
