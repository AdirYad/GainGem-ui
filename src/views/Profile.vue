<template>
  <div>
    <div class="tw-flex tw-flex-col lg:tw-flex-row">
      <div class="tw-bg-white tw-rounded-sm tw-shadow tw-w-full lg:tw-w-1/3">
        <div class="tw-bg-primary tw-py-6 tw-mb-2">
          <div class="tw-flex tw-justify-center">
            <img v-if="$store.state.user && $store.state.user.profile_image" class="tw-bg-secondary tw-shadow-lg tw-rounded-full tw-w-20 tw-h-20" :src="$store.state.user.profile_image" :alt="$store.state.user.username">
          </div>
          <div class="tw-text-secondary tw-font-medium tw-text-lg tw-pt-4 tw-text-center" v-if="$store.state.user && $store.state.user.username">
            {{ $store.state.user.username }}
          </div>
        </div>
        <div class="tw-p-2">
          <div class="tw-flex tw-justify-between tw-items-center tw-flex-wrap tw-border-b-2 tw-border-primary tw-rounded-md tw-px-3 tw-mb-3" style="min-height: 2.5rem">
            <div class="lg:tw-w-full xl:tw-flex-1 tw-text-left lg:tw-text-center xl:tw-text-left tw-text-sm tw-uppercase tw-font-light">
              Total points
            </div>
            <div v-if="$store.state.user && $store.state.user.total_points !== null" class="tw-truncate tw-w-1/2 md:tw-w-1/3 lg:tw-w-full xl:tw-w-1/3 tw-text-right lg:tw-text-center xl:tw-text-right">
              <fa-icon class="tw-h-4 fa-w-20" icon="coins" />
              {{ $store.state.user.total_points }}
            </div>
          </div>
          <div class="tw-flex tw-justify-between tw-items-center tw-flex-wrap tw-border-b-2 tw-border-primary tw-rounded-md tw-px-3 tw-mb-3" style="min-height: 2.5rem">
            <div class="lg:tw-w-full xl:tw-flex-1 tw-text-left lg:tw-text-center xl:tw-text-left tw-text-sm tw-uppercase tw-font-light">
              Join date
            </div>
            <div v-if="$store.state.user && $store.state.user.created_at !== null" class="tw-truncate tw-w-1/2 md:tw-w-1/3 lg:tw-w-full xl:tw-w-1/3 tw-text-right lg:tw-text-center xl:tw-text-right">
              {{ $store.state.user.created_at }}
            </div>
          </div>
          <button @click="logout" class="tw-w-full tw-flex tw-justify-center tw-items-center hover:tw-text-white hover:tw-bg-primary tw-duration-300 tw-text-primary tw-border-2 tw-border-primary lg:tw-hidden tw-text-sm tw-uppercase tw-tracking-wider tw-font-bold tw-rounded-full tw-py-2 tw-mb-1 tw-mt-12">
            <fa-icon class="tw-h-6 fa-w-40" icon="sign-out-alt" />
            Logout
          </button>
        </div>
      </div>

      <div class="tw-flex tw-flex-1 tw-bg-white tw-shadow-md tw-mt-8 lg:tw-mt-0 lg:tw-ml-3 xl:tw-ml-6">
        <Tabs style="min-height: 200px" class="tw-min-h-12 tw-w-full">
          <Tab name="Account Details" query="details">
            <Details />
          </Tab>
          <Tab name="Transactions" query="transactions">
            <Transactions />
          </Tab>
          <Tab name="Activity" query="activity">
            <Activity />
          </Tab>
          <Tab name="Referrals" query="referrals">
            <Referrals />
          </Tab>
      </Tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Tab from '@/components/Tab'
import Tabs from "@/components/Tabs";
import Details from '@/components/Profile/Details';
import Transactions from '@/components/Profile/Transactions';
import Activity from '@/components/Profile/Activity';
import Referrals from '@/components/Profile/Referrals';
import { useStore } from 'vuex';
import router from "@/router";

export default {
  name: 'Profile',
  components: {
    Tab,
    Tabs,
    Details,
    Transactions,
    Activity,
    Referrals,
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