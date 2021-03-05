<template>
  <div class="half-size-table tw-rounded-lg sm:tw-shadow-lg tw-overflow-scroll">
    <table class="table tw-w-full tw-flex sm:tw-bg-white tw-rounded-lg sm:tw-shadow-lg tw-overflow-hidden">
      <thead class="tw-text-white">
        <tr v-for="index in referrals.length || 1" :key="index" class="tw-bg-primary tw-flex tw-flex-col tw-flex-no tw-wrap sm:tw-table-row tw-rounded-l-lg sm:tw-rounded-none tw-mb-2 sm:tw-mb-0">
          <th class="tw-p-3 tw-text-left sm:tw-w-10">#</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Signup Date</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Username</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Total Points</th>
        </tr>
      </thead>
      <tbody class="tw-flex-1 sm:tw-flex-none">
        <tr v-for="(referral, index) in referrals" :key="index"  class="tw-flex tw-flex-col tw-flex-no tw-wrap sm:tw-table-row tw-mb-2 sm:tw-mb-0">
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="index + 1" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3 tw-truncate" v-text="referral.formatted_created_at" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3 tw-truncate" v-text="referral.username" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="referral.referral_points" />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from "vue";

export default {
  name: 'Profile.Referrals',
  props: {
    user: {
      type: Object,
      required: false,
    },
  },
  setup(props) {
    const store = useStore();

    const referrals = ref([]);

    store.dispatch('getReferrals', props.user.id).then((response) => {
      referrals.value = response.data.referrals;
    });

    return {
      referrals,
    }
  }
}
</script>