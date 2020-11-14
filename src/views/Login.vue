<template>
  <div class="authentication-form tw-w-screen tw-h-screen tw-bg-secondary tw-flex tw-items-center tw-justify-center tw-flex-col tw-overflow-auto tw-p-10">
    <img class="tw-mb-10" style="height: 80px; margin-top: -40px; margin-bottom: 40px;" alt="logo" src="@/assets/images/Icon.png">
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
      <div class="tw-flex tw-items-center tw-justify-between">
        <button class="tw-text-white tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-px-4 tw-py-1 focus:tw-outline-none" type="submit">
          Login
        </button>
        <router-link :to="{name: '#'}" class="tw-inline-block tw-align-baseline tw-font-bold tw-text-sm tw-text-primary">
          Forgot Password?
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength, maxLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import router from "@/router";
import { useStore } from 'vuex';
import { ref, reactive, toRef } from "@vue/reactivity";

export default {
  name: 'Login',

  setup() {
    const store = useStore();

    const auth = reactive({
      username: '',
      password: '',
    });

    const errors = ref({});

    const rules = {
      username: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(50),
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

      store.dispatch('login', auth).then(() => {
        router.push({ name: 'Home' });
      }).catch((err) => {
        if (err.response.status === 422) {
          if (err.response.data.errors) {
            errors.value = err.response.data.errors;
          } else {
            errors.value = {
              'password': [err.response.data.message],
            }
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