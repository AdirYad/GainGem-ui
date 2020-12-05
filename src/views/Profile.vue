<template>
  <div>
    <div class="lg:tw-text-left tw-font-medium tw-text-2xl lg:tw-text-3xl tw-uppercase tw-tracking-wider tw-mb-4">
      My profile
    </div>
    <div class="tw-flex tw-flex-col lg:tw-flex-row">
      <div class="tw-bg-white tw-rounded-sm tw-shadow tw-w-full lg:tw-w-1/3">
        <div class="tw-bg-primary tw-py-6 tw-mb-2">
          <div class="tw-flex tw-justify-center">
            <img v-if="$store.state.user && $store.state.user.profile_image" class="tw-rounded-full tw-w-20 tw-h-20" :src="$store.state.user.profile_image" :alt="$store.state.user.username">
          </div>
          <div class="tw-text-secondary tw-font-medium tw-text-lg tw-pt-4 tw-text-center" v-if="$store.state.user && $store.state.user.username">
            {{ $store.state.user.username }}
          </div>
        </div>
        <div class="tw-p-2">
          <div class="tw-flex tw-items-center tw-border-b-2 tw-border-primary tw-rounded-md tw-h-10 tw-px-3 tw-mb-3">
            <div class="tw-flex-1 tw-text-left tw-text-sm tw-uppercase tw-font-light">
              Total points
            </div>
            <div v-if="$store.state.user && $store.state.user.total_points !== null" class="tw-truncate tw-w-1/2 md:tw-w-1/3 tw-text-right">
              <fa-icon class="tw-h-4 fa-w-20" icon="coins" />
              {{ $store.state.user.total_points }}
            </div>
          </div>
          <div class="tw-flex tw-items-center tw-border-b-2 tw-border-primary tw-rounded-md tw-h-10 tw-px-3 tw-mb-3 lg:tw-mb-0">
            <div class="tw-flex-1 tw-text-left tw-text-sm tw-uppercase tw-font-light">
              Join date
            </div>
            <div class="tw-truncate tw-w-1/2 md:tw-w-1/3 tw-text-right" v-if="$store.state.user && $store.state.user.created_at !== null">
              <fa-icon class="tw-mr-1 tw-h-4 fa-w-20" icon="history" />
              {{ $store.state.user.created_at }}
            </div>
          </div>
          <button @click="logout" class="tw-w-full tw-flex tw-justify-center tw-items-center hover:tw-text-white hover:tw-bg-primary tw-duration-300 tw-text-primary tw-border-2 tw-border-primary lg:tw-hidden tw-text-sm tw-uppercase tw-tracking-wider tw-font-bold tw-rounded-full tw-h-12 tw-mb-1 tw-mt-12">
            <fa-icon class="tw-h-6 fa-w-40" icon="sign-out-alt" />
              Logout
          </button>
        </div>
      </div>

      <div class="tw-flex tw-flex-1 tw-bg-white tw-shadow-md tw-mt-8 lg:tw-mt-0 lg:tw-ml-3 xl:tw-ml-6">
        <Tabs style="min-height: 200px" class="tw-min-h-12 tw-w-full">
          <Tab name="Account Details" query="details">
            <div class="tw-flex tw-flex-col tw-p-4">
              <div class="tw-flex">
                <img v-if="$store.state.user && $store.state.user.profile_image"
                     class="tw-mr-10 tw-rounded-full tw-w-12 tw-h-12"
                     :src="$store.state.user.profile_image" :alt="$store.state.user.username">
                <button @change="previewImage" class="tw-flex tw-justify-center tw-items-center tw-text-sm md:tw-text-lg tw-text-primary tw-border-2 tw-border-primary tw-tracking-wider tw-rounded-md tw-p-2">
                  <fa-icon class="tw-h-6 fa-w-40" icon="angle-double-up" />
                  <div class="tw-hidden md:tw-block">
                    Upload an image profile
                  </div>
                </button>
              </div>
              <div class="tw-flex tw-mt-5">
                <div class="tw-flex tw-items-center tw-mr-8">
                  <label class="tw-text-primary tw-block tw-font-bold tw-mr-2" for="username">
                    Username
                  </label>
                  <input id="username" type="text" placeholder="username"
                   class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-py-2 tw-px-3 tw-leading-tight focus:tw-outline-none"
                  >
                </div>
                <div class="tw-flex tw-items-center">
                  <label class="tw-text-primary tw-font-bold tw-mr-2" for="email">
                    Email
                  </label>
                  <input id="email" type="text" placeholder="Email"
                         class="tw-cursor-not-allowed tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight"
                  >
                </div>
              </div>
              <div class="tw-flex tw-mt-8">
                <div class="tw-flex tw-items-center tw-mr-8">
                  <label class="tw-text-primary tw-font-bold tw-mr-2" for="password">
                    Password
                  </label>
                  <input id="password" type="password" placeholder="************"
                         class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-py-2 tw-px-3 tw-leading-tight focus:tw-outline-none"
                  >
                </div>
                <div class="tw-flex tw-items-center">
                  <label  class="tw-text-primary tw-font-bold tw-mr-2" for="password">
                    Confirm Password
                  </label>
                  <input id="confirm" type="password" placeholder="************"
                         class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-py-2 tw-px-3 tw-leading-tight focus:tw-outline-none"
                  >
                </div>
              </div>
              <button class="tw-text-white tw-text-xl tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-py-1 tw-w-40 tw-mt-16" type="submit">
                save
              </button>
            </div>
          </Tab>
          <Tab name="Transactions" query="transactions">
            <div class="tw-p-2">
              <table class="tw-w-full">
                <tr>
                  <td class="tw-uppercase tw-tracking-wider tw-text-lg tw-text-primary tw-font-medium tw-w-1/5">id</td>
                  <td class="tw-uppercase tw-tracking-wider tw-text-lg tw-text-primary tw-font-medium tw-w-1/5">date</td>
                  <td class="tw-uppercase tw-tracking-wider tw-text-lg tw-text-primary tw-font-medium tw-w-1/5">reward</td>
                  <td class="tw-uppercase tw-tracking-wider tw-text-lg tw-text-primary tw-font-medium tw-w-1/5">amount</td>
                  <td class="tw-uppercase tw-tracking-wider tw-text-lg tw-text-primary tw-font-medium tw-w-1/5">status</td>
                </tr>
                <tr>
                  <td class="tw-uppercase tw-racking-wider tw-text-sm tw-text-gray-500 tw-w-1/5">idddddddddd</td>
                  <td>date</td>
                  <td>reward</td>
                  <td>amount</td>
                  <td>status</td>
                </tr>
              </table>

            </div>
          </Tab>
          <Tab name="Activity" query="activity">
            <div>
              2323232
            </div>
          </Tab>
          <Tab name="Referrals" query="referrals">
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
  name: 'Profile',
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
td{
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 1.125rem;
  line-height: 1.75rem;


  .active{
    @apply text-primary font-medium w-1/5;
  }
}
</style>