<template>
  <div class="tw-block lg:tw-hidden">
    <div class="navigation-top navigation tw-z-10 tw-fixed tw-left-0 tw-right-0 tw-top-0 tw-bg-white tw-flex tw-justify-between tw-items-center tw-px-6 sm:tw-px-12">
      <router-link :to="{ name: 'Home' }">
        <div class="logo" />
      </router-link>
      <div class="tw-border-2 tw-border-primary tw-rounded-full tw-px-2 sm:tw-px-4 tw tw-text-primary tw-font-medium tw-flex tw-justify-center tw-items-center">
        <fa-icon class="tw-h-4 fa-w-20 tw-mr-2" icon="coins" />
        <span class="tw-text-xl" v-if="$store.state.user && $store.state.user.points !== null">
          {{ $store.state.user.points }}
        </span>
      </div>
      <div class="tw-h-10 tw-w-10">
        <img v-if="$store.state.user && $store.state.user.profile_image" class="tw-rounded-full" :src="$store.state.user.profile_image" :alt="$store.state.user.username">
      </div>
    </div>
    <div class="navigation-bottom navigation tw-z-10 tw-fixed tw-right-0 tw-left-0 tw-bottom-0 tw-bg-white">
      123123
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobileNavigation',
}
</script>
