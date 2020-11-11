<template>
  <div v-if="$store.getters.isLoggedIn" class="home">
    asdasd
  </div>

  <div v-else class="home-unsigned tw-w-screen tw-h-screen">
    <header class="header-unsigned md:tw-px-24 lg:tw-px-48 tw-px-8 tw-flex tw-m-auto tw-items-center">
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

    <main class="tw-container tw-m-auto tw-flex tw-items-center">
      <div class="tw-flex-1">
        <h1>
          Earn Points & Withdraw Anytime
        </h1>
        <p>
          Earn instant rewards by completing simple tasks, watching videos and testing apps on the appstore. It's that easy!
        </p>
        <button>
          Get Started
        </button>
      </div>

      <div class="tw-w-1/4">
        <img class="tw-rounded-full" src="@/assets/images/survey.jpg" alt="Survey">
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>
