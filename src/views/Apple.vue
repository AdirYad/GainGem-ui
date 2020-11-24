<template>
  <div class="tw-flex tw-flex-wrap ">
    <div class="tw-bg-secondary tw-w-full md:tw-w-1/3 xl:tw-w-1/4">
      <div class="rewards-list">
        <div class="reward-item">
          <div class="reward reward-apple tw-relative tw-flex tw-justify-center tw-items-center">
            <img src="@/assets/images/rewards/apple.png" alt="apple">
          </div>
          <div class="reward-details tw-flex tw-items-center tw-px-3 tw-font-medium tw-text-lg lg:tw-text-xl tw-uppercase tw-tracking-wider">
            App Store
          </div>
        </div>
      </div>
    </div>
    <div class="tw-pt-8 md:tw-pt-0 tw-pl-0 md:tw-pl-8 lg:tw-pl-16 tw-flex-col tw-w-full md:tw-w-2/3 xl:tw-w-3/4">
      <div>
        <select v-model="selected" class="select tw-duration-300 tw-shadow tw-border tw-w-full sm:tw-w-1/2 xl:tw-w-5/12 tw-rounded-md tw-py-3 tw-px-4 focus:tw-outline-none">
          <!--        <option v-for="option in $store.data.options" :value="option.value">-->
          <!--          {{ option.text }}-->
          <!--        </option>-->
          <option disabled value="">Please select one</option>
          <option type="number" value="5">5$</option>
          <option type="number" value="10">10$</option>
          <option type="number" value="15">15$</option>
          <option type="number" value="25">25$</option>
          <option type="number" value="50">50$</option>
          <option type="number" value="100">100$</option>
        </select>
        <span class="">
          Cost {{ selected*1000 }}
        </span>
        <span class="tw-w-full">
          (1$ = 1000 Points)
        </span>
      </div>
      <div class="tw-mt-6">
        <select v-model="selected" class="select tw-duration-300 tw-shadow tw-border tw-w-full sm:tw-w-1/2 xl:tw-w-5/12 tw-rounded-md tw-py-3 tw-px-4 focus:tw-outline-none">
          <!--        <option v-for="option in $store.data.options" :value="option.value">-->
          <!--          {{ option.text }}-->
          <!--        </option>-->
          <option type="number" value="US">United States</option>
          <option type="number" value="UK">United Kigdom</option>
          <option type="number" value="IT">Italy</option>
          <option type="number" value="CA">Canada</option>
          <option type="number" value="JP">Japan</option>
          <option type="number" value="NO">Norway</option>
          <option type="number" value="BE">Belgium</option>
          <option type="number" value="ES">Spain</option>
          <option type="number" value="TR">Turkey</option>
          <option type="number" value="AU">Australia</option>
        </select>
      </div>
      <button class="tw-text-white tw-mt-6 md:tw-mt-12 tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-px-4 tw-py-1 focus:tw-outline-none" type="submit">
        Reward
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reward',
}
</script>