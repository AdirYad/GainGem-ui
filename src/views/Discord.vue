<template>
  <div class="tw-flex tw-flex-wrap ">
    <div class="tw-bg-secondary tw-w-full md:tw-w-1/3 xl:tw-w-1/4">
      <div class="rewards-list">
        <div class="reward-item">
          <div class="reward reward-discord tw-relative tw-flex tw-justify-center tw-items-center">
            <img src="@/assets/images/rewards/discord.png" alt="Discord">
          </div>
          <div class="reward-details tw-flex tw-items-center tw-px-3 tw-font-medium tw-text-lg lg:tw-text-xl tw-uppercase tw-tracking-wider">
            Discord
          </div>
        </div>
      </div>
    </div>
    <div class="tw-pt-8 md:tw-pt-0 tw-pl-0 md:tw-pl-8 lg:tw-pl-16 tw-flex-col tw-w-full md:tw-w-2/3 xl:tw-w-3/4">
      <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="username">
        Roblux Username
      </label>
      <input id="robux-username" type="text" placeholder="Robux Username"
             class="input tw-duration-300 tw-shadow tw-border tw-rounded-md tw-w-full sm:tw-w-1/2 xl:tw-w-5/12 tw-py-3 tw-px-4 tw-mb-8 focus:tw-outline-none">
      <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="username">
        Select amount to reward
      </label>
      <div clss="tw-flex tw-flex-wrap">
        <select v-model="selected" class="select tw-duration-300 tw-shadow tw-border tw-w-full sm:tw-w-1/2 xl:tw-w-5/12 tw-rounded-md tw-py-3 tw-px-4 focus:tw-outline-none">
          <!--        <option v-for="option in $store.data.options" :value="option.value">-->
          <!--          {{ option.text }}-->
          <!--        </option>-->
          <option disabled value="">Please select one</option>
          <option type="number" value="5">5 Robux</option>
          <option type="number" value="10">10 Robux</option>
          <option type="number" value="15">15 Robux</option>
          <option type="number" value="20">20 Robux</option>
          <option type="number" value="30">30 Robux</option>
          <option type="number" value="40">40 Robux</option>
          <option type="number" value="50">50 Robux</option>
          <option type="number" value="100">100 Robux</option>
          <option type="number" value="200">200 Robux</option>
          <option type="number" value="300">300 Robux</option>
          <option type="number" value="500">500 Robux</option>
        </select>
        <span class="">
          Cost {{ selected*8 }}
        </span>
        <span class="tw-w-full">
          (1 Robux = 8 Points )
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