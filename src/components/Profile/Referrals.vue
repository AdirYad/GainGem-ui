<template>
  <table class="tw-w-full">
    <tr>
      <td class="tw-uppercase tw-tracking-wider tw-text-lg tw-text-primary tw-font-medium tw-w-1/5">#</td>
      <td class="tw-uppercase tw-tracking-wider tw-text-lg tw-text-primary tw-font-medium tw-w-1/5">Signup Date</td>
      <td class="tw-uppercase tw-tracking-wider tw-text-lg tw-text-primary tw-font-medium tw-w-1/5">Username</td>
      <td class="tw-uppercase tw-tracking-wider tw-text-lg tw-text-primary tw-font-medium tw-w-1/5">Total Points</td>
    </tr>
    <tr>
      <td class="tw-uppercase tw-racking-wider tw-text-sm tw-text-gray-500 tw-w-1/5">#</td>
      <td>Signup Date</td>
      <td>Username</td>
      <td>Total Points</td>
    </tr>
  </table>
</template>

<script>
import { useStore } from 'vuex';

export default {
  name: 'Profile.Referrals',
  setup() {
    const store = useStore();

    return {}
  },
}
</script>