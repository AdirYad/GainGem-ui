<template>
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
                   @keypress.enter.space="saveCode"
                   @paste="saveCode"
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
        <transition name="fade">
          <div v-if="payload.codes.length" class="tw-duration-300 tw-flex tw-justify-center tw-items-center tw-flex-wrap tw-mb-2">
            <transition-group name="chips">
              <button v-for="(code, index) in payload.codes" :key="code.id"
                      class="tw-duration-300 tw-break-all tw-border-2 tw-rounded-xl tw-text-xs hover:tw-text-white tw-font-bold tw-text-center tw-inline-block tw-px-4 tw-py-1 tw-m-1"
                      :class="! modal.visible && errors[code.id] ? 'tw-border-red-500 tw-text-red-500 hover:tw-bg-red-500' : 'tw-border-primary tw-text-primary hover:tw-bg-primary'"
                      @click="deleteCode(index); resetErrors(code.id)"
                      type="button"
              >
                {{ code.code }}
              </button>
            </transition-group>
          </div>
        </transition>
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
        <th class="tw-p-3 tw-text-left sm:tw-w-40">Value</th>
        <th class="tw-p-3 tw-text-left sm:tw-w-40">Points</th>
        <th class="tw-p-3 tw-text-left sm:tw-w-40" style="white-space: nowrap">Taken By</th>
        <th class="tw-p-3 tw-text-left sm:tw-w-40">Actions</th>
      </tr>
      </thead>
      <tbody class="tw-flex-1 sm:tw-flex-none">
      <tr v-for="(giftCard, index) in rewardStockObj.gift_cards" :key="index"  class="tw-table-row">
        <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="giftCard.code" />
        <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="giftCard.country ? giftCard.country : 'International'" />
        <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="'$' + (giftCard.value).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')" />
        <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="(giftCard.value * pointsValue).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')" />
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
  <Pagination v-if="rewardStockObj.pagination" v-model="page" :records="rewardStockObj.pagination.total" :per-page="rewardStockObj.pagination.per_page" @paginate="getGiftCards" :options="{ chunk: 5 }" />
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

<script>
import Pagination from 'v-pagination-3';
import VModal from '@/components/VModal';
import useVuelidate from '@vuelidate/core';
import { maxLength, minLength, required, minValue, maxValue } from '@vuelidate/validators';
import { useStore } from 'vuex';
import { ref, reactive, toRef, watch } from 'vue';

export default {
  name: 'Admin.GiftCard',
  components: {
    Pagination,
    VModal,
  },
  props: {
      provider: {
          type: String,
          required: true,
      },
      pointsValue: {
          type: Number,
          required: true,
      },
  },
  setup(props) {
    const store = useStore();

    const countries = require('country-json/src/country-by-name.json');
    const rewardStockObj = ref({});
    const page = ref(1);
    const payload = reactive({
      provider: props.provider,
      codes: [],
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

    const isSavingCode = ref(false);
    const errors = ref({});

    const rules = {
      codes: {
        required,
        minLength: minLength(1),
        $each: {
          code: {
            required,
            minLength: minLength(2),
            maxLength: maxLength(255),
          },
        },
      },
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
      codes: toRef(payload, 'codes'),
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

    watch(() => props.provider, () => changeProvider());

    getGiftCards();

    return {
      countries,
      rewardStockObj,
      page,
      payload,
      modal,
      errors,
      v$,
      v2$,
      getGiftCards,
      changeProvider,
      saveCode,
      openEditModal,
      destroy,
      create,
      edit,
      deleteCode,
      resetErrors,
    };

    function getGiftCards() {
      store.dispatch('getGiftCards', { page: page.value, provider: payload.provider }).then((response) => {
        rewardStockObj.value = response.data;
      });
    }

    function changeProvider() {
      v$.value.$reset();

      payload.provider = props.provider;
      payload.codes = [];
      payload.code = '';
      payload.country = null;
      payload.value = null;

      getGiftCards();
    }

    function saveCode() {
      isSavingCode.value = true;

      setTimeout(() => {
        const codes = payload.code.split(' ').filter((str) => /\S/.test(str));
        const codesArr = [];
        const errors = {
          'list': false,
          'between': false,
        };

        for (let i = 0; i < codes.length; i++) {
          if (payload.codes.findIndex((code) => code.code === codes[i]) !== -1) {
            if (! errors.list) {
              store.dispatch('addNotification', {
                type: 'error',
                message: codes.length > 1 ? 'One of the codes is already in the list' : 'The code is already in the list',
              });
            }

            codesArr.push(codes[i]);
            errors.list = true;
            continue;
          }

          if (codes[i].length < 2 || codes[i].length > 255) {
            if (! errors.between) {
              store.dispatch('addNotification', {
                type: 'error',
                message: 'Code must be between 2 to 255 characters!',
              });
            }

            codesArr.push(codes[i]);
            errors.between = true;
            continue;
          }

          payload.codes.push({
            id: (Math.random().toString(36) + codes[i]).substr(2),
            code: codes[i],
          });
        }

        payload.code = codesArr.join(' ');
        isSavingCode.value = false;
      }, 0);
    }

    function deleteCode(index) {
      payload.codes.splice(index, 1);
    }

    function openEditModal(giftCard) {
      modal.gift_card = giftCard;
      modal.visible = true;
      modal.country = giftCard.country;
      modal.code = giftCard.code;
      modal.value = giftCard.value;
    }

    function destroy(giftCard) {
      store.dispatch('deleteGiftCard', giftCard.id).then(() => {
        rewardStockObj.value.gift_cards.splice(rewardStockObj.value.gift_cards.indexOf(giftCard), 1);
        rewardStockObj.value.pagination.total--;

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Reward removed successfully!',
        });

        if (page.value > 1 && rewardStockObj.value.pagination.total <= 10) {
          page.value = 1;

          getGiftCards();
        }
      });
    }

    function create() {
      if (isSavingCode.value) {
        isSavingCode.value = false;
        return;
      }

      v$.value.$touch();

      if (! v$.value.code.$invalid) {
        saveCode();
        v$.value.codes.$reset();
        v$.value.code.$reset();
      } else if (! v$.value.codes.$invalid && v$.value.code.$invalid) {
        v$.value.code.$reset();
      }

      if (v$.value.$invalid) {
        return;
      }

      errors.value = {};

      setTimeout(() => {
        store.dispatch('storeGiftCard', payload).then((response) => {
          v$.value.$reset();

          payload.codes = [];
          payload.code = '';
          payload.country = null;
          payload.value = null;
          rewardStockObj.value.gift_cards.unshift(...response.data);
          rewardStockObj.value.pagination.total += response.data.length;

          store.dispatch('addNotification', {
            type: 'success',
            message: 'Reward' + (response.data.length > 1 ? 's ' : ' ') + 'created successfully!',
          });
        }).catch((err) => {
          if (err.response.status === 422 && err.response.data.errors) {
            errors.value = err.response.data.errors;

            let error = false;

            for (let i = 0; i < payload.codes.length; i++) {
              if (! errors.value['codes.' + i + '.code']) {
                continue;
              }

              errors.value[payload.codes[i].id] = errors.value['codes.' + i + '.code'];
              delete errors.value['codes.' + i + '.code'];

              if (error) {
                continue;
              }

              store.dispatch('addNotification', {
                type: 'error',
                message: payload.codes.length > 1 ? 'Some codes have already been taken' : 'The code has already been taken',
              });

              error = true;
            }
          }
        });
      }, 0);
    }

    function edit() {
      v2$.value.$touch();
      v2$.value.codes.$reset();

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

      store.dispatch('updateGiftCard', giftCardPayload).then((response) => {
        modal.visible = false;
        console.log(response.data)
        modal.gift_card.code = response.data.code;
        modal.gift_card.country = response.data.country;
        modal.gift_card.value = response.data.value;

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
      if ((modal.visible ? v2$ : v$).value[key]) {
        (modal.visible ? v2$ : v$).value[key].$reset();
      }
      delete errors.value[key];
    }
  },
}
</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.chips-enter-from {
  opacity: 0;
  transform: translateX(250px);
}

.chips-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}
</style>