<template>
  <table class="table tw-w-full tw-flex sm:tw-bg-white tw-rounded-lg sm:tw-shadow-lg tw-overflow-hidden">
    <thead class="tw-text-white">
      <tr v-for="index in activities.length || 1" :key="index" class="tw-bg-primary tw-flex tw-flex-col tw-flex-no tw-wrap sm:tw-table-row tw-rounded-l-lg sm:tw-rounded-none tw-mb-2 sm:tw-mb-0">
        <th class="tw-p-3 tw-text-left sm:tw-w-10">#</th>
        <th class="tw-p-3 tw-text-left sm:tw-w-40">Date</th>
        <th class="tw-p-3 tw-text-left sm:tw-w-40">Type</th>
        <th class="tw-p-3 tw-text-left sm:tw-w-40">Amount</th>
      </tr>
    </thead>
    <tbody class="tw-flex-1 sm:tw-flex-none">
      <tr v-for="(activity, index) in activities" :key="index"  class="tw-flex tw-flex-col tw-flex-no tw-wrap sm:tw-table-row tw-mb-2 sm:tw-mb-0">
        <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="activity.id" />
        <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3 tw-truncate" v-text="activity.formatted_created_at" />
        <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3 tw-truncate" v-text="activity.formatted_type" />
        <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="activity.points" />
      </tr>
    </tbody>
  </table>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from "vue";

export default {
  name: 'Profile.Activity',
  setup() {
    const store = useStore();

    const activities = ref([]);

    store.dispatch('getActivities').then((response) => {
      activities.value = response.data.activities;
    });

    return {
      activities,
    }
  },
}
</script>