<template>
  <div>
    <div id="rewards" class="tw-pb-8 tw-bg-secondary">
      <div class="tw-text-center lg:tw-text-left tw-font-medium tw-text-2xl lg:tw-text-3xl tw-uppercase tw-tracking-wider tw-mb-3">
        Rewards
      </div>

      <div class="rewards-list tw-grid">
        <div v-for="(reward, index) in $store.state.rewards" :key="index" @click="reward.stock && expandedReward !== reward ? expandRow(reward) : ''" class="reward-item"
             :class="{ 'extend-row' : expandedReward === reward, 'tw-cursor-pointer' : expandedReward !== reward && reward.stock && rewards, 'tw-cursor-not-allowed' : ! reward.stock }">
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
            <span v-if="pointsValue || expandedReward.provider === 'robux'" class="tw-flex tw-mb-1 tw-text-xs">
              Cost
              <span class="tw-truncate tw-inline-block tw-mx-1" style="max-width: 90px">
                {{ expandedReward.provider !== 'robux' ? payload.value * pointsValue : payload.value || 0 }}
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
                  <template v-for="(option, index) in expandedReward.options" :key="option.country + index">
                    <option v-if="option.country === payload.country" :value="option.value" :selected="index === 0">
                      ${{ option.value }}
                    </option>
                  </template>
                </select>
              </template>
              <template v-else>
                <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="amount">
                  Robux Amount
                </label>
                <input v-model="payload.value" id="amount" type="number" min="1" :max="expandedReward.stock > 5000 ? 5000 : expandedReward.stock" placeholder="Amount"
                       onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                       class="input tw-duration-300 tw-shadow tw-border tw-rounded-md tw-w-full tw-py-1 tw-px-4 focus:tw-outline-none">
              </template>
            </div>
            <div v-if="expandedReward.countries && (expandedReward.countries.length > 1 || expandedReward.countries.length === 1 && expandedReward.countries[0] !== null)" class="tw-w-full tw-mb-4">
                <label class="tw-text-primary tw-block tw-text-gray-700 tw-text-sm tw-font-bold tw-mb-2" for="country">
                  Select Country
                </label>
                <select v-model="payload.country" @change="changedCountry" id="country" class="select tw-duration-300 tw-shadow tw-border tw-w-full tw-rounded-md tw-py-1 tw-px-4 tw-text-gray-500 focus:tw-outline-none" style="height: 34px">
                  <option v-for="(country, index) in expandedReward.countries" :key="index" :value="country" :selected="index === 0">
                    {{ country === null ? 'International' : country }}
                  </option>
                </select>
            </div>
            <button v-if="! confirmation" @click="confirmation = true" class="tw-text-white tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-w-full tw-py-1" type="button">
              Redeem Reward
            </button>
            <div v-else class="tw-flex">
              <div class="tw-w-1/2 tw-pr-1">
                <button @click="redeem" class="tw-text-white tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-w-full tw-py-1" type="button">
                  Confirm
                </button>
              </div>
              <div class="tw-w-1/2 tw-pl-1">
                <button @click="confirmation = false" class="tw-text-white tw-uppercase tw-border tw-border-red-500 tw-bg-red-500 tw-rounded-full tw-w-full tw-py-1" type="button">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <VModal v-model:visible="modal.visible">
      <template v-if="modal.group_id">
        <h1>
          Last part before claiming your robux
        </h1>

        <p>
          Please join
          <a :href="`https://www.roblox.com/groups/${modal.group_id}`" target="_blank" class="tw-text-primary">this group</a>
          first then hit OK button.
        </p>

        <div class="tw-flex">
          <div class="tw-w-1/2 tw-pr-1">
            <button @click="modal.visible = false; redeem()" class="tw-text-white tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-w-full tw-py-1" type="button">
              Ok
            </button>
          </div>

          <div class="tw-w-1/2 tw-pl-1">
            <button @click="modal.visible = false" class="tw-text-white tw-uppercase tw-border tw-border-red-500 tw-bg-red-500 tw-rounded-full tw-w-full tw-py-1" type="button">
              Cancel
            </button>
          </div>
        </div>
      </template>
      <template v-else-if="modal.code">
        <h1>
          {{ modal.formatted_provider }}
        </h1>

        <p>
          Thank you for claiming a ${{ modal.value }} {{ modal.formatted_provider }} Gift Card. Please click on the button below to unleash your code.
        </p>

        <p v-if="modal.codeVisibility" class="tw-text-primary tw-font-bold tw-text-center tw-break-all tw-text-xl md:tw-text-2xl">
          {{ modal.code }}
        </p>
        <p v-else @click="modal.codeVisibility = true" class="tw-text-primary tw-font-bold tw-text-center tw-text-xl md:tw-text-2xl tw-cursor-pointer">
          Click to show
        </p>

        <div class="tw-flex tw-justify-center tw-items-center tw-flex-wrap tw-text-center">
          <a :href="`https://www.facebook.com/sharer/sharer.php?u=${link}`" target="_blank" class="social-button bg-facebook tw-relative tw-text-sm md:tw-text-base tw-text-white tw-rounded-full tw-px-4 md:tw-px-6 tw-py-1 tw-mx-2 tw-mt-2">
            <fa-icon class="social-icon" :icon="['fab', 'facebook-f']" />
            Share on facebook
          </a>
          <a :href="`https://twitter.com/intent/tweet?text=I just redeemed a ${modal.formatted_provider} gift card at EzRewards.gg!&url=${link}`" target="_blank" class="social-button bg-twitter tw-relative tw-text-sm md:tw-text-base tw-text-white tw-rounded-full tw-px-4 md:tw-px-6 tw-py-1 tw-mx-2 tw-mt-2">
            <fa-icon class="social-icon" :icon="['fab', 'twitter']" />
            Share on Twitter
          </a>
          <a :href="`https://reddit.com/submit?title=I just redeemed a ${modal.formatted_provider} gift card at EzRewards.gg!`" target="_blank" class="social-button bg-reddit tw-relative tw-text-sm md:tw-text-base tw-text-white tw-rounded-full tw-px-4 md:tw-px-6 tw-py-1 tw-mx-2 tw-mt-2">
            <fa-icon class="social-icon" :icon="['fab', 'reddit-alien']" />
            Share on Reddit
          </a>
        </div>
      </template>
      <template v-else>
        <h1>
          {{ modal.provider === 'robux' || modal.provider === 'bitcoin' ? modal.name : modal.name + ' Gift Cards' }}
        </h1>

        <p>
          {{ modal.modal.name }} is <strong>NOT</strong> affiliated with EzRewards.
          <template v-if="modal.modal.redeemAlert">
            <br>
            <div v-html="modal.modal.redeemAlert" />
          </template>
        </p>

        <template v-if="modal.modal.ul">
          <strong>
            <template v-if="modal.provider === 'robux' || modal.provider === 'bitcoin'">
              How to claim {{ modal.name }}:
            </template>
            <template v-else>
              How to redeem {{ modal.name }} Gift Cards:
            </template>
          </strong>
          <ul class="tw-list-disc tw-pl-8 tw-mb-4">
            <li v-for="(li, index) in modal.modal.ul" :key="index" v-html="li" />
          </ul>
        </template>
        <template v-else-if="modal.modal.text">
          <div v-html="modal.modal.text" class="tw-mb-4" />
        </template>

        <p v-if="modal.provider === 'apple'">
          <a class="tw-text-primary" href="https://support.apple.com/en-us/HT211163" target="_blank">Click Here</a> to learn more about how to redeem your Apple Gift Card code.
        </p>

        <div class="tw-text-xs md:tw-text-sm">
          <template v-if="modal.provider === 'robux'">
            * There are no refunds once a code is claimed so please make sure you claim the
            correct code!
          </template>
          <template v-else>
            * There are no refunds once robux is claimed so please make sure you entered the
            correct username!
          </template>
        </div>
      </template>
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

    const link = ref(window.location.origin);
    const confirmation = ref(false);
    const isRedeeming = ref(false);
    const pointsValue = ref(null);
    const rewards = ref(null);
    const expandedReward = ref({});
    const modal = ref({
      visible: false
    });

    const payload = ref({
      country: null,
      provider: null,
      value: null,
      destination: null,
    });

    store.dispatch('getPointsValue').then((response) => {
      pointsValue.value = response.data;
    });

    getRewards();

    return {
      link,
      confirmation,
      isRedeeming,
      pointsValue,
      rewards,
      expandedReward,
      modal,
      payload,
      redeem,
      expandRow,
      changedCountry,
      openModal,
    }

    function removeDuplicates(array, prop) {
      return array.filter((item, index, self) => self.findIndex((value) => value[prop] === item[prop]) === index);
    }

    function getRewards() {
      store.dispatch('getRewards').then((response) => {
        rewards.value = response.data;

        store.state.rewards.forEach((reward) => {
          if (reward.provider === 'robux') {
            reward.stock = rewards.value.robux;
            return;
          } else if (reward.provider === 'bitcoin') {
            reward.options = reward.options.filter((option) => option.value <= rewards.value.bitcoin);
            reward.stock = reward.options.length ? rewards.value.bitcoin : 0;
            return;
          }

          reward.stock = rewards.value.gift_cards[reward.provider];

          if (reward.stock) {
            reward.countries = removeDuplicates(reward.stock, 'country').map((stock) => stock.country);
            reward.options = reward.stock.sort((item, value) => item.value - value.value);
          }
        });
      });
    }

    function expandRow(reward) {
      if (! rewards.value) {
        store.dispatch('addNotification', {
          type: 'info',
          message: 'Try again in a few moments',
        });

        return;
      }

      if (isRedeeming.value) {
        return;
      }

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

      confirmation.value = false;
      payload.value.destination = null;
      payload.value.provider = expandedReward.value.provider;
      payload.value.country = expandedReward.value.countries ? expandedReward.value.countries[0] : null;
      payload.value.value = expandedReward.value.options ? expandedReward.value.options[0].value : null;

      if (expandedReward.value.options && expandedReward.value.provider !== 'bitcoin') {
        changedCountry();
      }
    }

    function redeem() {
      if (isRedeeming.value) {
        return;
      }

      let errorMessage = '';

      if (! payload.value.value) {
        errorMessage = 'You must enter an amount!';
      } else if (payload.value.value < 1) {
        errorMessage = 'The amount has to be greater than 0.';
      } else if (payload.value.provider === 'robux') {
        if (expandedReward.value.stock > 5000 && payload.value.value > 5000 || expandedReward.value.stock <= 5000 && payload.value.value > expandedReward.value.stock) {
          errorMessage = `The amount may not be greater than ${expandedReward.value.stock > 5000 ? 5000 : expandedReward.value.stock}.`;
        } else if (! payload.value.destination) {
          errorMessage = 'You must enter a username!';
        } else if (payload.value.destination.length < 2) {
          errorMessage = 'The username must be at least 2 characters.';
        } else if (payload.value.destination.length > 255) {
          errorMessage = 'The username may not be greater than 255 characters.';
        }
      } else if (payload.value.value > 5000) {
        errorMessage = 'The amount may not be greater than 5000.';
      } else if (payload.value.provider === 'bitcoin') {
        if (! payload.value.destination) {
          errorMessage = 'You must enter a wallet!';
        } else if (payload.value.destination.length < 2) {
          errorMessage = 'The wallet must be at least 2 characters.';
        } else if (payload.value.destination.length > 255) {
          errorMessage = 'The wallet may not be greater than 255 characters.';
        }
      }

      if (errorMessage) {
        store.dispatch('addNotification', {
          type: 'error',
          message: errorMessage,
        });

        return;
      }

      isRedeeming.value = true;

      store.dispatch('redeemReward', payload.value).then((response) => {
        confirmation.value = false;
        isRedeeming.value = false;

        getRewards();

        store.commit('setUser', response.data);

        if (response.data.gift_card) {
          response.data.gift_card.visible = true;
          response.data.gift_card.formatted_provider = expandedReward.value.name.toString();
          modal.value = response.data.gift_card;
        } else {
          store.dispatch('addNotification', {
            type: 'success',
            message: "You've successfully claimed your reward!"
          });
        }

        expandedReward.value = {};
      }).catch((err) => {
        confirmation.value = false;
        isRedeeming.value = false;

        if (err.response.status === 422) {
          store.dispatch('addNotification', {
            type: 'error',
            message: err.response.data.message,
          });
        } else if (err.response.status === 404) {
          err.response.data.visible = true;
          modal.value = err.response.data;
        }
      });
    }

    function changedCountry() {
      payload.value.value = expandedReward.value.stock.find((item) => item.country === payload.value.country).value;
    }

    function openModal(reward) {
      reward.visible = true;
      modal.value = reward;
    }
  }
}
</script>

<style scoped>
.extend-row {
  grid-row: 1 / 3;
}
</style>