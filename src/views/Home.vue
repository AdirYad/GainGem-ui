<template>
  <div v-if="$store.getters.isLoggedIn" class="home">
    test
  </div>

  <div v-else class="home-unsigned tw-w-screen tw-h-screen">
    <header class="header-unsigned md:tw-px-24 lg:tw-px-48 tw-px-4 tw-flex tw-m-auto tw-items-center">
      <nav class="tw-flex-1">
        <router-link :to="{name: 'Home'}">
          <img class="logo tw-inline" alt="logo" src="@/assets/logo.png">
        </router-link>
      </nav>

      <nav>
        <router-link :to="{name: 'Login'}" class="tw-text-white tw-uppercase tw-tracking-wider tw-font-bold tw-duration-300 tw-border-2 tw-border-transparent hover:tw-border-primary hover:tw-text-primary tw-rounded-full tw-px-4 md:tw-px-6 tw-py-2 md:tw-py-3 tw-mr-2 md:tw-mr-4">
          Login
        </router-link>
        <router-link :to="{name: 'Register'}" class="tw-text-white tw-uppercase tw-tracking-wider tw-font-bold tw-duration-300 tw-border-2 hover:tw-border-primary hover:tw-bg-primary tw-rounded-full tw-px-4 md:tw-px-6 tw-py-2 md:tw-py-3">
          Register
        </router-link>
      </nav>
    </header>

    <main class="tw-container tw-h-screen tw-m-auto tw-flex tw-items-center tw-justify-center tw-flex-col tw-text-center tw-px-4">
      <h1 class="tw-font-bold tw-text-3xl sm:tw-text-4xl tw-text-white tw-uppercase tw-tracking-wider">
        Earn Points & Withdraw Anytime
      </h1>
      <p class="tw-text-lg sm:tw-text-xl md:tw-text-2xl tw-text-white tw-my-4">
        Earn instant rewards by completing simple tasks, watching videos and testing apps on the appstore. It's that easy!
      </p>
      <router-link :to="{name: 'Register'}" class="tw-text-white tw-uppercase tw-tracking-wider tw-font-bold tw-border-2 tw-border-primary tw-bg-primary tw-rounded-full tw-px-4 md:tw-px-6 tw-py-2 md:tw-py-3">
        Get Started
      </router-link>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>
