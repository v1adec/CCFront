<template>
	<v-app>
		<v-app-bar app color="primary" dark>
			<div class="d-flex align-center btns">
				<v-img
					alt="Vuetify Logo"
					class="shrink mr-2"
					contain
					src="./assets/logo.png"
					transition="scale-transition"
					width="200"
				/>
				<div v-if="$route.name !== 'Auth'">
					<v-btn to="/">Transaction</v-btn>
					<v-btn to="/items">Items</v-btn>
					<v-btn to="/goals">Goals</v-btn>
				</div>
			</div>

			<v-spacer></v-spacer>

			<div v-if="$route.name === 'Auth'">
				<v-btn text @click="changeModeRegistration(true)">
					<span class="mr-2">Sign up</span>
				</v-btn>
				<v-btn text @click="changeModeRegistration(false)">
					<span class="mr-2">Sign in</span>
				</v-btn>
			</div>
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
		console.log(this.$route);
	},

	methods: {
		...mapActions(['changeModeRegistration']),
		...mapActions({
			fetchCurrencies: 'currency/fetchCurrencies',
		}),
	},
};
</script>

<style lang="sass">
ul,li
	padding: 0
	margin: 0
	list-style-type: none
li
	max-width: 450px
	border: 1px solid #9c9c9c
	border-radius: 10px
	padding: 10px
	box-shadow: 1px 1px 5px 1px #9c9c9c
	margin-bottom: 20px
	position: relative
	.v-btn
		position: absolute
		right: 0
		top: 0%
.btns
	.v-btn
		margin-right: 10px
</style>
