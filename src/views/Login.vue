<template>
  <div class="authentication-form tw-w-screen tw-h-screen tw-bg-secondary tw-flex tw-items-center tw-justify-center tw-flex-col tw-overflow-auto tw-p-10">
    <router-link :to="{ name: 'Home' }">
      <img alt="logo" src="@/assets/images/Logo.png">
    </router-link>
    <form @submit.prevent="login" class="tw-bg-white tw-shadow-lg tw-rounded-lg tw-px-10 tw-py-12">
      <div class="tw-mb-4">
        <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="username">
          Username
        </label>
        <input id="username" type="text" placeholder="Username"
               class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
               v-model="auth.username"
               :class="{ 'input-invalid tw-mb-3' : v$.username.$invalid || errors.username }"
               @keydown="resetErrors('username')"
        >
        <p v-if="v$.username.$error" class="tw-text-red-500 tw-text-xs tw-italic">
          {{ v$.username.$errors[0].$message }}
        </p>
        <p v-else-if="errors.username" class="tw-text-red-500 tw-text-xs tw-italic">
          {{ errors.username[0] }}
        </p>
      </div>
      <div class="tw-mb-6">
        <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="password">
          Password
        </label>
        <input id="password" type="password" placeholder="******************"
               class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
               v-model="auth.password"
               :class="{ 'input-invalid tw-mb-3' : v$.password.$invalid || errors.password }"
               @keydown="resetErrors('password')"
        >
        <p v-if="v$.password.$error" class="tw-text-red-500 tw-text-xs tw-italic">
          {{ v$.password.$errors[0].$message }}
        </p>
        <p v-else-if="errors.password" class="tw-text-red-500 tw-text-xs tw-italic">
          {{ errors.password[0] }}
        </p>
      </div>
      <div class="tw-flex tw-items-center tw-justify-between tw-flex-wrap">
        <button v-if="! isLogging" class="tw-w-1/3 tw-text-white tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-py-1 focus:tw-outline-none" type="submit">
          Login
        </button>

        <div v-else class="tw-w-1/3 tw-flex tw-justify-center tw-items-center tw-border tw-border-primary tw-bg-primary tw-rounded-full" style="padding: 11px 0">
          <LoopingRhombusesSpinner
              :animation-duration="2500"
              :rhombus-size="10"
              color="white"
          />
        </div>

        <router-link :to="{ name: 'ForgotPassword' }" class="tw-inline-block tw-align-baseline tw-font-bold tw-text-sm tw-text-primary">
          Forgot Password?
        </router-link>
        <router-link :to="{ name: 'Register' }" class="tw-w-full tw-mt-4 tw-text-center tw-font-bold tw-text-sm tw-text-primary">
          You don't have an account yet?
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { LoopingRhombusesSpinner } from 'epic-spinners';
import { required, minLength, maxLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import router from "@/router";
import { useStore } from 'vuex';
import { ref, reactive, toRef } from "vue";

export default {
  name: 'Login',
  components: {
    LoopingRhombusesSpinner,
  },
  setup() {
    const store = useStore();

    const isLogging = ref(false)
    const auth = reactive({
      username: '',
      password: '',
    });

    const errors = ref({});

    const rules = {
      username: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20),
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(255),
      },
    };

    const v$ = useVuelidate(rules, { username: toRef(auth, 'username'), password: toRef(auth, 'password') });

    const login = () => {
      v$.value.$touch();

      if (v$.value.$invalid) {
        return;
      }

      isLogging.value = true;

      store.dispatch('login', auth).then(() => {
        isLogging.value = false;

        router.push({ name: 'Home' });
      }).catch((err) => {
        isLogging.value = false;

        if (err.response.status === 422) {
          if (err.response.data.errors) {
            errors.value = err.response.data.errors;
          } else {
            errors.value = {
              'password': [err.response.data.message],
            }
          }
        } else if (err.response.status === 403) {
          store.dispatch('addNotification', {
            type: 'error',
            message: err.response.data.message,
          });
        }
      });
    }

    const resetErrors = (key) => {
      v$.value[key].$reset();
      delete errors.value[key];
    }

    return {
      v$,
      isLogging,
      auth,
      errors,
      login,
      resetErrors,
    }
  },
}
</script>