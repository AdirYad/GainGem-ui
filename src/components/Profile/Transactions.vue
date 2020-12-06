<template>
  <table class="tw-w-full">
    <tr>
      <td class="tw-uppercase tw-tracking-wider tw-text-lg tw-text-primary tw-font-medium tw-w-1/5">Id</td>
      <td class="tw-uppercase tw-tracking-wider tw-text-lg tw-text-primary tw-font-medium tw-w-1/5">Date</td>
      <td class="tw-uppercase tw-tracking-wider tw-text-lg tw-text-primary tw-font-medium tw-w-1/5">Reward</td>
      <td class="tw-uppercase tw-tracking-wider tw-text-lg tw-text-primary tw-font-medium tw-w-1/5">Amount</td>
      <td class="tw-uppercase tw-tracking-wider tw-text-lg tw-text-primary tw-font-medium tw-w-1/5">Status</td>
    </tr>
    <tr>
      <td class="tw-uppercase tw-racking-wider tw-text-sm tw-text-gray-500 tw-w-1/5">id</td>
      <td>date</td>
      <td>reward</td>
      <td>amount</td>
      <td>status</td>
    </tr>
  </table>
</template>

<script>
import { useStore } from 'vuex';

export default {
  name: 'Profile.Transactions',
  setup() {
    const store = useStore();

    return {}
  },
}
</script>