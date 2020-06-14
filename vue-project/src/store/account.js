import { set } from '../utils';
import accountClient from '@/api/account';

const getDefaultState = () => {
	return {
		users: [],
	};
};

const state = getDefaultState();

const mutations = {
	setUsers: set('users'),
	resetState(state) {
		Object.assign(state, getDefaultState());
	},
};

const getters = {
	getUsers: ({ users }) => users,
};

const actions = {
	async login(_, { username, password }) {
		const { access_token } = await accountClient.loginUser(username, password);
		window.localStorage.setItem('token', access_token);
	},
	async registration(_, { userName, email, password }) {
		const { Id } = await accountClient.addUser(userName, email, password);
		if (Id) {
			console.log('registered');
		}
	},
	async getMe() {
		const account = await accountClient.getAccount();
		console.log(account);
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions,
};
