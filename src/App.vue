<template>
  <div :class="{ 'lg:tw-flex ' : $store.getters.isLoggedIn }">
    <Navigation v-if="$store.getters.isLoggedIn" />

    <div>
      <LiveActivity v-if="$store.getters.isLoggedIn" />

      <router-view :key="$route.fullPath" :class="{ 'lg:tw-p-10' : $store.getters.isLoggedIn }" />
    </div>
  </div>
</template>

<script>
import LiveActivity from "@/components/LiveActivity";
import Navigation from "@/components/Navigation";

export default {
  name: 'App',
  components: {
    Navigation,
    LiveActivity,
  },
}
</script>

<style lang="pcss" src="./assets/css/app.pcss" />
