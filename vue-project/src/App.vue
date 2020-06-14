<template>
	<v-app>
		<v-app-bar app color="primary" dark>
			<div class="d-flex align-center">
				<v-img
					alt="Vuetify Logo"
					class="shrink mr-2"
					contain
					src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
					transition="scale-transition"
					width="40"
				/>
				<router-link to="/">Transaction</router-link>
				<router-link to="/auth">Auth</router-link>
			</div>

			<v-spacer></v-spacer>

			<v-btn text @click="changeModeRegistration(true)">
				<span class="mr-2">Sign up</span>
			</v-btn>
			<v-btn text @click="changeModeRegistration(false)">
				<span class="mr-2">Sign in</span>
			</v-btn>
		</v-app-bar>
		<v-content>
			<router-view></router-view>
		</v-content>
	</v-app>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'App',

	// components: {
	// 	HelloWorld
	// },

	data: () => ({
		//
	}),

	created() {
		this.fetchCurrencies();
	},

	methods: {
		...mapActions(['changeModeRegistration']),
		...mapActions({
			fetchCurrencies: 'currency/fetchCurrencies',
		}),
	},
};
</script>
