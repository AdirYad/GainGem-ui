<template>
  <header id="header" class="md:tw-px-24 lg:tw-px-48 tw-px-8 tw-flex tw-m-auto tw-items-center">
    <nav class="tw-flex-1">
      <router-link :to="{name: 'Home'}">
        <img class="logo tw-inline" alt="logo" src="@/assets/logo.png">
      </router-link>
    </nav>

    <nav>
      <router-link class="login link-border tw-rounded-xl tw-px-6 tw-py-3 no-router-link-exact-active tw-mr-4" :to="{name: 'Login'}">
        Login
      </router-link>
      <router-link class="register link-border tw-rounded-xl tw-px-6 tw-py-3 no-router-link-exact-active" :to="{name: 'Register'}">
        Register
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>
