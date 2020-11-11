<template>
  <div id="nav">
    <router-link to="/">
      <a src="/views/Home.vue">
        <img class="logo" alt="logo" src="./assets/logo.png">
      </a>
    </router-link>
    <router-link to="/about">About</router-link>
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
