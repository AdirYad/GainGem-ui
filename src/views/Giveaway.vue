<template>
  <div class="tw-text-center">
    <div class="tw-text-center lg:tw-text-left tw-font-medium tw-text-2xl lg:tw-text-3xl tw-uppercase tw-tracking-wider tw-mb-4">
      Giveaway
    </div>

    <div class="tw-p-6 tw-bg-white tw-rounded-sm tw-shadow">
      <div class="tw-text-xl tw-text-primary tw-flex tw-justify-around tw-items-center">
        <button class="hover:tw-text-secondary tw-text-primary tw-uppercase tw-text-sm tw-tracking-wider tw-font-bold tw-duration-300 tw-border-2 tw-border-primary hover:tw-bg-primary tw-rounded-full tw-px-4 md:tw-px-6 tw-py-2 md:tw-py-3">
          Enter Giveaway
        </button>
        <div>
          <div class="tw-flex tw-rounded-lg tw-border-2 tw-border-primary tw-text-center tw-p-2">
            00 :
            59 :
            59
          </div>
        </div>
          <div>
            <div class="tw-text-2xl tw-uppercase tw-tracking-wider tw-font-bold">
              13 points
            </div>
            <div class="tw-text-sm tw-tracking-wider tw-font-thin">
              Winning Amount
            </div>
        </div>
        <div class="tw-text-2xl tw-uppercase tw-tracking-wider tw-font-thin tw-flex tw-items-center">
         15 Users Entered
        </div>
      </div>
    </div>

    <div class="tw-inline-block tw-w-full md:tw-w-1/2 xl:tw-w-1/3 tw-border-t-2 tw-border-primary tw-shadow-md tw-px-2 tw-pt-4 tw-mt-8">
      <div class="tw-text-left tw-text-xl tw-uppercase tw-flex tw-justify-between tw-tracking-wider tw-mx-2">
        <div>Recent Entries</div>
        <fa-icon :icon="['far', 'clock']" />
      </div>
      <div v-for="(item, index) in 10" :class="{ 'tw-border-b' : index !== 9 }" class="body-ga tw-border-primary tw-flex tw-justify-between tw-py-3 tw-mx-2">
        <div>
          -image- userName
        </div>
        <div>
          52s ago
        </div>
      </div>
    </div>

    <div class="tw-inline-block tw-w-full md:tw-w-1/2 xl:tw-w-1/3 tw-border-t-2 tw-border-primary tw-shadow-md xl:tw-ml-2 tw-px-2 tw-pt-4 tw-mt-8">
      <div class="tw-text-left tw-text-xl tw-uppercase tw-flex tw-justify-between tw-tracking-wider tw-mx-2">
        <div>Previous Winners</div>
        <div class="tw-w-1/3 tw-flex tw-justify-around">
          <fa-icon icon="coins" />
          <fa-icon :icon="['far', 'clock']" />
        </div>
      </div>
      <div v-for="(item, index) in 10" :class="{ 'tw-border-b' : index !== 9 }" class="body-ga tw-border-primary tw-flex tw-justify-between tw-py-3 tw-mx-2">
        <div>
          -image- userName
        </div>
        <div class="tw-w-1/3 tw-flex tw-justify-around">
          <div>
            11 p$
          </div>
          <div>
            3h ago
          </div>
        </div>
      </div>
    </div>

    <div class="tw-text-primary tw-font-medium tw-text-2xl lg:tw-text-3xl tw-uppercase tw-tracking-wider tw-my-4 lg:tw-my-8">
      How does it work?
    </div>
    <div class="tw-flex tw-justify-center tw-flex-wrap">
      <div class="affiliate-description-card tw-w-full tw-flex tw-flex-col tw-items-center tw-w-full xl:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mx-4">
        <div class="tw-flex tw-justify-center tw-items-center tw-w-12 tw-h-12 tw-border-2 tw-border-primary tw-rounded-full tw-text-2xl">
          1
        </div>
        <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mt-10 tw-mb-4">
          SHARE IT WITH FRIENDS
        </div>
        <div class="tw-text-sm tw-mb-2">
          Share your referral link with your friends in order to attract new users to EzRewards.
        </div>
        <div class="tw-text-sm tw-mb-2">
          On each user you refer, you'll receive 10% on his earnings.
        </div>
      </div>

      <div class="affiliates-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" viewBox="0 0 512 512">
          <path id="arrow" d="M32.017,443.987l80.255-187.5L32.017,68.985,480,256.485Z"></path>
        </svg>
      </div>

      <div class="affiliate-description-card tw-w-full tw-flex tw-flex-col tw-items-center tw-w-full xl:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mx-4">
        <div class="tw-flex tw-justify-center tw-items-center tw-w-12 tw-h-12 tw-border-2 tw-border-primary tw-rounded-full tw-text-2xl">
          2
        </div>
        <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mt-10 tw-mb-4">
          Receive Points
        </div>
        <div class="tw-text-sm tw-mb-2">
          Once someone signed up on our EzRewards using your referral link and completes an offer, you'll receive your points.
        </div>
      </div>

      <div class="affiliates-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" viewBox="0 0 512 512">
          <path id="arrow" d="M32.017,443.987l80.255-187.5L32.017,68.985,480,256.485Z"></path>
        </svg>
      </div>

      <div class="affiliate-description-card tw-w-full tw-flex tw-flex-col tw-items-center tw-w-full xl:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mx-4">
        <div class="tw-flex tw-justify-center tw-items-center tw-w-12 tw-h-12 tw-border-2 tw-border-primary tw-rounded-full tw-text-2xl">
          3
        </div>
        <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mt-10 tw-mb-4">
          GET REWARDS
        </div>
        <div class="tw-text-sm tw-mb-2">
          Once you've earned enough points, you can redeem them for many gifts!
        </div>
        <div class="tw-text-sm tw-mb-2">
          More friends means more revenue and more generated revenue increasing your commission.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {
  name: 'Invite',
  setup() {
    const store = useStore();

    const referral = ref(null);
    const inviteLink = ref(`${window.location.origin}/?ref_id=${store.state.user.referral_token}`);

    const selectText = (element) => {
      let range;
      if (document.selection) {
        range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
      } else if (window.getSelection) {
        range = document.createRange();
        range.selectNode(element);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      }
    }

    const unselectText = () => {
      if (document.selection) {
        document.selection.empty();
      } else if (window.getSelection) {
        window.getSelection().removeAllRanges();
      }
    }

    const copyInviteLink = () => {
      selectText(referral.value);
      document.execCommand('copy');
      unselectText();

      store.dispatch('addNotification', {
        type: 'success',
        message: `Copied referral link to clipboard`
      });
    }

    return {
      referral,
      inviteLink,
      copyInviteLink,
    }
  }
}
</script>

<style scoped>
.affiliates-arrow {
  max-width: 100px;
  fill: var(--primary-color);

  @apply flex justify-center items-center;

  svg {
    max-width: 100%;
    height: auto;
  }
}

@media (min-width: 1024px) {
  .affiliate-description-card {
    max-width: 300px;
  }

  .affiliate-description-card {
    flex: 3;
  }

  .affiliates-arrow {
    flex: 1;
  }
}

@media (max-width: 1023px) {
  .affiliates-arrow {
    transform: rotate(90deg);
    max-width: 40px;
    margin: 15px 0;
  }
}
</style>