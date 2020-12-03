<template>
  <div class="tw-text-center">
    <div class="lg:tw-text-left tw-font-medium tw-text-2xl lg:tw-text-3xl tw-uppercase tw-tracking-wider tw-mb-4">
      My profile
    </div>
    <div class="tw-flex tw-flex-col md:tw-flex-row tw-justify-center">
      <div class="tw-bg-white tw-rounded-sm tw-shadow tw-w-full md:tw-w-1/3 xl:tw-w-1/4 tw-mb-8 md:tw-mb-0 tw-mr-0 md:tw-mr-3 xl:tw-mr-6">
        <div class="tw-flex tw-flex-col tw-bg-primary tw-justify-center tw-py-6 tw-mb-2">
          <div class="tw-flex tw-justify-center">
           <img v-if="$store.state.user && $store.state.user.profile_image" class="tw-rounded-full tw-w-20 tw-h-20" :src="$store.state.user.profile_image" :alt="$store.state.user.username">
          </div>
          <div class="tw-text-white tw-font-medium tw-pt-4" v-if="$store.state.user && $store.state.user.username">
            {{ $store.state.user.username }}
          </div>
        </div>

        <div class="tw-p-2">
          <div class="tw-flex tw-justify-between tw-items-center tw-border-b-2 tw-border-primary tw-bg-secondary tw-rounded-full tw-h-10 tw-px-3 tw-mb-3">
            <div class="tw-text-sm tw-uppercase tw-tracking-widest tw-font-light">
              Total points:
            </div>
            <div class="tw-truncate" v-if="$store.state.user && $store.state.user.points !== null">
              <fa-icon class="tw-h-4 fa-w-20" icon="coins" />
              {{ $store.state.user.points }}
            </div>
          </div>

          <div class="tw-flex tw-justify-between tw-items-center tw-border-b-2 tw-border-primary tw-bg-secondary tw-rounded-full tw-h-10 tw-px-3 tw-mb-3">
            <div class="tw-text-sm tw-uppercase tw-tracking-widest tw-font-light">
              sign in since:
            </div>
            <div class="tw-truncate" v-if="$store.state.user && $store.state.user.created_at !== null">
              <fa-icon class="tw-h-4 fa-w-20 tw-mr-1" icon="history" />
              {{ $store.state.user.created_at }}
            </div>
          </div>

          <router-link :to="{ name: 'Rewards' }"
            class="profile-card tw-flex tw-justify-center tw-items-center tw-border-b-2 tw-border-primary tw-bg-secondary tw-rounded-full tw-text-sm tw-uppercase tw-tracking-widest tw-font-light tw-h-10 tw-mb-3"
          >
            earn more points
          </router-link>

          <div class=" tw-flex tw-justify-center tw-mt-16">
            <button @click="logout" class="logout-profile tw-flex tw-justify-center tw-items-center tw-text-primary tw-border-2 tw-border-primary tw-bg-secondary tw-rounded-full tw-w-full sm:tw-w-1/2 md:tw-w-full tw-h-12">
              <fa-icon class="tw-h-6 fa-w-40" icon="sign-out-alt" />
              <div class="tw-text-sm tw-truncate tw-uppercase tw-tracking-widest tw-font-light">
                Logout
              </div>
            </button>
          </div>
        </div>
    </div>

      <div class="tw-bg-secondary tw-shadow-md tw-border-t-2 tw-border-primary tw-w-full md:tw-w-2/3 xl:tw-w-1/2">
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