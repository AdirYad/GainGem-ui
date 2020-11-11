<template>
  <div id="nav" class="tw-container tw-flex tw-m-auto tw-items-center">
    <router-link :to="{name: 'Home'}">
      <img class="logo" alt="logo" src="./assets/logo.png">
    </router-link>
    <router-link :to="{name: 'About'}">About</router-link>
  </div>

  <router-view :key="$route.fullPath" />
</template>
s
<script>
export default {
  name: 'App',
}
</script>

<style lang="pcss" src="./assets/css/app.pcss" />
