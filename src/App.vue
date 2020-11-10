<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>

  <router-view :key="$route.fullPath" />
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="pcss" src="./assets/css/app.pcss" />
