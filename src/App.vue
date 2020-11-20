<template>
  <div :class="{ 'lg:tw-flex ' : $store.getters.isLoggedIn }">
    <Navigation v-if="$store.getters.isLoggedIn" />

    <div :class="{ 'page-container' : $store.getters.isLoggedIn}">
      <LiveActivity v-if="$store.getters.isLoggedIn" />

      <router-view :key="$route.fullPath" :class="{ 'container tw-bg-secondary tw-p-8 lg:tw-p-10' : $store.getters.isLoggedIn }" />

      <Footer v-if="$store.getters.isLoggedIn" />
    </div>
  </div>
</template>

<script>
import LiveActivity from "@/components/LiveActivity";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default {
  name: 'App',
  components: {
    Footer,
    Navigation,
    LiveActivity,
  },
}
</script>

<style lang="pcss" src="./assets/css/app.pcss" />
