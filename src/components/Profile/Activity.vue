<template>
  <table class="tw-w-full">
    <tr>
      <td class="tw-uppercase tw-tracking-wider tw-text-lg tw-text-primary tw-font-medium tw-w-1/5">Id</td>
      <td class="tw-uppercase tw-tracking-wider tw-text-lg tw-text-primary tw-font-medium tw-w-1/5">Date</td>
      <td class="tw-uppercase tw-tracking-wider tw-text-lg tw-text-primary tw-font-medium tw-w-1/5">Offer Name</td>
      <td class="tw-uppercase tw-tracking-wider tw-text-lg tw-text-primary tw-font-medium tw-w-1/5">Type</td>
      <td class="tw-uppercase tw-tracking-wider tw-text-lg tw-text-primary tw-font-medium tw-w-1/5">Amount</td>
    </tr>
    <tr>
      <td class="tw-uppercase tw-racking-wider tw-text-sm tw-text-gray-500 tw-w-1/5">Id</td>
      <td>Date</td>
      <td>Offer Name</td>
      <td>Type</td>
      <td>Amount</td>
    </tr>
  </table>
</template>

<script>
import { useStore } from 'vuex';

export default {
  name: 'Profile.Activity',
  setup() {
    const store = useStore();

    return {}
  },
}
</script>