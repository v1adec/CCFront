<template>
	<v-container>
		<v-row>
			<v-col col="6">{{ transactions.list }}</v-col>
			<v-col col="6">
				<v-form ref="form">
					<v-switch v-model="outcomeType" class="mx-2">
						<template #prepend>
							Income
						</template>
						<template #append>
							Outcome
						</template>
					</v-switch>
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
								label="Date (read only text field)"
								hint="MM/DD/YYYY format"
								persistent-hint
								prepend-icon="event"
								readonly
								v-bind="attrs"
								v-on="on"
							></v-text-field>
						</template>
						<v-date-picker
							v-model="form.date"
							no-title
							@input="menu2 = false"
						></v-date-picker>
					</v-menu>
					<v-select
						v-if="!outcomeType"
						v-model="form.workType"
						label="Work type"
						:items="workTypes"
					></v-select>
					<v-select
						v-else
						v-model="form.itemId"
						:items="items"
						item-value="Id"
						item-text="Name"
						label="Items"
					></v-select>
					<v-select v-model="form.type" :items="types"> </v-select>
					<v-textarea
						name="input-7-1"
						v-model="form.description"
						label="Desciption"
						hint="Hint text"
					></v-textarea>
					<v-btn @click="send">
						Send
					</v-btn>
				</v-form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
	data: () => ({
		form: {
			currencyId: '',
			money: null,
			type: 'Private',
			workType: 'Salary',
			itemId: null,
			date: new Date().toISOString().substr(0, 10),
			description: '',
		},
		outcomeType: false,
		types: ['Family', 'Private'],
		workTypes: ['Salary', 'Business', 'TempWork'],
		// dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
		menu1: false,
		menu2: false,
	}),
	created() {
		setTimeout(() => this.fetchTransactions(), 500);
		setTimeout(() => this.fetchItems(), 1000);
		// this.fetchTransactions();
		// this.fetchItems();
	},
	computed: {
		...mapState('transaction', ['transactions']),
		...mapState('currency', ['currencies']),
		...mapState('item', ['items']),
		...mapGetters({
			getCurrencyName: 'currency/currencyName',
		}),

		computedDateFormatted() {
			return this.formatDate(this.form.date);
		},
	},
	// watch: {
	// 	'form.date'() {
	// 		this.dateFormatted = this.formatDate(this.form.date);
	// 	},
	// },
	methods: {
		...mapActions({
			fetchTransactions: 'transaction/fetchTransactions',
			fetchItems: 'item/fetchItems',
			addTransaction: 'transaction/addTransaction',
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
			this.addTransaction({
				money: this.outcomeType ? this.form.money * -1 : this.form.money,
				date: this.form.date,
				type: this.form.type,
				description: this.form.description,
				[this.outcomeType ? 'itemId' : 'workType']: this.outcomeType
					? this.form.itemId
					: this.form.workType,
				currencyId: this.form.currencyId,
			});
		},
	},
};
</script>

<style lang="sass" scoped></style>
