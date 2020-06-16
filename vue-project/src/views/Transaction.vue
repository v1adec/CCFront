<template>
	<v-container>
		<v-row>
			<v-col
				cols="8"
				style="max-height: calc(100vh - 100px);
    overflow: auto;"
			>
				<ul>
					<li
						v-for="transaction in transactions"
						:key="transaction.Id"
						class="mx-auto"
					>
						<span v-if="transaction.WorkType">{{ transaction.WorkType }}</span>
						<span v-else>{{ getItemName(transaction.ItemId) }}</span
						><br />
						<span>Type: {{ transaction.Type }}</span
						><br />
						<span
							>{{
								transaction.WorkType ? transaction.Money : -transaction.Money
							}}
						</span>
						<span>{{ getCurrencyName(transaction.CurrencyId) }}</span
						><br />
						<span>{{ transaction.Description }}</span
						><br />
						<span>{{ transaction.Date.slice(0, 10) }}</span
						><br />
						<v-btn
							@click="deleteTransaction(transaction.Id)"
							icon
							color="error"
						>
							<v-icon>highlight_off</v-icon>
						</v-btn>
					</li>
				</ul>
			</v-col>
			<v-col cols="4">
				<v-form ref="form" class="d-flex flex-column">
					<v-switch
						v-model="outcomeType"
						class="mx-2 align-self-start"
						hide-details
					>
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
								label="Date"
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
					></v-textarea>
					<v-btn style="width: 50%; align-self: center;" @click="send">
						Add
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
		this.fetchTransactions();
		this.fetchItems();
	},
	computed: {
		...mapState('transaction', ['transactions']),
		...mapState('currency', ['currencies']),
		...mapState('item', ['items']),
		...mapGetters({
			getCurrencyName: 'currency/currencyName',
			getItemName: 'item/itemName',
		}),

		computedDateFormatted() {
			return this.formatDate(this.form.date);
		},
	},

	methods: {
		...mapActions({
			fetchTransactions: 'transaction/fetchTransactions',
			fetchItems: 'item/fetchItems',
			addTransaction: 'transaction/addTransaction',
			deleteTransaction: 'transaction/deleteTransaction',
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
				money: this.form.money,
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
