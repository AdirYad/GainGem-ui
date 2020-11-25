<template>
  <div>
    <div class=" tw-pb-8 tw-bg-secondary">
      <div class="tw-text-center lg:tw-text-left tw-font-medium tw-text-2xl lg:tw-text-3xl tw-uppercase tw-tracking-wider tw-mb-3">
        Rewards
      </div>

      <div class="rewards-list tw-grid">
        <div v-for="(reward, index) in $store.state.rewards" :key="index" @click="reward.stock && expandedReward !== reward ? expandRow(reward) : ''" class="reward-item"
             :class="{ 'extend-row' : expandedReward === reward, 'tw-cursor-pointer' : expandedReward !== reward && reward.stock, 'tw-cursor-not-allowed' : ! reward.stock }">
          <div class="reward tw-relative tw-flex tw-justify-center tw-items-center" :class="`reward-${reward.provider}`">
            <div v-if="! reward.stock" class="tw-absolute badge-failed">
              Out of stock
            </div>
            <button v-if="expandedReward === reward" @click="expandRow(reward)" class="tw-absolute badge-failed">
              Close
            </button>
            <img :src="reward.image" :alt="reward.name">
          </div>
          <div class="reward-details tw-flex tw-justify-between tw-items-center tw-px-3 tw-font-medium tw-text-lg lg:tw-text-xl tw-uppercase tw-tracking-wider">
            {{ reward.name }}

            <button v-if="expandedReward === reward" @click="openModal(reward)" class="tw-border-2 tw-border-primary tw-rounded-full tw-h-8 tw-w-8 tw-text-sm tw-text-primary">
              <fa-icon icon="question" />
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
                <select v-model="payload.value" id="value" class="select tw-duration-300 tw-shadow tw-border tw-w-full tw-rounded-md tw-py-1 tw-px-4 focus:tw-outline-none" style="height: 34px">
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
                <select v-model="payload.country" id="country" class="select tw-duration-300 tw-shadow tw-border tw-w-full tw-rounded-md tw-py-1 tw-px-4 focus:tw-outline-none" style="height: 34px">
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

    <VModal :visible="rewardModal.visible" @closeModal="rewardModal.visible = false">
      <h1>
        {{ rewardModal.name }}
      </h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores distinctio labore maxime suscipit. Accusamus deserunt impedit inventore laboriosam libero? Amet aspernatur at dolores, ea ipsam necessitatibus numquam quae repellendus similique.</p>
    </VModal>
  </div>
</template>

<script>
import VModal from "@/components/VModal";
import { useStore } from "vuex";
import { ref } from 'vue';

export default {
  name: 'Rewards',
  components: {
    VModal,
  },
  setup() {
    const store = useStore();

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