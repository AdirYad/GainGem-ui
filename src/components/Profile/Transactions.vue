<template>
  <table class="table tw-w-full tw-flex sm:tw-bg-white tw-rounded-lg sm:tw-shadow-lg tw-overflow-hidden">
    <thead class="tw-text-white">
      <tr v-for="index in transactions.length || 1" :key="index" class="tw-bg-primary tw-flex tw-flex-col tw-flex-no tw-wrap sm:tw-table-row tw-rounded-l-lg sm:tw-rounded-none tw-mb-2 sm:tw-mb-0">
        <th class="tw-p-3 tw-text-left sm:tw-w-10">#</th>
        <th class="tw-p-3 tw-text-left sm:tw-w-40">Date</th>
        <th class="tw-p-3 tw-text-left sm:tw-w-40">Reward</th>
        <th class="tw-p-3 tw-text-left sm:tw-w-40">Amount</th>
        <th class="tw-p-3 tw-text-left sm:tw-w-10">Actions</th>
      </tr>
    </thead>
    <tbody class="tw-flex-1 sm:tw-flex-none">
      <tr v-for="(transaction, index) in transactions" :key="index"  class="tw-flex tw-flex-col tw-flex-no tw-wrap sm:tw-table-row tw-mb-2 sm:tw-mb-0">
        <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="transaction.id" />
        <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3 tw-truncate" v-text="transaction.formatted_created_at" />
        <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3 tw-truncate" v-text="transaction.formatted_provider" />
        <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="transaction.points" /><td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-px-3 tw-py-1">
        <div class="tw-h-full tw-flex tw-items-center">
          <template v-if="transaction.type === 'gift_card'">
            <button v-if="! transaction.has_emailed_in_the_last_hour" @click="resend(transaction)" class="tw-w-8 tw-h-8 tw-inline tw-duration-300 tw-bg-gray-300 tw-text-green-500 tw-rounded-full hover:tw-text-white hover:tw-bg-green-500">
              <fa-icon icon="envelope" />
            </button>
            <div v-else class="tw-w-8 tw-h-8 tw-flex tw-justify-center tw-items-center tw-duration-300 tw-bg-gray-300 tw-text-red-500 tw-rounded-full">
              <fa-icon icon="envelope-open" />
            </div>
          </template>

          <button v-else @click="openModal(transaction)" class="tw-w-8 tw-h-8 tw-inline tw-duration-300 tw-bg-gray-300 tw-text-green-500 tw-rounded-full hover:tw-text-white hover:tw-bg-green-500">
            <fa-icon :icon="['far', 'eye']" />
          </button>
        </div>
      </td>
      </tr>
    </tbody>
  </table>

  <VModal v-model:visible="modal.visible">
    <p style="margin: 0">
      {{ modal.transaction.type === 'robux' ? modal.transaction.robux_amount + ' robux'
        : modal.transaction.bitcoin_amount + ' bitcoin' }}
      was sent to
      <strong class="tw-text-primary">{{ modal.transaction.destination }}</strong>.
    </p>
  </VModal>
</template>

<script>
import VModal from '@/components/VModal';
import { useStore } from 'vuex';
import { ref, reactive } from 'vue';

export default {
  name: 'Profile.Transactions',
  components: {
    VModal,
  },
  setup() {
    const store = useStore();

    const transactions = ref([]);
    const modal = reactive({
      visible: false,
      transaction: null,
    });

    store.dispatch('getTransactions').then((response) => {
      transactions.value = response.data.transactions;
    });

    return {
      transactions,
      modal,
      resend,
      openModal,
    }

    function resend(transaction) {
      if (transaction.isSending) {
        return;
      }

      transaction.isSending = true;

      store.dispatch('resendGiftCardTransactionMail', transaction.id).then(() => {
        transaction.has_emailed_in_the_last_hour = true;
        transaction.isSending = false;

        store.dispatch('addNotification', {
          type: 'success',
          message: `Gift card details sent to ${store.state.user.email}`,
        });
      }).catch((err) => {
        if (err.response.status === 422) {
          store.dispatch('addNotification', {
            type: 'error',
            message: err.response.data.message,
          });
        } else if (err.response.status === 403) {
          store.dispatch('addNotification', {
            type: 'error',
            message: "You don't have permissions!",
          });
        }

        transaction.isSending = false;
      });
    }

    function openModal(transaction) {
      modal.visible = true;
      modal.transaction = transaction;
    }
  },
}
</script>