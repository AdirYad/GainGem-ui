<template>
  <div>
    <div class="tw-justify-between tw-flex tw-flex-row tw-py-3">
      <div class="tw-mx-1 md:tw-m-0 tw-w-1/2 md:tw-w-1/3 xl:tw-w-1/4 tw-h-12 tw-bg-primary tw-rounded-lg sm:tw-rounded-xl">
        <router-link :to="{name: 'Home'}" class="tw-rounded-lg sm:tw-rounded-xl tw-w-full tw-h-full tw-flex tw-rounded-xl tw-text-secondary tw-justify-center tw-items-center">
          <fa-icon icon="reply" class="tw-h-5 fa-w-26 lg:tw-h-6 lg:fa-w-40 tw-mr-3" />
          <div class="tw-text-xs sm:tw-text-base md:tw-text-lg tw-uppercase tw-tracking-wider">
            More Offers
          </div>
        </router-link>
      </div>
      <div class="miss-point tw-mx-1 md:tw-m-0 tw-w-1/2 md:tw-w-1/3 xl:tw-w-1/4 tw-h-12 tw-rounded-lg sm:tw-rounded-xl">
        <router-link :to="{name: 'Support'}" class="tw-uppercase tw-tracking-wider tw-rounded-lg sm:tw-rounded-xl tw-w-full tw-h-full tw-flex tw-rounded-xl tw-text-secondary tw-justify-center tw-items-center">
          <fa-icon icon="question" class="tw-h-5 fa-w-25 lg:tw-h-6 lg:fa-w-40 tw-m-3" />
          <div class="tw-text-xs sm:tw-text-base md:tw-text-lg tw-uppercase tw-tracking-wider">
             Missing Points?
          </div>
        </router-link>
      </div>
    </div>
    <div class="offerwall-image">

    </div>
  </div>

</template>

<script>

export default {
  name: 'Offerwall',
}
</script>