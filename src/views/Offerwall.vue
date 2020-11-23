<template>
  <div class="tw-justify-between tw-flex tw-flex-wrap ">
    <div class="tw-w-1/2 md:tw-w-1/3 lg:tw-w-1/4 tw-h-12 tw-bg-primary tw-rounded-xl">
      <router-link :to="{name: 'Home'}" class="tw-w-full tw-h-full tw-flex tw-rounded-xl tw-text-secondary tw-uppercase tw-tracking-wider tw-justify-center tw-items-center">
        <fa-icon icon="reply" class="tw-h-6 fa-w-40 tw-mr-3" />
        More Offers
      </router-link>
    </div>
    <div class="tw-w-1/2 md:tw-w-1/3 lg:tw-w-1/4 tw-h-12 tw-bg-primary tw-rounded-xl">
      <router-link :to="{name: 'Support'}" class="tw-w-full tw-h-full tw-flex tw-rounded-xl tw-text-secondary tw-uppercase tw-tracking-wider tw-justify-center tw-items-center">
        <fa-icon icon="question" class="tw-h-6 fa-w-40" />
        Missing Points?
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Offerwall',
}
</script>