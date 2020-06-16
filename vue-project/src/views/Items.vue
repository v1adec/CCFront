<template>
	<v-container>
		<v-row>
			<v-col
				cols="8"
				style="max-height: calc(100vh - 100px);
    overflow: auto;"
			>
				<ul>
					<li class="mx-auto" v-for="item in items" :key="item.Id">
						<span>{{ item.Name }}</span> <br />
						<span> Money spent: {{ item.AmountOfMoney }}</span>
						<span> {{ getCurrencyName(item.CurrencyId) }}</span>
						<span> {{ item.Percent }} %</span>
						<span> {{ item.Date }}</span> <br />
						<span> {{ item.AmountOfOutgoes }}</span>
						<span
							><v-btn @click="deleteItem(item.Id)" icon color="error">
								<v-icon>highlight_off</v-icon>
							</v-btn></span
						>
					</li>
				</ul>
			</v-col>
			<v-col cols="4">
				<v-form ref="form">
					<v-text-field v-model="form.itemName" label="Item name" />
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
			itemName: '',
		},
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
			addItem: 'item/addItem',
			deleteItem: 'item/deleteItem',
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
			this.addItem({
				name: this.form.itemName,
			});
		},
	},
};
</script>

<style lang="sass" scoped></style>
