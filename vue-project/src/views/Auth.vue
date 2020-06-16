<template>
	<v-container>
		<v-row>
			<v-col cols="9">
				<v-img
					style="width: 300px; margin: auto"
					src="../assets/s9.png"
					alt="s9"
				/>
			</v-col>
			<v-col cols="3">
				<v-form
					v-if="modeRegistration"
					ref="form"
					class="d-flex flex-column"
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
						style="width: 50%; align-self: center;"
						:disabled="!valid"
						color="success"
						class="mr-4"
						@click="registration"
					>
						Sign up
					</v-btn>
				</v-form>
				<v-form
					v-else
					ref="form"
					class="d-flex flex-column"
					v-model="valid"
					:lazy-validation="lazy"
				>
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

					<v-btn
						style="width: 50%; align-self: center;"
						:disabled="!valid"
						color="success"
						class="mr-4"
						@click="login"
					>
						Sign in
					</v-btn>
					<v-img
						style="width: 150px; margin-top: 150px; margin-left: -90px"
						src="../assets/qr-code.png"
						alt="qr"
					/>
					<span style="margin-left: -82px; margin-top: 20px"
						>Mobile application</span
					>
					<v-btn
						style="width: 50%; align-self: center; margin-left: -290px"
						color="primary"
						class="mr-4"
						href="https://install.appcenter.ms/users/trugaaa/apps/ConsideredCosts"
						target="_blank"
					>
						Download
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
			v => !!v || 'E-mail is required',
			v => /.+@.+\..+/.test(v) || 'Not valid',
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
