<template>
  <div class="tw-flex tw-flex-wrap">
    <div class="tw-w-full tw-mb-4">
      <form @submit.prevent="saveCredentials">
        <div class="tw-flex tw-flex-wrap">
          <div class="tw-w-full sm:tw-w-1/2 tw-mb-4 sm:tw-pr-2">
            <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="cookie">
              Cookie
            </label>
            <input id="cookie" type="text" placeholder="Cookie"
                   class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                   v-model="payload.cookie"
                   :class="{ 'input-invalid tw-mb-3' : v$.cookie.$invalid || errors.cookie }"
                   @keydown="resetErrors('cookie')"
            >
            <p v-if="v$.cookie.$error" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ v$.cookie.$errors[0].$message }}
            </p>
            <p v-else-if="errors.cookie" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ errors.cookie[0] }}
            </p>
          </div>
          <div class="tw-w-full sm:tw-w-1/2 tw-mb-4 sm:tw-pl-2">
            <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="group_id">
              Group ID
            </label>
            <input id="group_id" type="number" min="1" placeholder="Group ID"
                   onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                   class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                   v-model="payload.group_id"
                   :class="{ 'input-invalid tw-mb-3' : v$.group_id.$invalid || errors.group_id }"
                   @keydown="resetErrors('group_id')"
            >
            <p v-if="v$.group_id.$error" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ v$.group_id.$errors[0].$message }}
            </p>
            <p v-else-if="errors.group_id" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ errors.group_id[0] }}
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
import { minLength, required, minValue } from '@vuelidate/validators';
import { useStore } from 'vuex';
import { ref, reactive, toRef } from 'vue';

export default {
  name: 'Admin.Robux',
  setup() {
    const store = useStore();

    const payload = reactive({
      cookie: '',
      group_id: null,
    });

    const errors = ref({});

    const rules = {
      cookie: {
        required,
        minLength: minLength(2),
      },
      group_id: {
        required,
        minValue: minValue(1),
      },
    };

    const v$ = useVuelidate(rules, {
      cookie: toRef(payload, 'cookie'),
      group_id: toRef(payload, 'group_id'),
    });

    getRobuxCredentials();

    return {
      payload,
      errors,
      v$,
      saveCredentials,
      resetErrors,
    };

    function getRobuxCredentials() {
      store.dispatch('getRobuxCredentials').then((response) => {
        if (! response.data) {
          return;
        }

        payload.cookie = response.data.cookie;
        payload.group_id = response.data.group_id;
      });
    }

    function saveCredentials() {
      v$.value.$touch();

      if (v$.value.$invalid) {
        return;
      }

      errors.value = {};

      store.dispatch('updateRobuxCredentials', payload).then(() => {
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