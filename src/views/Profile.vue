<template>
  <div class="tw-text-center">
    <div class="lg:tw-text-left tw-font-medium tw-text-2xl lg:tw-text-3xl tw-uppercase tw-tracking-wider tw-mb-4">
      My profile
    </div>
    <div class="tw-flex tw-flex-col lg:tw-flex-row">
      <div class="tw-bg-white tw-rounded-sm tw-shadow tw-w-full lg:tw-w-1/3">
        <div class="tw-bg-primary tw-py-6 tw-mb-2">
          <div class="tw-flex tw-justify-center">
            <img v-if="$store.state.user && $store.state.user.profile_image" class="tw-rounded-full tw-w-20 tw-h-20" :src="$store.state.user.profile_image" :alt="$store.state.user.username">
          </div>
          <div class="tw-text-secondary tw-font-medium tw-text-lg tw-pt-4" v-if="$store.state.user && $store.state.user.username">
            {{ $store.state.user.username }}
          </div>
        </div>
        <div class="tw-p-2">
          <div class="tw-flex tw-items-center tw-border-b-2 tw-border-primary tw-rounded-md tw-h-10 tw-px-3 tw-mb-3">
            <div class="tw-flex-1 tw-text-left tw-text-sm tw-uppercase tw-font-light">
              Total points
            </div>
            <div v-if="$store.state.user && $store.state.user.total_points !== null"
                 class="tw-truncate tw-w-2/5 tw-text-right">
              <fa-icon class="tw-mr-1 tw-h-4 fa-w-20" icon="coins" />
              {{ $store.state.user.total_points }}
            </div>
          </div>
          <div class="tw-flex tw-items-center tw-border-b-2 tw-border-primary tw-rounded-md tw-h-10 tw-px-3 tw-mb-3">
            <div class="tw-flex-1 tw-text-left tw-text-sm tw-uppercase tw-font-light">
              Total offers
            </div>
            <div v-if="$store.state.stats && $store.state.stats.total_offers_completed !== null"
                 class="tw-truncate tw-w-2/5 tw-text-right">
              {{ $store.state.stats.total_offers_completed }}
            </div>
          </div>
          <div class="tw-flex tw-items-center tw-border-b-2 tw-border-primary tw-rounded-md tw-h-10 tw-px-3 tw-mb-3 lg:tw-mb-0">
            <div class="tw-flex-1 tw-text-left tw-text-sm tw-uppercase tw-font-light">
              Register since:
            </div>
            <div class="tw-truncate tw-w-1/3 tw-text-right" v-if="$store.state.user && $store.state.user.created_at !== null">
              <fa-icon class="tw-mr-1 tw-h-4 fa-w-20" icon="history" />
              {{ $store.state.user.created_at }}
            </div>
          </div>
          <button @click="logout" class="tw-flex tw-justify-center tw-items-center hover:tw-text-white hover:tw-bg-primary tw-duration-300 tw-text-primary tw-border-2 tw-border-primary lg:tw-hidden tw-text-sm tw-uppercase tw-tracking-wider tw-font-bold tw-rounded-full tw-w-full tw-h-12 tw-mb-1 tw-mt-16">
            <fa-icon class="tw-h-6 fa-w-40" icon="sign-out-alt" />
              Logout
          </button>
        </div>
      </div>

      <div class="tw-flex tw-flex-1 tw-bg-secondary tw-shadow-md tw-mt-8 lg:tw-mt-0 tw-ml-0 lg:tw-ml-3 xl:tw-ml-6">





<!--        <div class="tw-flex tw-h-12 tw-w-full">-->
<!--          <button @click="selectTab(tab)" v-for="(tab, index) in $store.state.tabs" :key="index"-->
<!--                  class="tw-flex tw-items-end tw-justify-center tw-truncate tw-text-xs lg:tw-text-sm tw-uppercase tw-font-light tw-h-12 tw-w-1/4"-->
<!--          >-->
<!--            <div v-if="tab.isActive" :class="{ 'isActive': tab.isActive }"-->
<!--                 class="tw-flex tw-items-end tw-justify-center tw-text-sm lg:tw-text-base tw-text-primary tw-font-bold tw-border-t-2 tw-border-primary tw-h-full tw-w-full">-->
<!--              {{ tab.name }}-->
<!--            </div>-->
<!--            <div v-else>-->
<!--              {{ tab.name }}-->
<!--            </div>-->
<!--          </button>-->
<!--        </div>-->
        <Tabs class="tw-h-12 tw-w-full">
          <Tab name="Account Details" :selected="true">
            <div>
              11111111
            </div>
          </Tab>
          <Tab name="Transactions">
            <div>
              22222222
            </div>
          </Tab>
          <Tab name="Activity">
            <div>
              2323232
            </div>
          </Tab>
          <Tab name="Referrals">
            <div>
              3332
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Tab from '@/components/Tab'
import Tabs from "@/components/Tabs";
import { useStore } from 'vuex';
import router from "@/router";

export default {
  name: "Profile",
  components: {
    Tab,
    Tabs,
  },
  setup() {
    const store = useStore();

    const logout = () => {
      store.dispatch('logout').then(() => {
        router.push({ name: 'Home' });
      });
    };

    return {
      logout,
    }
  },
}
</script>

<style scoped>
.tab {
  padding: 10px 20px;
}
</style>