<template>
  <div class="authentication-form tw-w-screen tw-h-screen tw-bg-secondary tw-flex tw-items-center tw-justify-center tw-flex-col tw-overflow-auto tw-p-10">
    <img class="tw-mb-10" style="height: 80px; margin-top: -40px; margin-bottom: 40px;" alt="logo" src="@/assets/images/Icon.png">
    <div class="tw-w-full tw-max-w-2xl tw-text-lg tw-text-center tw-mx-auto tw-mb-4">
      If you have forgotten your password and would like to reset it, you can fill out this form and receive instructions by email on how to reset your password.
    </div>
    <form @submit.prevent="login" class="tw-bg-white tw-shadow-lg tw-rounded-lg tw-px-10 tw-py-12">
      <div class="tw-mb-4">
        <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="email">
          Email
        </label>
        <input id="email" type="text" placeholder="Email"
               class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
               v-model="auth.email"
               :class="{ 'input-invalid tw-mb-3' : v$.email.$invalid || errors.email }"
               @keydown="resetErrors('email')"
        >
        <p v-if="v$.email.$error" class="tw-text-red-500 tw-text-xs tw-italic">
          {{ v$.email.$errors[0].$message }}
        </p>
        <p v-else-if="errors.email" class="tw-text-red-500 tw-text-xs tw-italic">
          {{ errors.email[0] }}
        </p>
      </div>
      <button class="tw-w-full tw-text-white tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-px-4 tw-py-1 focus:tw-outline-none" type="submit">
        Send Request
      </button>
    </form>
  </div>
</template>

<script>
import { required, email } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import router from "@/router";
import { useStore } from 'vuex';
import { ref, reactive, toRef } from "vue";

export default {
  name: 'ForgotPassword',

  setup() {
    const store = useStore();

    const auth = reactive({
      email: '',
    });

    const errors = ref({});

    const rules = {
      email: {
        required,
        email,
      },
    };

    const v$ = useVuelidate(rules, { email: toRef(auth, 'email') });

    const login = () => {
      v$.value.$touch();

      if (v$.value.$invalid) {
        return;
      }

      store.dispatch('forgotPassword', auth).then(() => {
        router.push({ name: 'Home' });

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Password reset request sent to email.',
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

    const resetErrors = (key) => {
      v$.value[key].$reset();
      delete errors.value[key];
    }

    return {
      v$,
      auth,
      errors,
      login,
      resetErrors,
    }
  },
}
</script>