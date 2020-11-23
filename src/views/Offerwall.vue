<template>
  <div>
    <div class="tw-justify-between tw-flex tw-flex-wrap">
      <div class="tw-mb-2 sm:tw-m-0 tw-w-full sm:tw-w-1/3 xl:tw-w-1/4 tw-h-12 tw-bg-primary tw-rounded-xl">
        <router-link :to="{ name: 'Home' }" class="tw-rounded-lg tw-w-full tw-h-full tw-flex tw-rounded-xl tw-text-secondary tw-justify-center tw-items-center">
          <fa-icon icon="reply" />
          <div class="tw-text-sm sm:tw-text-base tw-uppercase tw-tracking-wider tw-ml-3">
            More Offers
          </div>
        </router-link>
      </div>
      <div class="tw-bg-red-600 tw-w-full sm:tw-w-1/3 xl:tw-w-1/4 tw-h-12 tw-rounded-xl">
        <router-link :to="{ name: 'Support' }" class="tw-uppercase tw-tracking-wider tw-rounded-xl tw-w-full tw-h-full tw-flex tw-text-secondary tw-justify-center tw-items-center">
          <fa-icon icon="question" />
          <div class="tw-text-sm sm:tw-text-base tw-uppercase tw-tracking-wider tw-ml-3">
             Missing Points?
          </div>
        </router-link>
      </div>
    </div>
    <div v-if="offerwall" class="offerwall-card tw-w-full tw-my-4">
      <div
           class="tw-h-full tw-flex tw-justify-center tw-items-center tw-flex-col tw-rounded-xl tw-shadow tw-overflow-hidden"
           :class="`offerwall-${offerwall.provider}`"
           :style="{ background: offerwall.background || 'var(--primary-color)' }"
      >
        <img class="offerwall-image" :src="offerwall.image">
      </div>
    </div>
  </div>

</template>

<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'Offerwall',
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const provider = route.params.provider;

    const offerwall = store.state.offerwalls.filter(offerwall => offerwall.provider === provider)[0];

    if (! offerwall) {
      router.push({ name: 'Home' });
      return;
    }

    return {
      offerwall,
    }
  }
}
</script>