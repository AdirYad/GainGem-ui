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
      <router-link :to="{ name: 'Profile' }" class="tw-h-10 tw-w-10">
        <img v-if="$store.state.user && $store.state.user.profile_image" class="tw-rounded-full" :src="$store.state.user.profile_image" :alt="$store.state.user.username">
      </router-link>
    </div>
    <div class="navigation-bottom navigation tw-z-10 tw-fixed tw-right-0 tw-left-0 tw-bottom-0 tw-bg-primary tw-flex tw-justify-around sm:tw-justify-center tw-items-center tw-px-2 sm:tw-px-6 sm:tw-px-12">
      <BottomNavigationRoute to="Rewards">
        <fa-icon class="tw-h-6 fa-w-40 tw-mb-1" icon="money-check-alt" />
        <div class="tw-font-light">
          Rewards
        </div>
      </BottomNavigationRoute>
      <BottomNavigationRoute to="Invite">
        <fa-icon class="tw-h-6 fa-w-40 tw-mb-1" :icon="['far', 'handshake']" />
        <div class="tw-font-light">
          Invite
        </div>
      </BottomNavigationRoute>
      <BottomNavigationRoute class="earn" to="Home">
        <fa-icon class="tw-h-6 fa-w-40 tw-mb-1" :icon="['fab', 'buffer']" />
        <div class="tw-font-light">
          Earn
        </div>
      </BottomNavigationRoute>
      <BottomNavigationRoute to="Giveaways">
        <fa-icon class="tw-h-6 fa-w-40 tw-mb-1" icon="gift" />
        <div class="tw-font-light">
          Giveaways
        </div>
      </BottomNavigationRoute>
      <BottomNavigationRoute to="Support">
        <fa-icon class="tw-h-6 fa-w-40 tw-mb-1" icon="question" />
        <div class="tw-font-light">
          Support
        </div>
      </BottomNavigationRoute>
    </div>
  </div>
</template>

<script>
import BottomNavigationRoute from './BottomNavigationRoute';

export default {
  name: 'MobileNavigation',
  components: {
    BottomNavigationRoute,
  }
}
</script>
