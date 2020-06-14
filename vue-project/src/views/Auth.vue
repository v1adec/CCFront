<template>
	<v-container>
		<v-row>
			<v-col col="6">img</v-col>
			<v-col col="6">
				<v-form ref="form" v-model="valid" :lazy-validation="lazy">
					<v-text-field
						v-model="name"
						:counter="10"
						:rules="nameRules"
						label="Name"
						required
					></v-text-field>

					<v-text-field
						v-model="email"
						:rules="emailRules"
						label="E-mail"
						required
					></v-text-field>

					<v-text-field
						v-model="password"
						:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
						:rules="[rules.required, rules.min]"
						:type="show1 ? 'text' : 'password'"
						name="input-10-1"
						label="Password"
						hint="At least 8 characters"
						counter
						@click:append="show1 = !show1"
					></v-text-field>

					<v-btn :disabled="!valid" color="success" class="mr-4" @click="login">
						Sign in
					</v-btn>

					<v-btn color="error" class="mr-4" @click="getAccount">
						Log
					</v-btn>

					<!-- <v-btn color="error" class="mr-4" @click="reset">
						Reset Form
					</v-btn>

					<v-btn color="warning" @click="resetValidation">
						Reset Validation
					</v-btn> -->
				</v-form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	data: () => ({
		valid: true,
		show1: false,
		name: '',
		email: '',
		password: '',
		nameRules: [v => !!v || 'Name is required'],
		emailRules: [
			// v => !!v || 'E-mail is required',
			// v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
		],
		rules: {
			required: value => !!value || 'Required.',
			min: v => v.length >= 1 || 'Min 1 characters',
			emailMatch: () => "The email and password you entered don't match",
		},
		lazy: false,
	}),

	methods: {
		...mapActions({
			getMe: 'account/getMe',
			loginUser: 'account/login',
		}),

		login() {
			this.loginUser({ username: this.name, password: this.password });
		},

		getAccount() {
			this.getMe();
		},

		validate() {
			this.$refs.form.validate();
		},
		reset() {
			this.$refs.form.reset();
		},
		resetValidation() {
			this.$refs.form.resetValidation();
		},
	},
};
</script>

<style lang="sass" scoped></style>
