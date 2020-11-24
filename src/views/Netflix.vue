<template>
  <div class="tw-flex tw-flex-wrap ">
    <div class="tw-bg-secondary tw-w-full md:tw-w-1/3 xl:tw-w-1/4">
      <div class="rewards-list">
        <div class="reward-item">
          <div class="reward reward-netflix tw-relative tw-flex tw-justify-center tw-items-center">
            <img src="@/assets/images/rewards/netflix.png" alt="Netflix">
          </div>
          <div class="reward-details tw-flex tw-items-center tw-px-3 tw-font-medium tw-text-lg lg:tw-text-xl tw-uppercase tw-tracking-wider">
            Netflix
          </div>
        </div>
      </div>
    </div>
    <div class="tw-pt-8 md:tw-pt-0 tw-pl-0 md:tw-pl-8 lg:tw-pl-16 tw-flex-col tw-w-full md:tw-w-2/3 xl:tw-w-3/4">
      <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="select">
        Select amount to reward
      </label>
        <select v-model="selected" class="select tw-duration-300 tw-shadow tw-border tw-w-full sm:tw-w-1/2 xl:tw-w-5/12 tw-rounded-md tw-py-3 tw-px-4 focus:tw-outline-none">
          <!--        <option v-for="option in $store.data.options" :value="option.value">-->
          <!--          {{ option.text }}-->
          <!--        </option>-->
          <option disabled value="">Please select one</option>
          <option type="number" value="15">15$</option>
          <option type="number" value="25">25$</option>
          <option type="number" value="30">30$</option>
          <option type="number" value="60">60$</option>
        </select>
        <span class="">
          Cost {{ selected*1000 }}
        </span>
      <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="select">
        Select amount to reward
      </label>
      <div class="">
        <select v-model="selected" class="select tw-duration-300 tw-shadow tw-border tw-w-full sm:tw-w-1/2 xl:tw-w-5/12 tw-rounded-md tw-py-3 tw-px-4 focus:tw-outline-none">
          <!--        <option v-for="option in $store.data.options" :value="option.value">-->
          <!--          {{ option.text }}-->
          <!--        </option>-->
          <option disabled value="">Please select one</option>
          <option type="number" value="15">15$</option>
          <option type="number" value="25">25$</option>
          <option type="number" value="30">30$</option>
          <option type="number" value="60">60$</option>
        </select>
        <span class="">
          Cost {{ selected*1000 }}
        </span>
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