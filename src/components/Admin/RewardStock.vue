<template>
  <div class="tw-flex tw-justify-center tw-items-center tw-flex-wrap" :class="{ 'tw-mb-4' : payload.provider }">
    <button v-for="(reward, index) in $store.state.rewards" :key="index"
            class="tw-duration-300 tw-border-2 tw-border-primary tw-rounded-xl tw-text-xs hover:tw-bg-primary hover:tw-text-white tw-font-bold tw-text-center tw-inline-block tw-px-4 tw-py-1 tw-m-2"
            :class="reward.provider === payload.provider ? 'tw-bg-primary tw-text-white' : 'tw-text-primary'"
            @click="changeProvider(reward)"
    >
      {{ reward.name }}
    </button>
  </div>
  <template v-if="payload.provider">
    <div class="tw-flex tw-flex-wrap">
      <div class="tw-w-full tw-mb-4">
        <form @submit.prevent="create">
          <div class="tw-flex tw-flex-wrap">
            <div class="tw-w-full sm:tw-w-1/3 tw-mb-4 sm:tw-pr-2">
              <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="code">
                Code
              </label>
              <input id="code" type="text" placeholder="Code"
                     class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                     v-model="payload.code"
                     :class="{ 'input-invalid tw-mb-3' : v$.code.$invalid || ! modal.visible && errors.code }"
                     @keydown="resetErrors('code')"
              >
              <p v-if="v$.code.$error" class="tw-text-red-500 tw-text-xs tw-italic">
                {{ v$.code.$errors[0].$message }}
              </p>
              <p v-else-if="! modal.visible && errors.code" class="tw-text-red-500 tw-text-xs tw-italic">
                {{ errors.code[0] }}
              </p>
            </div>
            <div class="tw-w-full sm:tw-w-1/3 tw-mb-4 sm:tw-pr-2">
              <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="country">
                Country
              </label>
              <select v-model="payload.country" id="country"
                      class="select tw-duration-300 tw-shadow tw-border tw-w-full tw-rounded-md tw-py-1 tw-px-4 tw-text-gray-500 focus:tw-outline-none"
                      style="height: 38px"
                      :class="{ 'input-invalid tw-mb-3' : ! modal.visible && errors.country }"
                      @keydown="resetErrors('country')"
              >
                <option :value="null" selected>
                  International
                </option>
                <option v-for="(country, index) in countries" :key="index" :value="country.country">
                  {{ country.country }}
                </option>
              </select>
              <p v-if="! modal.visible && errors.country" class="tw-text-red-500 tw-text-xs tw-italic">
                {{ errors.country[0] }}
              </p>
            </div>
            <div class="tw-w-full sm:tw-w-1/3 tw-mb-4 sm:tw-pl-2">
              <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="value">
                Value
              </label>
              <input id="value" type="number" min="1" placeholder="Value"
                     onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                     class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                     v-model="payload.value"
                     :class="{ 'input-invalid tw-mb-3' : v$.value.$invalid || ! modal.visible && errors.value }"
                     @keydown="resetErrors('value')"
              >
              <p v-if="v$.value.$error" class="tw-text-red-500 tw-text-xs tw-italic">
                {{ v$.value.$errors[0].$message }}
              </p>
              <p v-else-if="! modal.visible && errors.value" class="tw-text-red-500 tw-text-xs tw-italic">
                {{ errors.value[0] }}
              </p>
            </div>
          </div>
          <div class="tw-w-full tw-text-center">
            <button class="tw-h-full tw-w-full sm:tw-w-40 tw-text-white tw-text-xl tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-py-1" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="full-size-table tw-rounded-lg tw-overflow-scroll tw-mb-4">
      <table class="unresponsive-table tw-w-full tw-flex sm:tw-bg-white tw-shadow-lg tw-overflow-hidden">
        <thead class="tw-text-white">
        <tr class="tw-bg-primary tw-table-row tw-rounded-l-lg sm:tw-rounded-none">
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Code</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Country</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40 ">Value</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40 ">Taken By</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Actions</th>
        </tr>
        </thead>
        <tbody class="tw-flex-1 sm:tw-flex-none">
        <tr v-for="(giftCard, index) in rewardStockObj.gift_cards" :key="index"  class="tw-table-row">
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="giftCard.code" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="giftCard.country ? giftCard.country : 'International'" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="'$' + giftCard.value" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="giftCard.transaction ? giftCard.transaction.user.username : ''" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-px-3 tw-py-1">
            <div class="tw-flex">
              <button @click="openEditModal(giftCard)" class="tw-w-8 tw-h-8 tw-inline tw-duration-300 tw-bg-gray-300 tw-text-blue-500 tw-rounded-full hover:tw-bg-blue-500 hover:tw-text-white tw-mr-2">
                <fa-icon icon="cog" />
              </button>
              <button @click="destroy(giftCard)" class="tw-w-8 tw-h-8 tw-inline tw-duration-300 tw-bg-gray-300 tw-text-red-500 tw-rounded-full hover:tw-text-white hover:tw-bg-red-500">
                <fa-icon :icon="['far', 'trash-alt']" />
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <Pagination v-if="rewardStockObj.pagination" v-model="page" :records="rewardStockObj.pagination.total" :per-page="rewardStockObj.pagination.per_page" @paginate="getRewards" :options="{ chunk: 5 }" />
    <VModal v-model:visible="modal.visible">
      <form @submit.prevent="edit" class="tw-px-2">
        <div class="tw-flex tw-flex-wrap">
          <div class="tw-w-full sm:tw-w-1/2 xl:tw-w-64 tw-mb-4 sm:tw-pr-2">
            <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="edit_code">
              Code
            </label>
            <input id="edit_code" type="text" placeholder="Code"
                   class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                   v-model="modal.code"
                   :class="{ 'input-invalid tw-mb-3' : v2$.code.$invalid || errors.code }"
                   @keydown="resetErrors('code')"
            >
            <p v-if="v2$.code.$error" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ v2$.code.$errors[0].$message }}
            </p>
            <p v-else-if="errors.code" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ errors.code[0] }}
            </p>
          </div>
          <div class="tw-w-full sm:tw-w-1/2 xl:tw-w-64 tw-mb-4 sm:tw-pl-2">
            <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="edit_country">
              Country
            </label>
            <select v-model="modal.country" id="edit_country"
                    class="select tw-duration-300 tw-shadow tw-border tw-w-full tw-rounded-md tw-py-1 tw-px-4 tw-text-gray-500 focus:tw-outline-none"
                    style="height: 38px"
                    :class="{ 'input-invalid tw-mb-3' : errors.country }"
                    @keydown="resetErrors('country')"
            >
              <option :value="null" selected>
                International
              </option>
              <option v-for="(country, index) in countries" :key="index" :value="country.country">
                {{ country.country }}
              </option>
            </select>
            <p v-if="errors.country" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ errors.country[0] }}
            </p>
          </div>
        </div>
        <div class="tw-flex tw-flex-wrap">
          <div class="tw-w-full sm:tw-w-1/2 xl:tw-w-64 tw-mb-4">
            <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="edit_value">
              Value
            </label>
            <input id="edit_value" type="number" min="1" placeholder="Value"
                   onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                   class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                   v-model="modal.value"
                   :class="{ 'input-invalid tw-mb-3' : v2$.value.$invalid || errors.value }"
                   @keydown="resetErrors('value')"
            >
            <p v-if="v2$.value.$error" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ v2$.value.$errors[0].$message }}
            </p>
            <p v-else-if="errors.value" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ errors.value[0] }}
            </p>
          </div>
        </div>
        <button class="tw-w-full sm:tw-w-40 tw-text-white tw-text-xl tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-py-1" type="submit">
          Save
        </button>
      </form>
    </VModal>
  </template>
</template>

<script>
import Pagination from 'v-pagination-3';
import VModal from '@/components/VModal';
import useVuelidate from '@vuelidate/core';
import { maxLength, minLength, required, minValue, maxValue } from '@vuelidate/validators';
import { useStore } from 'vuex';
import { ref, reactive, toRef, watch } from 'vue';

export default {
  name: 'Admin.RewardStock',
  components: {
    Pagination,
    VModal,
  },
  setup() {
    const store = useStore();

    const countries = require('country-json/src/country-by-name.json');
    const rewardStockObj = ref({});
    const page = ref(1);
    const payload = reactive({
      provider: null,
      code: '',
      country: null,
      value: null,
    });
    const modal = reactive({
      gift_card: null,
      visible: false,
      country: null,
      code: '',
      value: null,
    });

    const errors = ref({});

    const rules = {
      code: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(255),
      },
      value: {
        required,
        minValue: minValue(1),
        maxValue: maxValue(999999),
      },
    };

    const v$ = useVuelidate(rules, {
      code: toRef(payload, 'code'),
      value: toRef(payload, 'value'),
    });

    const v2$ = useVuelidate(rules, {
      code: toRef(modal, 'code'),
      value: toRef(modal, 'value'),
    });

    watch(() => modal.visible, () => {
      errors.value = {};
      v$.value.$reset();
      v2$.value.$reset();
    });

    return {
      countries,
      rewardStockObj,
      page,
      payload,
      modal,
      errors,
      v$,
      v2$,
      getRewards,
      changeProvider,
      openEditModal,
      destroy,
      create,
      edit,
      resetErrors,
    };

    function getRewards() {
      store.dispatch('getRewards', { page: page.value, provider: payload.provider }).then((response) => {
        rewardStockObj.value = response.data;
      });
    }

    function changeProvider(reward) {
      if (payload.provider === reward.provider) {
        return;
      }

      v$.value.$reset();

      payload.provider = reward.provider;
      payload.code = '';
      payload.country = null;
      payload.value = null;
      getRewards();
    }

    function openEditModal(giftCard) {
      modal.gift_card = giftCard;
      modal.visible = true;
      modal.country = giftCard.country;
      modal.code = giftCard.code;
      modal.value = giftCard.value;
    }

    function destroy(giftCard) {
      store.dispatch('deleteReward', giftCard.id).then(() => {
        rewardStockObj.value.gift_cards.splice(rewardStockObj.value.gift_cards.indexOf(giftCard), 1);
        rewardStockObj.value.pagination.total--;

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Reward removed successfully!',
        });

        if (page.value > 1 && rewardStockObj.value.pagination.total <= 10) {
          page.value = 1;

          getRewards();
        }
      });
    }

    function create() {
      v$.value.$touch();

      if (v$.value.$invalid) {
        return;
      }

      errors.value = {};

      store.dispatch('storeReward', payload).then((response) => {
        v$.value.$reset();

        payload.country = null;
        payload.code = '';
        payload.value = null;
        rewardStockObj.value.gift_cards.unshift(response.data.gift_card);
        rewardStockObj.value.pagination.total++;

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Reward created successfully!',
        });
      }).catch((err) => {
        if (err.response.status === 422 && err.response.data.errors) {
          errors.value = err.response.data.errors;
        }
      });
    }

    function edit() {
      v2$.value.$touch();

      if (v2$.value.$invalid) {
        return;
      }

      errors.value = {};

      const giftCardPayload = {
        gift_card_id: modal.gift_card.id,
        code: modal.code,
        country: modal.country,
        provider: payload.provider,
        value: modal.value,
      };

      store.dispatch('updateReward', giftCardPayload).then((response) => {
        modal.visible = false;
        modal.gift_card.code = response.data.gift_card.code;
        modal.gift_card.country = response.data.gift_card.country;
        modal.gift_card.value = response.data.gift_card.value;

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Reward saved successfully!',
        });
      }).catch((err) => {
        if (err.response.status === 422 && err.response.data.errors) {
          errors.value = err.response.data.errors;
        }
      });
    }

    function resetErrors(key) {
      (modal.visible ? v2$ : v$).value[key].$reset();
      delete errors.value[key];
    }
  },
}
</script>