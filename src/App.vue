<template>
  <div :class="{ 'lg:tw-flex ' : $store.getters.isLoggedIn }">
    <Navigation v-if="$store.getters.isLoggedIn" />

    <div :class="{ 'page-container' : $store.getters.isLoggedIn}">
      <div :class="{ 'container' : $store.getters.isLoggedIn }">
        <Announcement v-if="$store.getters.isLoggedIn" />
        <LiveActivity v-if="$store.getters.isLoggedIn" />
        <EmailVerification v-if="$store.getters.isLoggedIn && $store.state.user && $store.state.user.email_verified_at === null" />

        <router-view :key="$route.name !== 'Profile' && $route.name !== 'Admin' ? $route.fullPath : $route.name"
                     :class="{ 'tw-p-4 md:tw-p-8 lg:tw-p-10' : $store.getters.isLoggedIn,
                     'tw-container tw-mx-auto tw-mb-6 tw-px-4' : ! $store.getters.isLoggedIn && ($route.name === 'Terms' || $route.name === 'Privacy') }"
        />
      </div>

      <Footer v-if="$store.getters.isLoggedIn || $route.name === 'Terms' || $route.name === 'Privacy'" />
    </div>
  </div>

  <NotificationsList />
</template>

<script>
import Navigation from "@/components/Navigation";
import LiveActivity from "@/components/LiveActivity";
import Announcement from "@/components/AnnouncementBanner";
import EmailVerification from "@/components/EmailVerification";
import Footer from "@/components/Footer";
import NotificationsList from "@/components/Notifications/NotificationsList";

export default {
  name: 'App',
  components: {
    Navigation,
    Announcement,
    LiveActivity,
    EmailVerification,
    Footer,
    NotificationsList,
  },
}
</script>

<style lang="pcss" src="./assets/css/app.pcss" />