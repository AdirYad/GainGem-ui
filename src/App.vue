<template>
  <div :class="{ 'lg:tw-flex' : $store.getters.isLoggedIn }">
<!--    $store.getters.isLoggedIn-->
    <Navigation v-if="true" />

    <router-view :key="$route.fullPath" :class="{ 'lg:tw-p-10' : $store.getters.isLoggedIn }" />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";

export default {
  name: 'App',
  components: {
    Navigation,
  },
}
</script>

<style lang="pcss" src="./assets/css/app.pcss" />
