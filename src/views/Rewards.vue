<template>
  <div>
    <div class=" tw-pb-8 tw-bg-secondary">
      <div class="tw-text-primary tw-mb-4 md:tw-mb-2 tw-text-2xl sm:tw-text-3x lg:tw-text-4xl tw-font-thin tw-uppercase tw-tracking-wider">
        Rewards
      </div>
      <div class="rewards-list tw-grid">
        <router-link :to="{ name: 'Home' }" class="reward-item">
          <div class="reward reward-robux tw-flex tw-justify-center tw-items-center">
            <img src="@/assets/images/rewards/robux.png" alt="Robux">
          </div>
          <div class="reward-details tw-flex tw-flex-col tw-justify-between tw-p-4 tw-py-5">
            <div class="tw-font-medium tw-text-lg lg:tw-text-xl tw-uppercase tw-tracking-wider">
              Robux
            </div>
            <div class="tw-text-sm tw-flex" :class="{ 'tw-text-red-500' : true, 'tw-text-green-500' : false }">
              <template v-if="true">
                You need 40 more points
              </template>
              <template v-else>
                You can purchase rewards
              </template>
            </div>
          </div>
        </router-link>
        <router-link :to="{ name: 'Home' }" class="reward-item">
          <div class="reward reward-bitcoin tw-flex tw-justify-center tw-items-center">
            <img src="@/assets/images/rewards/bitcoin.png" alt="Bitcoin">
          </div>
          <div class="reward-details tw-flex tw-flex-col tw-justify-between tw-p-4 tw-py-5">
            <div class="tw-font-medium tw-text-lg lg:tw-text-xl tw-uppercase tw-tracking-wider">
              Bitcoin
            </div>
            <div class="tw-text-sm tw-flex" :class="{ 'tw-text-red-500' : true, 'tw-text-green-500' : false }">
              <template v-if="true">
                You need 40 more points
              </template>
              <template v-else>
                You can purchase rewards
              </template>
            </div>
          </div>
        </router-link>
        <router-link :to="{ name: 'Home' }" class="reward-item">
          <div class="reward reward-apple tw-flex tw-justify-center tw-items-center">
            <img src="@/assets/images/rewards/apple.png" alt="Appstore">
          </div>
          <div class="reward-details tw-flex tw-flex-col tw-justify-between tw-p-4 tw-py-5">
            <div class="tw-font-medium tw-text-lg lg:tw-text-xl tw-uppercase tw-tracking-wider">
              App Store
            </div>
            <div class="tw-text-sm tw-flex" :class="{ 'tw-text-red-500' : true, 'tw-text-green-500' : false }">
              <template v-if="true">
                You need 40 more points
              </template>
              <template v-else>
                You can purchase rewards
              </template>
            </div>
          </div>
        </router-link>
        <router-link :to="{ name: 'Home' }" class="reward-item">
          <div class="reward reward-xbox tw-flex tw-justify-center tw-items-center">
            <img src="@/assets/images/rewards/xbox.png" alt="XBOX">
          </div>
          <div class="reward-details tw-flex tw-flex-col tw-justify-between tw-p-4 tw-py-5">
            <div class="tw-font-medium tw-text-lg lg:tw-text-xl tw-uppercase tw-tracking-wider">
              XBOX
            </div>
            <div class="tw-text-sm tw-flex" :class="{ 'tw-text-red-500' : true, 'tw-text-green-500' : false }">
              <template v-if="true">
                You need 40 more points
              </template>
              <template v-else>
                You can purchase rewards
              </template>
            </div>
          </div>
        </router-link>
        <router-link :to="{ name: 'Home' }" class="reward-item">
          <div class="reward reward-roblox tw-flex tw-justify-center tw-items-center">
            <img src="@/assets/images/rewards/roblox.png" alt="Roblox Giftcard">
          </div>
          <div class="reward-details tw-flex tw-flex-col tw-justify-between tw-p-4 tw-py-5">
            <div class="tw-font-medium tw-text-lg lg:tw-text-xl tw-uppercase tw-tracking-wider">
              Roblox Giftcard
            </div>
            <div class="tw-text-sm tw-flex" :class="{ 'tw-text-red-500' : true, 'tw-text-green-500' : false }">
              <template v-if="true">
                You need 40 more points
              </template>
              <template v-else>
                You can purchase rewards
              </template>
            </div>
          </div>
        </router-link>
        <router-link :to="{ name: 'Home' }" class="reward-item">
          <div class="reward reward-psn tw-flex tw-justify-center tw-items-center">
            <img src="@/assets/images/rewards/psn.png" alt="PSN">
          </div>
          <div class="reward-details tw-flex tw-flex-col tw-justify-between tw-p-4 tw-py-5">
            <div class="tw-font-medium tw-text-lg lg:tw-text-xl tw-uppercase tw-tracking-wider">
              PSN
            </div>
            <div class="tw-text-sm tw-flex" :class="{ 'tw-text-red-500' : true, 'tw-text-green-500' : false }">
              <template v-if="true">
                You need 40 more points
              </template>
              <template v-else>
                You can purchase rewards
              </template>
            </div>
          </div>
        </router-link>
        <router-link :to="{ name: 'Home' }" class="reward-item">
          <div class="reward reward-googleplay tw-flex tw-justify-center tw-items-center">
            <img src="@/assets/images/rewards/googleplay.png" alt="Googleplay">
          </div>
          <div class="reward-details tw-flex tw-flex-col tw-justify-between tw-p-4 tw-py-5">
            <div class="tw-font-medium tw-text-lg lg:tw-text-xl tw-uppercase tw-tracking-wider">
              Googleplay
            </div>
            <div class="tw-text-sm tw-flex" :class="{ 'tw-text-red-500' : true, 'tw-text-green-500' : false }">
              <template v-if="true">
                You need 40 more points
              </template>
              <template v-else>
                You can purchase rewards
              </template>
            </div>
          </div>
        </router-link>
        <router-link :to="{ name: 'Home' }" class="reward-item">
          <div class="reward reward-netflix tw-flex tw-justify-center tw-items-center">
            <img src="@/assets/images/rewards/netflix.png" alt="Netflix">
          </div>
          <div class="reward-details tw-flex tw-flex-col tw-justify-between tw-p-4 tw-py-5">
            <div class="tw-font-medium tw-text-lg lg:tw-text-xl tw-uppercase tw-tracking-wider">
              Netflix
            </div>
            <div class="tw-text-sm tw-flex" :class="{ 'tw-text-red-500' : true, 'tw-text-green-500' : false }">
              <template v-if="true">
                You need 40 more points
              </template>
              <template v-else>
                You can purchase rewards
              </template>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Offerwall',
}
</script>