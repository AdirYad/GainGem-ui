<template>
  <div class="authentication-form tw-w-screen tw-h-screen tw-bg-secondary tw-flex tw-items-center tw-justify-center tw-flex-col tw-overflow-auto tw-p-10">
    <img alt="logo" src="@/assets/images/Icon.png">
    <form @submit.prevent="register" class="tw-bg-white tw-shadow-lg tw-rounded-lg tw-px-10 tw-py-12">
      <div class="tw-mb-4">
        <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="email">
          Email
        </label>
        <input id="email" type="text" placeholder="Email"
               class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
               v-model="auth.email"
               :class="{ 'input-invalid tw-mb-3' : v$.email.$invalid }"
               @keydown="v$.email.$reset()"
        >
        <p v-if="v$.email.$error" class="tw-text-red-500 tw-text-xs tw-italic">
          {{ v$.email.$errors[0].$message }}
        </p>
      </div>
      <div class="tw-mb-4">
        <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="username">
          Username
        </label>
        <input id="username" type="text" placeholder="Username"
               class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
               v-model="auth.username"
               :class="{ 'input-invalid tw-mb-3' : v$.username.$invalid }"
               @keydown="v$.username.$reset()"
        >
        <p v-if="v$.username.$error" class="tw-text-red-500 tw-text-xs tw-italic">
          {{ v$.username.$errors[0].$message }}
        </p>
      </div>
      <div class="tw-mb-6">
        <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="password">
          Password
        </label>
        <input id="password" type="password" placeholder="******************"
               class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
               v-model="auth.password"
               :class="{ 'input-invalid tw-mb-3' : v$.password.$invalid }"
               @keydown="v$.password.$reset()"
               @change="v$.confirmPassword.sameAsPassword.$params.equalTo = auth.password"
        >
        <p v-if="v$.password.$error" class="tw-text-red-500 tw-text-xs tw-italic">
          {{ v$.password.$errors[0].$message }}
        </p>
      </div>
      <div class="tw-mb-6">
        <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="confirmPassword">
          Confirm Password
        </label>
        <input id="confirmPassword" type="password" placeholder="******************"
               class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
               v-model="auth.confirmPassword"
               :class="{ 'input-invalid tw-mb-3' : v$.confirmPassword.$invalid }"
               @keydown="v$.confirmPassword.$reset()"
        >
        <p v-if="v$.confirmPassword.$error" class="tw-text-red-500 tw-text-xs tw-italic">
          <template v-if="v$.confirmPassword.sameAsPassword.$invalid">
            Passwords must be identical
          </template>
          <template v-else>
            {{ v$.confirmPassword.$errors[0].$message }}
          </template>
        </p>
      </div>
      <div class="tw-flex tw-flex-col">
        <button class="tw-text-white tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-px-4 tw-py-1 focus:tw-outline-none" type="submit">
          Register
        </button>
        <router-link :to="{name: 'Login'}" class="tw-mt-4 tw-text-center tw-inline-block tw-align-baseline tw-font-bold tw-text-sm tw-text-primary">
          You have already an account?
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength, maxLength, email, sameAs } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { reactive, toRef } from "@vue/reactivity";

export default {
  name: 'Register',

  setup() {
    const auth = reactive({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    })

    const rules = {
      username: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(50),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(255),
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('', 'password'),
      },
    };

    const v$ = useVuelidate(rules, {
      username: toRef(auth, 'username'),
      email: toRef(auth, 'email'),
      password: toRef(auth, 'password'),
      confirmPassword: toRef(auth, 'confirmPassword'),
    });

    const register = () => {
      v$.value.$touch();

      if (v$.value.confirmPassword.sameAsPassword.$invalid && auth.password === auth.confirmPassword) {
        v$.value.confirmPassword.$reset();
      }

      if (v$.value.$invalid) {
        return;
      }

      console.log(auth)
    }

    return {
      auth,
      register,
      v$,
    }
  },
}
</script>