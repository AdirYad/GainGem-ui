<template>
  <div class="tw-flex tw-flex-wrap">
    <div class="tw-w-full tw-mb-4">
      <form @submit.prevent="saveCredentials">
        <div class="tw-flex tw-flex-wrap">
          <div class="tw-w-full sm:tw-w-1/2 tw-mb-4 sm:tw-pr-2">
            <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="wallet">
              Wallet
            </label>
            <input id="wallet" type="text" placeholder="Wallet"
                   class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                   v-model="payload.wallet"
                   :class="{ 'input-invalid tw-mb-3' : v$.wallet.$invalid || errors.wallet }"
                   @keydown="resetErrors('wallet')"
            >
            <p v-if="v$.wallet.$error" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ v$.wallet.$errors[0].$message }}
            </p>
            <p v-else-if="errors.wallet" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ errors.wallet[0] }}
            </p>
          </div>
          <div class="tw-w-full sm:tw-w-1/2 tw-mb-4 sm:tw-pl-2">
            <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="stock_amount">
              Stock Amount
            </label>
            <input id="stock_amount" type="number" min="1" placeholder="Stock Amount"
                   onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                   class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                   v-model="payload.stock_amount"
                   :class="{ 'input-invalid tw-mb-3' : v$.stock_amount.$invalid || errors.stock_amount }"
                   @keydown="resetErrors('stock_amount')"
            >
            <p v-if="v$.stock_amount.$error" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ v$.stock_amount.$errors[0].$message }}
            </p>
            <p v-else-if="errors.stock_amount" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ errors.stock_amount[0] }}
            </p>
          </div>
        </div>
        <div class="tw-w-full tw-text-center">
          <button class="tw-h-full tw-w-full sm:tw-w-40 tw-text-white tw-text-xl tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-py-1" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { maxLength, minLength, required, minValue } from '@vuelidate/validators';
import { useStore } from 'vuex';
import { ref, reactive, toRef } from 'vue';

export default {
  name: 'Admin.Bitcoin',
  setup() {
    const store = useStore();

    const payload = reactive({
      wallet: '',
      stock_amount: null,
    });

    const errors = ref({});

    const rules = {
      wallet: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(255),
      },
      stock_amount: {
        required,
        minValue: minValue(1),
      },
    };

    const v$ = useVuelidate(rules, {
      wallet: toRef(payload, 'wallet'),
      stock_amount: toRef(payload, 'stock_amount'),
    });

    getBitcoinCredentials();

    return {
      payload,
      errors,
      v$,
      saveCredentials,
      resetErrors,
    };

    function getBitcoinCredentials() {
      store.dispatch('getBitcoinCredentials').then((response) => {
        if (! response.data) {
          return;
        }

        payload.wallet = response.data.wallet;
        payload.stock_amount = response.data.stock_amount;
      });
    }

    function saveCredentials() {
      v$.value.$touch();

      if (v$.value.$invalid) {
        return;
      }

      errors.value = {};

      store.dispatch('updateBitcoinCredentials', payload).then(() => {
        store.dispatch('addNotification', {
          type: 'success',
          message: 'Credentials saved successfully!',
        });
      }).catch((err) => {
        if (err.response.status === 422) {
          if (err.response.data.errors) {
            errors.value = err.response.data.errors;
          } else {
            store.dispatch('addNotification', {
              type: 'error',
              message: err.response.data.message,
            });
          }
        }
      });
    }

    function resetErrors(key) {
      v$.value[key].$reset();
      delete errors.value[key];
    }
  },
}
</script>