<template>
  <div>
    <div class=" tw-pb-8 tw-bg-secondary">
      <div class="tw-text-center lg:tw-text-left tw-font-medium tw-text-2xl lg:tw-text-3xl tw-uppercase tw-tracking-wider tw-mb-3">
        Rewards
      </div>
      <div class="rewards-list tw-grid">
        <router-link :to="{ name: 'Robux' }" class="reward-item">
          <div class="reward reward-robux tw-relative tw-flex tw-justify-center tw-items-center">
            <div v-if="true" class="tw-absolute badge-failed">
              Out of stock
            </div>
            <img src="@/assets/images/rewards/robux.png" alt="Robux">
          </div>
          <div class="reward-details tw-flex tw-items-center tw-px-3 tw-font-medium tw-text-lg lg:tw-text-xl tw-uppercase tw-tracking-wider">
            Robux
          </div>
        </router-link>
        <router-link :to="{ name: 'Bitcoin' }" class="reward-item">
          <div class="reward reward-bitcoin tw-relative tw-flex tw-justify-center tw-items-center">
            <div v-if="false" class="tw-absolute badge-failed">
              Out of stock
            </div>
            <img src="@/assets/images/rewards/bitcoin.png" alt="Bitcoin">
          </div>
          <div class="reward-details tw-flex tw-flex-col tw-justify-center tw-px-3 tw-font-medium tw-text-lg lg:tw-text-xl tw-uppercase tw-tracking-wider">
            Bitcoin
          </div>
        </router-link>
        <router-link :to="{ name: 'Apple' }" class="reward-item">
          <div class="reward reward-apple tw-relative tw-flex tw-justify-center tw-items-center">
            <div v-if="false" class="tw-absolute badge-failed">
              Out of stock
            </div>
            <img src="@/assets/images/rewards/apple.png" alt="Appstore">
          </div>
          <div class="reward-details tw-flex tw-flex-col tw-justify-center tw-px-3 tw-font-medium tw-text-lg lg:tw-text-xl tw-uppercase tw-tracking-wider">
            App Store
          </div>
        </router-link>
        <router-link :to="{ name: 'Xbox' }" class="reward-item">
          <div class="reward reward-xbox tw-relative tw-flex tw-justify-center tw-items-center">
            <div v-if="false" class="tw-absolute badge-failed">
              Out of stock
            </div>
            <img src="@/assets/images/rewards/xbox.png" alt="XBOX">
          </div>
          <div class="reward-details tw-flex tw-flex-col tw-justify-center tw-px-3 tw-font-medium tw-text-lg lg:tw-text-xl tw-uppercase tw-tracking-wider">
            XBOX
          </div>
        </router-link>
        <router-link :to="{ name: 'Roblox' }" class="reward-item">
          <div class="reward reward-roblox tw-relative tw-flex tw-justify-center tw-items-center">
            <div v-if="false" class="tw-absolute badge-failed">
              Out of stock
            </div>
            <img src="@/assets/images/rewards/roblox.png" alt="Roblox Giftcard">
          </div>
          <div class="reward-details tw-flex tw-flex-col tw-justify-center tw-px-3 tw-font-medium tw-text-lg lg:tw-text-xl tw-uppercase tw-tracking-wider">
            Roblox Giftcard
          </div>
        </router-link>
        <router-link :to="{ name: 'Psn' }" class="reward-item">
          <div class="reward reward-psn tw-relative tw-flex tw-justify-center tw-items-center">
            <div v-if="false" class="tw-absolute badge-failed">
              Out of stock
            </div>
            <img src="@/assets/images/rewards/psn.png" alt="PSN">
          </div>
          <div class="reward-details tw-flex tw-flex-col tw-justify-center tw-px-3 tw-font-medium tw-text-lg lg:tw-text-xl tw-uppercase tw-tracking-wider">
            PSN
          </div>
        </router-link>
        <router-link :to="{ name: 'Googleplay' }" class="reward-item">
          <div class="reward reward-googleplay tw-relative tw-flex tw-justify-center tw-items-center">
            <div v-if="false" class="tw-absolute badge-failed">
              Out of stock
            </div>
            <img src="@/assets/images/rewards/googleplay.png" alt="Google play">
          </div>
          <div class="reward-details tw-flex tw-flex-col tw-justify-center tw-px-3 tw-font-medium tw-text-lg lg:tw-text-xl tw-uppercase tw-tracking-wider">
            Google play
          </div>
        </router-link>
        <router-link :to="{ name: 'Netflix' }" class="reward-item">
          <div class="reward reward-netflix tw-relative tw-flex tw-justify-center tw-items-center">
            <div v-if="false" class="tw-absolute badge-failed">
              Out of stock
            </div>
            <img src="@/assets/images/rewards/netflix.png" alt="Netflix">
          </div>
          <div class="reward-details tw-flex tw-flex-col tw-justify-center tw-px-3 tw-font-medium tw-text-lg lg:tw-text-xl tw-uppercase tw-tracking-wider">
            Netflix
          </div>
        </router-link>
        <router-link :to="{ name: 'Spotify' }" class="reward-item">
          <div class="reward reward-spotify tw-relative tw-flex tw-justify-center tw-items-center">
            <div v-if="false" class="tw-absolute badge-failed">
              Out of stock
            </div>
            <img src="@/assets/images/rewards/spotify.png" alt="Spotify">
          </div>
          <div class="reward-details tw-flex tw-flex-col tw-justify-center tw-px-3 tw-font-medium tw-text-lg lg:tw-text-xl tw-uppercase tw-tracking-wider">
            Spotify
          </div>
        </router-link>
        <router-link :to="{ name: 'Discord' }" class="reward-item">
          <div class="reward reward-discord tw-relative tw-flex tw-justify-center tw-items-center">
            <div v-if="false" class="tw-absolute badge-failed">
              Out of stock
            </div>
            <img src="@/assets/images/rewards/discord.png" alt="Discord">
          </div>
          <div class="reward-details tw-flex tw-flex-col tw-justify-center tw-px-3 tw-font-medium tw-text-lg lg:tw-text-xl tw-uppercase tw-tracking-wider">
            Discord
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rewards',
}
</script>