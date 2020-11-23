<template>
  <div v-if="$store.getters.isLoggedIn">
    <div class="tw-mb-6">
      <div class="tw-text-center lg:tw-text-left tw-font-medium tw-text-2xl lg:tw-text-3xl tw-uppercase tw-tracking-wider tw-mb-3">
        Offerwalls
      </div>
      <div class="tw-flex tw-flex-wrap mb-4 md:tw-mx-4">
        <div v-for="(offerwall, index) in $store.state.offerwalls" :key="index" class="offerwall-card tw-w-full sm:tw-w-1/2 md:tw-w-1/3 lg:tw-w-1/3 xl:tw-w-1/4 tw-px-6 md:tw-px-4 tw-my-2">
          <router-link :to="{ name: 'Offerwall', params: { provider: offerwall.provider } }"
                       class="tw-h-full tw-flex tw-justify-center tw-items-center tw-rounded-2xl tw-shadow tw-duration-300 tw-overflow-hidden"
                       :class="`offerwall-${offerwall.provider}`"
                       :style="{ background: offerwall.background || 'var(--primary-color)' }"
          >
            <img class="offerwall-image" :src="offerwall.image">
          </router-link>
        </div>
      </div>
    </div>
    <div>
      <div class="tw-text-center lg:tw-text-left tw-font-medium tw-text-2xl lg:tw-text-3xl tw-uppercase tw-tracking-wider tw-mb-3">
        Promo Code
      </div>
      <div class="tw-flex tw-flex-wrap tw-p-6 tw-bg-white tw-rounded-sm tw-shadow">
        <div class="tw-w-full md:tw-w-1/2 xl:tw-w-3/5 tw-mb-6 md:tw-m-0">
          <div class="tw-text-md xl:tw-text-xl tw-font-medium tw-mb-3">
            Add your promo code and get Free Credits
          </div>
          <div class="tw-text-xs xl:tw-text-sm">
            We give Promo Codes daily in our social media accounts and to our social media influencers, Make sure you follow us to get more Points!
          </div>
        </div>
        <div class="tw-w-full md:tw-w-1/2 xl:tw-w-1/4 tw-flex tw-flex-col tw-justify-center tw-m-auto md:tw-pl-6 xl:tw-p-0">
          <div class="tw-mb-5">
            <input v-model="promoCode" placeholder="Promo Code" type="text"
                   class="tw-border tw-w-full tw-px-2 tw-py-4 tw-text-center"
                   :class="{ 'tw-border-red-500 tw-mb-2' : promoCodeErrors, 'tw-border-green-500 tw-mb-2' : promoCodeSuccess }"
                   @keydown="promoCodeErrors = ''; promoCodeSuccess = false"
            >
            <p v-if="promoCodeErrors || promoCodeSuccess" class="tw-text-xs tw-italic" :class="{ 'tw-text-red-500' : promoCodeErrors, 'tw-text-green-500' : promoCodeSuccess }">
              <template v-if="promoCodeErrors">
                {{ promoCodeErrors }}
              </template>
              <template v-else-if="promoCodeSuccess">
                Promo code has been redeemed.
              </template>
            </p>
          </div>
          <button @click="redeemPromoCode" class="tw-text-sm tw-uppercase tw-tracking-wider tw-font-bold tw-rounded-full tw-px-10 tw-py-2 tw-duration-200"
                  :class="promoCode ? 'tw-bg-primary tw-text-white' : 'tw-bg-secondary tw-text-gray-500'"
                  :disabled="! promoCode"
          >
            Redeem
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="home-unsigned survey-bg tw-h-screen">
    <header class="header-unsigned md:tw-px-24 lg:tw-px-48 tw-px-4 tw-flex tw-m-auto tw-items-center">
      <nav class="tw-flex-1">
        <div class="logo tw-inline-block tw-duration-300" />
      </nav>

      <nav class="tw-z-10">
        <router-link :to="{name: 'Login'}" class="tw-text-white tw-uppercase tw-tracking-wider tw-font-bold tw-duration-300 tw-border-2 tw-border-transparent hover:tw-border-primary hover:tw-text-primary tw-rounded-full tw-px-4 md:tw-px-6 tw-py-2 md:tw-py-3 tw-mr-2 md:tw-mr-4">
          <fa-icon icon="sign-in-alt" />
          Login
        </router-link>
        <router-link :to="{name: 'Register'}" class="tw-text-white tw-uppercase tw-tracking-wider tw-font-bold tw-duration-300 tw-border-2 hover:tw-border-primary hover:tw-bg-primary tw-rounded-full tw-px-4 md:tw-px-6 tw-py-2 md:tw-py-3">
          <fa-icon icon="sign-in-alt" />
          Register
        </router-link>
      </nav>
    </header>

    <main class="landing-section hero tw-h-screen tw-flex tw-justify-around xl:tw-justify-center tw-items-center tw-flex-col xl:tw-flex-row">
      <div class="tw-w-full xl:tw-w-8/12 tw-text-center xl:tw-text-left">
          <h1 class="tw-font-bold tw-text-3xl lg:tw-text-4xl tw-text-white tw-uppercase tw-tracking-wider">
            Earn Points & Withdraw Anytime
          </h1>
          <p class="tw-text-sm xl:tw-text-xl tw-text-white tw-mt-4 tw-mb-6 md:tw-mb-8">
            Earn instant rewards by completing simple tasks, watching videos and testing apps on the appstore. It's that easy!
          </p>
          <router-link :to="{name: 'Register'}" class="tw-text-white tw-uppercase tw-tracking-wider tw-font-bold tw-border-2 tw-border-primary tw-bg-primary tw-rounded-full tw-px-4 md:tw-px-6 tw-py-2 md:tw-py-3">
            <fa-icon icon="sign-in-alt" />
            Get Started
          </router-link>
      </div>
      <div class="tw-z-0 tw-w-full lg:tw-w-4/12 tw-text-center xl:tw-text-right tw-hidden lg:tw-block">
        <img alt="survey" class="md:tw-w-1/2 lg:tw-w-full tw-inline-block" src="@/assets/images/survey.png">
      </div>
    </main>

    <div class="landing-section tw-py-8 tw-bg-secondary">
      <div class="tw-flex tw-justify-around tw-items-center tw-text-center">
        <div class="tw-w-1/2 lg:tw-w-1/4">
          <div class="tw-text-primary tw-text-2xl sm:tw-text-4xl lg:tw-text-5xl tw-font-bold">
            46,038,123
          </div>
          <div class="tw-flex tw-justify-center tw-items-center tw-text-xs md:tw-text-sm tw-font-light tw-uppercase sm:tw-tracking-wider">
            <fa-icon class="tw-h-6 fa-w-20" icon="coins" />
            <span class="tw-ml-2">
              Points Earned
            </span>
          </div>
        </div>
        <div class="tw-w-1/2 lg:tw-w-1/4">
          <div class="tw-text-primary tw-text-2xl sm:tw-text-4xl lg:tw-text-5xl tw-font-bold">
            35,429,266
          </div>
          <div class="tw-flex tw-justify-center tw-items-center tw-text-xs md:tw-text-sm tw-font-light tw-uppercase sm:tw-tracking-wider">
            <fa-icon class="tw-h-6 fa-w-20" :icon="['fab', 'buffer']" />
            <span class="tw-ml-2">
              Offers Completed
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="landing-section tw-pb-8 tw-bg-secondary">
      <div class="tw-text-primary tw-mb-4 md:tw-mb-2 tw-text-3xl sm:tw-text-5xl tw-font-bold tw-text-center tw-uppercase tw-tracking-wider">
        <fa-icon icon="medal" />
        Our Rewards
      </div>
      <div class="rewards-list tw-flex tw-justify-center tw-items-center tw-flex-wrap">
        <div class="reward-gap">
          <div class="reward reward-discord tw-flex tw-justify-center tw-items-center">
            <img src="../assets/images/rewards/discord.png" alt="discord">
          </div>
        </div>
        <div class="reward-gap">
          <div class="reward reward-netflix tw-flex tw-justify-center tw-items-center">
            <img src="../assets/images/rewards/netflix.png" alt="netflix">
          </div>
        </div>
        <div class="reward-gap">
          <div class="reward reward-xbox tw-flex tw-justify-center tw-items-center">
            <img src="../assets/images/rewards/xbox.png" alt="xbox">
          </div>
        </div>
        <div class="reward-gap">
          <div class="reward reward-psn tw-flex tw-justify-center tw-items-center">
            <img src="../assets/images/rewards/psn.png" alt="psn">
          </div>
        </div>
        <div class="reward-gap">
          <div class="reward reward-roblox tw-flex tw-justify-center tw-items-center">
            <img src="../assets/images/rewards/roblox.png" alt="roblox">
          </div>
        </div>
      </div>
      <div class="tw-text-sm tw-text-center tw-mt-2">
        And many more!
      </div>
    </div>

    <div class="landing-section survey-bg tw-py-8 tw-flex tw-justify-between tw-items-center tw-flex-wrap" style="min-height: 250px">
      <div class="tw-w-full lg:tw-w-1/2 xl:tw-w-2/3 tw-text-2xl md:tw-text-3xl lg:tw-text-4xl tw-text-white tw-font-bold tw-text-center lg:tw-text-left">
        Get Started Today & Start Earning
      </div>
      <nav class="tw-flex tw-justify-center lg:tw-justify-end tw-w-full lg:tw-w-1/2 xl:tw-w-1/3">
        <router-link :to="{name: 'Login'}" class="tw-text-white tw-uppercase tw-tracking-wider tw-font-bold tw-duration-300 tw-border-2 tw-border-transparent hover:tw-border-primary hover:tw-text-primary tw-rounded-full tw-px-4 md:tw-px-6 tw-py-2 md:tw-py-3 tw-mr-2 md:tw-mr-4">
          <fa-icon icon="sign-in-alt" />
          Login
        </router-link>
        <router-link :to="{name: 'Register'}" class="tw-text-white tw-uppercase tw-tracking-wider tw-font-bold tw-duration-300 tw-border-2 hover:tw-border-primary hover:tw-bg-primary tw-rounded-full tw-px-4 md:tw-px-6 tw-py-2 md:tw-py-3">
          <fa-icon icon="sign-in-alt" />
          Register
        </router-link>
      </nav>
    </div>

    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue';
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

export default {
  name: 'Home',
  components: {
    Footer,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    if (route.name === 'Verify') {
      if (route.query.token) {
        store.dispatch('verifyEmail', route.query.token).then(() => {
          router.push({ name: 'Home' });
        }).catch((err) => {
          if (err.response.status === 422 && err.response.data.message === 'verified') {
            store.dispatch('getLoggedUser');
          }

          router.push({ name: 'Home' });
        });
      } else {
        router.push({ name: 'Home' });
      }
    }

    const promoCode = ref('');
    const promoCodeErrors = ref('');
    const promoCodeSuccess = ref(false);

    const redeemPromoCode = () => {
      promoCodeErrors.value = '';
      promoCodeSuccess.value = false;

      store.dispatch('redeemPromoCode', promoCode.value).then(() => {
        promoCodeSuccess.value = true;
        promoCode.value = '';
      }).catch((err) => {
        if (err.response.status === 422) {
          promoCodeErrors.value = err.response.data.errors ? err.response.data.errors.code[0] : err.response.data.message;
        }

        promoCode.value = '';
      });
    }

    return {
      promoCode,
      promoCodeErrors,
      promoCodeSuccess,
      redeemPromoCode,
    }
  }
}
</script>
