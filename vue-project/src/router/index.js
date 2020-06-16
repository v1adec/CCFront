import Vue from 'vue';
import VueRouter from 'vue-router';
import Transaction from '../views/Transaction.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/auth',
		name: 'Auth',
		component: () => import('../views/Auth.vue'),
	},
	{
		path: '/',
		name: 'Transactions',
		component: Transaction,
	},
	{
		path: '/items',
		name: 'Items',
		component: () => import('../views/Items.vue'),
	},
	{
		path: '/goals',
		name: 'Goals',
		component: () => import('../views/Goals.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
