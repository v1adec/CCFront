<template>
	<v-container>
		<v-row>
			<v-col col="6">img</v-col>
			<v-col col="6">
				<v-form
					v-if="modeRegistration"
					ref="form"
					v-model="valid"
					:lazy-validation="lazy"
				>
					<v-text-field
						v-model="registrationForm.name"
						:counter="10"
						:rules="nameRules"
						label="Name"
						required
					></v-text-field>

					<v-text-field
						v-model="registrationForm.email"
						:rules="emailRules"
						label="E-mail"
						required
					></v-text-field>

					<v-text-field
						v-model="registrationForm.password"
						:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
						:rules="[rules.required, rules.min]"
						:type="show1 ? 'text' : 'password'"
						name="input-10-1"
						label="Password"
						hint="At least 8 characters"
						counter
						@click:append="show1 = !show1"
					></v-text-field>

					<v-text-field
						v-model="registrationForm.secondPassword"
						:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
						:rules="[rules.required, rules.min]"
						:type="show1 ? 'text' : 'password'"
						name="input-10-1"
						label="Password"
						hint="At least 8 characters"
						counter
						@click:append="show1 = !show1"
					></v-text-field>

					<v-btn
						:disabled="!valid"
						color="success"
						class="mr-4"
						@click="registration"
					>
						Sign up
					</v-btn>
				</v-form>
				<v-form v-else ref="form" v-model="valid" :lazy-validation="lazy">
					<v-text-field
						v-model="signUpForm.name"
						:counter="10"
						:rules="nameRules"
						label="Name"
						required
					></v-text-field>

					<v-text-field
						v-model="signUpForm.password"
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
				</v-form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
	data: () => ({
		valid: true,
		show1: false,
		signUpForm: {
			name: '',
			password: '',
		},
		registrationForm: {
			name: '',
			password: '',
			secondPassword: '',
			email: '',
		},
		name: '',
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

	computed: {
		...mapState(['modeRegistration']),
	},

	methods: {
		...mapActions({
			getMe: 'account/getMe',
			loginUser: 'account/login',
			registrationUser: 'account/registration',
		}),

		login() {
			this.loginUser({
				username: this.signUpForm.name,
				password: this.signUpForm.password,
			});
		},

		registration() {
			this.registrationUser({
				userName: this.registrationForm.name,
				email: this.registrationForm.email,
				password: this.registrationForm.password,
			});
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
