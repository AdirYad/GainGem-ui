<template>
  <aside class="sidebar-menu tw-sticky tw-hidden lg:tw-flex tw-flex-col tw-min-h-screen tw-bg-primary">
    <section>
      <router-link :to="{ name: 'Home' }" class="logo-link tw-flex tw-justify-center tw-items-center">
        <div class="logo" />
      </router-link>
    </section>
    <nav class="tw-flex-1 tw-flex tw-flex-col">
      <div class="tw-cursor-pointer tw-h-20 tw-border-t tw-border-b border-secondary-3">

      </div>
      <ul class="tw-mt-6 tw-flex-1">
        <li>
          <router-link :to="{ name: 'Home' }" class="router tw-flex tw-items-center tw-px-10 tw-py-4 tw-text-secondary">
            <fa-icon class="tw-h-6 fa-w-40" :icon="['fab', 'buffer']" />
            <div class="tw-text-sm tw-uppercase tw-tracking-widest tw-font-light tw-ml-6">
              Offers
            </div>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Withdraws' }" class="router tw-flex tw-items-center tw-px-10 tw-py-4 tw-text-secondary">
            <fa-icon class="tw-h-6 fa-w-40" icon="money-check-alt" />
            <div class="tw-text-sm tw-uppercase tw-tracking-widest tw-font-light tw-ml-6">
              Withdraws
            </div>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Referrals' }" class="router tw-flex tw-items-center tw-px-10 tw-py-4 tw-text-secondary">
            <fa-icon class="tw-h-6 fa-w-40" :icon="['far', 'handshake']" />
            <div class="tw-text-sm tw-uppercase tw-tracking-widest tw-font-light tw-ml-6">
              Referrals
            </div>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Support' }" class="router tw-flex tw-items-center tw-px-10 tw-py-4 tw-text-secondary">
            <fa-icon class="tw-h-6 fa-w-40" icon="question" />
            <div class="tw-text-sm tw-uppercase tw-tracking-widest tw-font-light tw-ml-6">
              Support
            </div>
          </router-link>
        </li>
      </ul>
    </nav>
    <section>
      <button @click="logout" class="router tw-w-full tw-h-12 tw-flex tw-items-center tw-px-10 tw-py-4 tw-text-secondary tw-border-t border-secondary-3">
        <fa-icon class="tw-h-6 fa-w-40" icon="sign-out-alt" />
        <div class="tw-text-sm tw-uppercase tw-tracking-widest tw-font-light tw-ml-6">
          Logout
        </div>
      </button>
    </section>
  </aside>
</template>

<script>
import { useStore } from 'vuex';
import router from "@/router";

export default {
  name: 'SidebarMenu',
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
.fa-w-40 {
  width: 40px;
}
</style>