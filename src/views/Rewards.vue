<template>
  <div>
    <div id="rewards" class="tw-pb-8 tw-bg-secondary">
      <div class="tw-text-center lg:tw-text-left tw-font-medium tw-text-2xl lg:tw-text-3xl tw-uppercase tw-tracking-wider tw-mb-3">
        Rewards
      </div>

      <div class="rewards-list tw-grid">
        <div v-for="(reward, index) in rewards" :key="index" @click="reward.stock && expandedReward !== reward ? expandRow(reward) : ''" class="reward-item"
             :class="{ 'extend-row' : expandedReward === reward, 'tw-cursor-pointer' : expandedReward !== reward && reward.stock, 'tw-cursor-not-allowed' : ! reward.stock }">
          <div class="reward tw-relative tw-flex tw-justify-center tw-items-center" :class="`reward-${reward.provider}`">
            <div v-if="! reward.stock" class="tw-absolute badge-failed">
              Out of stock
            </div>
            <button v-if="expandedReward === reward" @click="expandRow(reward)" class="tw-absolute badge-failed tw-z-10">
              Close
            </button>
            <img :src="reward.image" :alt="reward.name">
          </div>
          <div class="reward-details tw-flex tw-justify-between tw-items-center tw-px-3 tw-font-medium tw-text-lg lg:tw-text-xl tw-uppercase tw-tracking-wider">
            {{ reward.name }}

            <button v-if="expandedReward === reward" @click="openModal(reward)" class="tw-border-2 tw-border-primary tw-rounded-full tw-h-8 tw-w-8 tw-text-sm tw-text-primary">
              <fa-icon icon="exclamation" />
            </button>
          </div>
          <div v-if="expandedReward === reward" class="tw-flex tw-flex-col tw-justify-end tw-px-3 tw-pb-3" style="height: 200px; margin-top: 20px;">
            <span class="tw-flex tw-mb-1 tw-text-xs">
              Cost
              <span class="tw-truncate tw-inline-block tw-mx-1" style="max-width: 90px">
                {{ expandedReward.provider !== 'robux' ? payload.value * 1000 : payload.value || 0 }}
              </span>
              points
            </span>
            <div v-if="expandedReward.provider === 'bitcoin' || expandedReward.provider === 'robux'" class="tw-w-full tw-mb-4">
              <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="destination">
                {{ expandedReward.provider === 'robux' ? 'Roblox Username' : 'Wallet Address' }}
              </label>
              <input v-model="payload.destination" id="destination" type="text" :placeholder="expandedReward.provider === 'robux' ? 'Roblox Username' : 'Wallet Address'"
                     class="input tw-duration-300 tw-shadow tw-border tw-rounded-md tw-w-full tw-py-1 tw-px-4 focus:tw-outline-none">
            </div>
            <div class="tw-w-full tw-mb-4">
              <template v-if="expandedReward.options">
                <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="value">
                  Select Amount
                </label>
                <select v-model="payload.value" id="value" class="select tw-duration-300 tw-shadow tw-border tw-w-full tw-rounded-md tw-py-1 tw-px-4 tw-text-gray-500 focus:tw-outline-none" style="height: 34px">
                  <option v-for="(option, index) in expandedReward.options" :key="index" :value="option" :selected="index === 0">
                    ${{ option }}
                  </option>
                </select>
              </template>
              <template v-else>
                <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="amount">
                  Robux Amount
                </label>
                <input v-model="payload.value" id="amount" type="number" placeholder="Amount"
                       onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                       class="input tw-duration-300 tw-shadow tw-border tw-rounded-md tw-w-full tw-py-1 tw-px-4 focus:tw-outline-none">
              </template>
            </div>
            <div v-if="expandedReward.countries" class="tw-w-full tw-mb-4">
                <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="country">
                  Select Country
                </label>
                <select v-model="payload.country" id="country" class="select tw-duration-300 tw-shadow tw-border tw-w-full tw-rounded-md tw-py-1 tw-px-4 tw-text-gray-500 focus:tw-outline-none" style="height: 34px">
                  <option v-for="(country, index) in expandedReward.countries" :key="index" :value="country" :selected="index === 0">
                    {{ country }}
                  </option>
                </select>
            </div>
            <button @click="redeem" class="tw-text-white tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-w-full tw-py-1" type="button">
              Redeem Reward
            </button>
          </div>
        </div>
      </div>
    </div>

    <VModal v-model:visible="rewardModal.visible">
      <h1>
        {{ rewardModal.provider === 'robux' || rewardModal.provider === 'bitcoin' ? rewardModal.name : rewardModal.name + ' Gift Cards' }}
      </h1>

      <p>
        {{ rewardModal.modal.name }} is <strong>NOT</strong> affiliated with EzRewards.
        <template v-if="rewardModal.modal.redeemAlert">
          <br>
          <div v-html="rewardModal.modal.redeemAlert" />
        </template>
      </p>

      <template v-if="rewardModal.modal.ul">
        <strong>
          <template v-if="rewardModal.provider === 'robux' || rewardModal.provider === 'bitcoin'">
            How to claim {{ rewardModal.name }}:
          </template>
          <template v-else>
            How to redeem {{ rewardModal.name }} Gift Cards:
          </template>
        </strong>
        <ul class="tw-list-disc tw-pl-8 tw-mb-4">
          <li v-for="(li, index) in rewardModal.modal.ul" :key="index" v-html="li" />
        </ul>
      </template>
      <template v-else-if="rewardModal.modal.text">
        <div v-html="rewardModal.modal.text" class="tw-mb-4" />
      </template>

      <p v-if="rewardModal.provider === 'apple'">
        <a class="tw-text-primary" href="https://support.apple.com/en-us/HT211163" target="_blank">Click Here</a> to learn more about how to redeem your Apple Gift Card code.
      </p>

      <div class="tw-text-xs md:tw-text-sm">
        <template v-if="rewardModal.provider === 'robux'">
          * There are no refunds once a code is claimed so please make sure you claim the
          correct code!
        </template>
        <template v-else>
          * There are no refunds once robux is claimed so please make sure you entered the
          correct username!
        </template>
      </div>
    </VModal>
  </div>
</template>

<script>
import { Rewards } from "@/_helpers/rewards";
import VModal from "@/components/VModal";
import { useStore } from "vuex";
import { ref, reactive } from 'vue';

export default {
  name: 'Rewards',
  components: {
    VModal,
  },
  setup() {
    const store = useStore();

    const rewards = reactive(Rewards);

    const expandedReward = ref({});
    const rewardModal = ref({
      visible: false
    });

    const payload = ref({
      value: null,
      destination: '',
      country: null,
    });

    const expandRow = (reward) => {
      if (expandedReward.value === reward) {
        setTimeout(() => {
          expandedReward.value = {};
        }, 0);
        return;
      }

      const el = document.getElementById('rewards');

      if (window.innerWidth < 1024) {
        el.style.marginTop = 'calc(var(--navigation-height)*-1 + 2px)';
        el.style.paddingTop = 'var(--navigation-height)';
      }

      el.scrollIntoView({behavior: "smooth"});

      el.style.marginTop = '';
      el.style.paddingTop = '';

      expandedReward.value = reward;

      if (expandedReward.value.provider !== 'robux') {
        expandedReward.value.options = [
          5,
          10,
          25
        ];

        if (expandedReward.value.provider !== 'bitcoin' && expandedReward.value.provider !== 'googleplay') {
          expandedReward.value.countries = [
            'United States',
            'United Kingdom',
            'Russian Federation',
            'United States',
            'United Kingdom',
            'Russian Federation',
            'United States',
            'United Kingdom',
            'Russian Federation',
            'United States',
            'United Kingdom',
            'Russian Federation',
          ];
        }
      }

      payload.value.value = expandedReward.value.options ? expandedReward.value.options[0] : null;
      payload.value.country = expandedReward.value.countries ? expandedReward.value.countries[0] : null;
    }

    const redeem = () => {
      console.log(payload.value);
      console.log(expandedReward.value)
    }

    const openModal = (reward) => {
      reward.visible = true;
      rewardModal.value = reward;
    }

    return {
      rewards,
      payload,
      expandedReward,
      rewardModal,
      redeem,
      expandRow,
      openModal,
    }
  }
}
</script>

<style scoped>
.extend-row {
  grid-row: 1 / 3;
}
</style>