<template>
	<v-container>
		<v-row>
			<v-col
				cols="8"
				style="max-height: calc(100vh - 100px);
    overflow: auto;"
			>
				<ul>
					<li class="mx-auto" v-for="goal in goals" :key="goal.Id">
						<span
							>Goal: {{ goal.Money }}
							{{ getCurrencyName(goal.CurrencyId) }}</span
						>
						<span
							><v-btn @click="deleteGoal(goal.Id)" icon color="error">
								<v-icon>highlight_off</v-icon>
							</v-btn></span
						><br />
						<span>From: {{ goal.DateStart.slice(0, 10) }}</span
						><br />
						<span>To: {{ goal.DateFinish.slice(0, 10) }}</span
						><br />
						<span>{{ goal.Status }}</span>
					</li>
				</ul>
			</v-col>
			<v-col cols="4">
				<v-form ref="form">
					<v-text-field
						label="Amount"
						v-model.number="form.money"
					></v-text-field>
					<v-select
						v-model="form.currencyId"
						:items="currencies"
						item-value="Id"
						item-text="Name"
						label="Currency"
					>
					</v-select>
					<v-menu
						v-model="menu2"
						:close-on-content-click="false"
						transition="scale-transition"
						offset-y
						max-width="290px"
						min-width="290px"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-text-field
								v-model="computedDateFormatted"
								label="Date"
								persistent-hint
								prepend-icon="event"
								readonly
								v-bind="attrs"
								v-on="on"
							></v-text-field>
						</template>
						<v-date-picker
							v-model="form.dateStart"
							no-title
							@input="menu2 = false"
						></v-date-picker>
					</v-menu>
					<v-menu
						v-model="menu3"
						:close-on-content-click="false"
						transition="scale-transition"
						offset-y
						max-width="290px"
						min-width="290px"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-text-field
								v-model="computedDateFormatted2"
								label="Date"
								persistent-hint
								prepend-icon="event"
								readonly
								v-bind="attrs"
								v-on="on"
							></v-text-field>
						</template>
						<v-date-picker
							v-model="form.dateFinish"
							no-title
							@input="menu3 = false"
						></v-date-picker>
					</v-menu>
					<v-btn style="width: 50%;" class="mx-auto d-block" @click="send">
						Add
					</v-btn>
				</v-form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
	data: () => ({
		form: {
			money: null,
			dateStart: new Date().toISOString().substr(0, 10),
			dateFinish: new Date().toISOString().substr(0, 10),
		},
		menu2: false,
		menu3: false,
	}),
	created() {
		this.fetchTransactions();
		this.fetchGoals();
	},
	computed: {
		...mapState('transaction', ['transactions']),
		...mapState('currency', ['currencies']),
		...mapState('item', ['items']),
		...mapState('goal', ['goals']),
		...mapGetters({
			getCurrencyName: 'currency/currencyName',
			getItemName: 'item/itemName',
		}),

		computedDateFormatted() {
			return this.formatDate(this.form.dateStart);
		},
		computedDateFormatted2() {
			return this.formatDate(this.form.dateFinish);
		},
	},

	methods: {
		...mapActions({
			fetchTransactions: 'transaction/fetchTransactions',
			fetchGoals: 'goal/fetchGoals',
			addGoal: 'goal/addGoal',
			deleteGoal: 'goal/deleteGoal',
		}),
		formatDate(date) {
			if (!date) return null;

			const [year, month, day] = date.split('-');
			return `${month}/${day}/${year}`;
		},
		parseDate(date) {
			if (!date) return null;

			const [month, day, year] = date.split('/');
			return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
		},
		send() {
			this.addGoal({
				money: this.form.money,
				dateFinish: this.form.dateFinish,
				dateStart: this.form.dateStart,
			});
			this.form.money = null;
			this.form.dateStart = new Date().toISOString().substr(0, 10);
			this.form.dateFinish = new Date().toISOString().substr(0, 10);
		},
	},
};
</script>

<style lang="sass" scoped></style>
