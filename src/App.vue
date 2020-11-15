<template>
  <Header v-if="$store.getters.isLoggedIn" />

  <router-view :key="$route.fullPath" />
</template>

<script>
import Header from "@/components/Header";

export default {
  name: 'App',
  components: {
    Header,
  },
}
</script>

<style lang="pcss" src="./assets/css/app.pcss" />
