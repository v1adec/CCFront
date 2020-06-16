import { set } from '../utils';
import itemsClient from '@/api/item';

const getDefaultState = () => {
	return {
		items: [],
	};
};

const state = getDefaultState();

const mutations = {
	setItems: set('items'),
	resetState(state) {
		Object.assign(state, getDefaultState());
	},
};

const getters = {
	itemName: state => id => state.items.find(item => item.Id === id)?.Name,
};

const actions = {
	async fetchItems({ commit }) {
		const { list } = await itemsClient.getItems();
		commit('setItems', list);
	},
	async addItem({ dispatch }, payload) {
		await itemsClient.addItem(payload);
		dispatch('fetchItems');
	},
	async deleteItem({ dispatch }, payload) {
		await itemsClient.deleteItem(payload);
		dispatch('fetchItems');
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions,
};
