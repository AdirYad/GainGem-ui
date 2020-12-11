<template>
  <table class="table tw-w-full tw-flex sm:tw-bg-white tw-rounded-lg sm:tw-shadow-lg tw-overflow-hidden">
    <thead class="tw-text-white">
      <tr v-for="index in transactions.length || 1" :key="index" class="tw-bg-primary tw-flex tw-flex-col tw-flex-no tw-wrap sm:tw-table-row tw-rounded-l-lg sm:tw-rounded-none tw-mb-2 sm:tw-mb-0">
        <th class="tw-p-3 tw-text-left sm:tw-w-10">#</th>
        <th class="tw-p-3 tw-text-left sm:tw-w-40">Date</th>
        <th class="tw-p-3 tw-text-left sm:tw-w-40">Reward</th>
        <th class="tw-p-3 tw-text-left sm:tw-w-40">Amount</th>
      </tr>
    </thead>
    <tbody class="tw-flex-1 sm:tw-flex-none">
      <tr v-for="(transaction, index) in transactions" :key="index"  class="tw-flex tw-flex-col tw-flex-no tw-wrap sm:tw-table-row tw-mb-2 sm:tw-mb-0">
        <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="transaction.id" />
        <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3 tw-truncate" v-text="transaction.formatted_created_at" />
        <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3 tw-truncate" v-text="transaction.formatted_provider" />
        <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="transaction.points" />
      </tr>
    </tbody>
  </table>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {
  name: 'Profile.Transactions',
  setup() {
    const store = useStore();

    const transactions = ref([]);

    store.dispatch('getTransactions').then((response) => {
      transactions.value = response.data.transactions;
    });

    return {
      transactions,
    }
  },
}
</script>