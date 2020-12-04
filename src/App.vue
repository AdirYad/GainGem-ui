<template>
  <div :class="{ 'lg:tw-flex ' : $store.getters.isLoggedIn }">
    <Navigation v-if="$store.getters.isLoggedIn" />

    <div :class="{ 'page-container' : $store.getters.isLoggedIn}">
      <div :class="{ 'container' : $store.getters.isLoggedIn }">
        <LiveActivity v-if="$store.getters.isLoggedIn" />
        <EmailVerification v-if="$store.getters.isLoggedIn && $store.state.user && $store.state.user.email_verified_at === null" />

        <router-view :key="$route.fullPath" :class="{ 'tw-p-4 md:tw-p-8 lg:tw-p-10' : $store.getters.isLoggedIn }" />
      </div>

      <Footer v-if="$store.getters.isLoggedIn" />
    </div>
  </div>

  <NotificationsList />
</template>

<script>
import Navigation from "@/components/Navigation";
import LiveActivity from "@/components/LiveActivity";
import EmailVerification from "@/components/EmailVerification";
import Footer from "@/components/Footer";
import NotificationsList from "@/components/Notifications/NotificationsList";

export default {
  name: 'App',
  components: {
    Navigation,
    LiveActivity,
    EmailVerification,
    Footer,
    NotificationsList,
  },
}
</script>

<style lang="pcss" src="./assets/css/app.pcss" />