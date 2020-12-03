<template>
  <div class="tw-text-center">
    <div class="lg:tw-text-left tw-font-medium tw-text-2xl lg:tw-text-3xl tw-uppercase tw-tracking-wider tw-mb-4">
      My profile
    </div>
    <div class="tw-flex tw-flex-col lg:tw-flex-row tw-justify-center">
      <div class="tw-bg-white tw-rounded-sm tw-shadow tw-w-full lg:tw-w-1/2 xl:tw-w-1/4 tw-mb-8 lg:tw-mb-0 tw-mr-0 lg:tw-mr-3 xl:tw-mr-6">
        <div class="tw-flex tw-flex-col tw-bg-primary tw-justify-center tw-py-6">
          <div class="tw-flex tw-justify-center">
           <img v-if="$store.state.user && $store.state.user.profile_image" class="tw-rounded-full tw-w-20 tw-h-20" :src="$store.state.user.profile_image" :alt="$store.state.user.username">
          </div>
          <div class="tw-text-white tw-font-medium tw-pt-4" v-if="$store.state.user && $store.state.user.username">
            {{ $store.state.user.username }}
          </div>
        </div>

        <div class="tw-flex tw-justify-between tw-border-b-2 tw-border-primary tw-bg-secondary tw-rounded-full tw-px-3 tw-mt-4">
          <div class="tw-text-sm tw-uppercase tw-tracking-widest tw-font-light">
           Total points:
          </div>
          <div class="tw-truncate" v-if="$store.state.user && $store.state.user.points !== null">
            <fa-icon class="tw-h-4 fa-w-20" icon="coins" />
            {{ $store.state.user.points }}
          </div>
        </div>
        <div class="tw-flex tw-justify-between tw-border-b-2 tw-border-primary tw-bg-secondary tw-rounded-full tw-px-3 tw-mt-3">
          <div class="tw-text-sm tw-uppercase tw-tracking-widest tw-font-light">
            sign in since:
          </div>
          <div class="tw-truncate" v-if="$store.state.user && $store.state.user.created_at !== null">
            <fa-icon class="tw-h-4 fa-w-20" icon="history" />
            {{ $store.state.user.created_at }}
          </div>
        </div>
        <div class="tw-border-b-2 tw-border-primary tw-bg-secondary tw-rounded-full tw-text-sm tw-uppercase tw-tracking-widest tw-font-light tw-px-3 tw-mt-3">
          <router-link :to="{ name: 'Rewards' }">
              earn more points
          </router-link>
        </div>

        <div class="tw-flex tw-justify-center tw-w-full">
          <button @click="logout" class="logout tw-flex tw-justify-center tw-bg-primary tw-rounded-full twtext-secondary tw-h-12 tw-px-10 tw-py-4 tw-mt-3 ">
            <fa-icon class="tw-h-6 fa-w-40" icon="sign-out-alt" />
            <div class="tw-text-sm tw-uppercase tw-tracking-widest tw-font-light tw-ml-6">
              Logout
            </div>
          </button>
        </div>
<!--      <div class="tw-border-b-2 tw-border-primary tw-bg-secondary tw-rounded-full tw-px-3 tw-mt-3 tw-mb-1">-->
<!--        <div class="tw-text-sm tw-uppercase tw-tracking-widest tw-font-light">-->
<!--          sign in since:-->
<!--        </div>-->
<!--      </div>-->
    </div>

      <div class=" tw-w-full lg:tw-w-1/2 xl:tw-w-1/3 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md">
      rr00000000000
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import router from "@/router";

export default {
  name: 'Profile',
  setup() {
    const store = useStore();

    const logout = () => {
      store.dispatch('logout').then(() => {
        router.push({ name: 'Home' });
      });
    }

    return {
      logout,
    }
  },
}
</script>

<style scoped>
.logout:hover {
  font-weight: 600;
}
</style>