<template>
  <div v-if="$store.getters.isLoggedIn">
    <div class="tw-mb-6">
      <div class="tw-text-center lg:tw-text-left tw-font-medium tw-text-2xl lg:tw-text-3xl tw-uppercase tw-tracking-wider tw-mb-3">
        Offerwalls
      </div>
      <div class="tw-flex tw-flex-wrap md:tw--mx-4">
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
        Promo Codes
      </div>
      <div class="tw-flex tw-flex-wrap tw-p-6 tw-bg-white tw-rounded-sm tw-shadow">
        <div class="tw-w-full md:tw-w-1/2 xl:tw-w-3/5 tw-mb-3 sm:tw-mb-6 md:tw-m-0">
          <div class="tw-text-lg xl:tw-text-xl tw-font-medium tw-mb-3">
            Redeem a promocode for free points
          </div>
          <div class="tw-text-sm">
            You can find promo codes in videos from our sponsors! <br> We also often post promo codes on our social media so make sure to follow us everywhere!
          </div>
        </div>
        <div class="tw-w-full md:tw-w-1/2 xl:tw-w-1/4 tw-flex tw-flex-col tw-justify-center tw-m-auto md:tw-pl-6 xl:tw-p-0">
          <div class="tw-mb-5">
            <input v-model="promoCode" placeholder="Promo Code" type="text" class="tw-border tw-w-full tw-px-2 tw-py-4 tw-text-center">
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

  <div v-else>
    <UnsignedNavigation v-if="! $store.getters.isLoggedIn" class="lg:tw-px-4">
      <main class="tw-flex tw-items-center tw-py-5 lg:tw-py-10">
        <div class="tw-w-full xl:tw-w-8/12 tw-text-center xl:tw-text-left">
          <h1 class="tw-font-bold tw-text-2xl md:tw-text-4xl tw-text-white tw-uppercase tw-tracking-wider">
            Earn Points & Redeem Rewards
          </h1>
          <p class="tw-text-sm sm:tw-text-lg lg:tw-text-xl tw-text-white tw-mt-4 tw-mb-6 md:tw-mb-8">
            Earn digital rewards by completing simple tasks, watching videos and testing apps on the appstore. It's that easy!
          </p>
          <router-link :to="{ name: 'Register' }" class="home-unsigned tw-duration-300 tw-text-primary tw-uppercase tw-tracking-wider tw-font-bold tw-border-2 tw-border-white tw-bg-white tw-rounded-full tw-px-4 md:tw-px-6 tw-py-2 md:tw-py-3">
            <fa-icon icon="sign-in-alt" />
            Get Started
          </router-link>
        </div>
        <div class="tw-z-0 tw-pt-4 tw-w-full lg:tw-w-4/12 tw-text-center xl:tw-text-right tw-hidden xl:tw-block">
          <img alt="survey" class="md:tw-w-1/2 lg:tw-w-full tw-inline-block" src="@/assets/images/survey.png">
        </div>
      </main>
    </UnsignedNavigation>

    <div class="tw-bg-white tw-text-primary">
      <svg class="tw-block xl:tw--mt-32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 240">
        <path fill="var(--primary-color)" d="M0,224L48,202.7C96,181,192,139,288,112C384,85,480,75,576,85.3C672,96,768,128,864,154.7C960,181,1056,203,1152,186.7C1248,171,1344,117,1392,90.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
      </svg>
    </div>

    <div class="landing-section tw-py-8 tw-bg-white tw--mt-8 sm:tw--mt-12 md:tw--mt-16 lg:tw--mt-20 xl:tw--mt-24">
      <div class="tw-flex tw-justify-around tw-items-center tw-text-center tw-py-4">
        <div class="tw-mr-2 lg:tw-mr-0 tw-w-1/2 lg:tw-w-1/4">
          <div class="tw-text-primary tw-text-2xl sm:tw-text-4xl lg:tw-text-5xl tw-font-bold">
            {{ $store.state.stats.total_points_earned }}
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
            {{ $store.state.stats.total_offers_completed }}
          </div>
          <div class="tw-flex tw-justify-center tw-items-center tw-text-xs md:tw-text-sm tw-font-light tw-uppercase sm:tw-tracking-wider">
            <fa-icon class="tw-h-6 fa-w-20" :icon="['fab', 'buffer']" />
            <span class="tw-ml-2">
              Offers Completed
            </span>
          </div>
        </div>
      </div>
      <div class="tw-text-primary tw-mb-4 md:tw-mb-2 tw-text-3xl md:tw-text-5xl tw-font-bold tw-text-center tw-uppercase tw-tracking-wider">
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
      <div class="tw-text-primary tw-uppercase tw-text-sm tw-text-center tw-mt-2">
        And many more!
      </div>
    </div>

    <div class="tw-bg-white tw-text-secondary">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z" fill="currentColor"></path>
      </svg>
    </div>

    <div class="landing-section tw-text-center tw-bg-secondary tw-flex tw-flex-wrap tw-justify-center sm:tw-flex-no-wrap tw-pt-4 tw-pb-8">
      <div class="tw-text-center tw-w-full">
        <div class="tw-text-primary tw-mb-4 md:tw-mb-2 tw-text-3xl md:tw-text-5xl tw-font-bold tw-text-center tw-uppercase tw-tracking-wider">
          <fa-icon icon="star" />
          Our Features
        </div>

        <div class="tw-flex tw-justify-center tw-flex-wrap lg:tw-flex-no-wrap tw--mb-4 lg:tw-pl-4">
          <div class="feature-card tw-w-full sm:tw-w-1/2 lg:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mr-4 tw-mb-4">
            <fa-icon class="tw-text-primary fa-w-40 tw-h-20" icon="wallet" />
            <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mb-1">
              Offer Walls
            </div>
            <div class="tw-mb-6">
              Explore our offerwall options, and earn coins!
            </div>
          </div>
          <div class="feature-card tw-w-full sm:tw-w-1/2 lg:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mr-4 tw-mb-4">
            <fa-icon class="tw-text-primary fa-w-40 tw-h-20" icon="gift" />
            <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mb-1">
              Giveaways
            </div>
            <div class="tw-mb-6">
              Enter on site, daily giveaways on our social medias!
            </div>
          </div>
          <div class="feature-card tw-w-full sm:tw-w-1/2 lg:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mr-4 tw-mb-4">
            <fa-icon class="tw-text-primary fa-w-40 tw-h-20" icon="people-arrows" />
            <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mb-1">
              Referrals
            </div>
            <div class="tw-mb-6">
              Earn coins from your friends!
            </div>
          </div>
          <div class="feature-card tw-w-full sm:tw-w-1/2 lg:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mr-4 tw-mb-4">
            <fa-icon class="tw-text-primary fa-w-40 tw-h-20" icon="question" />
            <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mb-1">
              support
            </div>
            <div class="tw-mb-6">
              Read our support!
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tw-bg-secondary tw-text-white">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z" fill="currentColor"></path>
      </svg>
    </div>

    <div class="landing-section tw-bg-white tw-py-8 tw-flex tw-flex-col tw-justify-around tw-items-center">
      <div class="tw-text-2xl md:tw-text-3xl lg:tw-text-4xl tw-text-primary tw-font-bold tw-text-center lg:tw-text-left tw-mb-6">
        Ready To Start Earning?
      </div>
      <nav class="tw-flex">
        <router-link :to="{ name: 'Login' }" class="tw-text-primary hover:tw-text-white tw-uppercase tw-tracking-wider tw-font-bold tw-duration-300 tw-border-2 tw-border-primary hover:tw-bg-primary tw-rounded-full tw-px-4 md:tw-px-6 tw-py-2 md:tw-py-3 tw-mr-4 lg:tw-mr-8">
          <fa-icon class="tw-hidden sm:tw-inline-block" icon="sign-in-alt" />
          Login
        </router-link>
        <router-link :to="{ name: 'Register' }" class="tw-text-primary hover:tw-text-white tw-uppercase tw-tracking-wider tw-font-bold tw-duration-300 tw-border-2 tw-border-primary hover:tw-bg-primary tw-rounded-full tw-px-4 md:tw-px-6 tw-py-2 md:tw-py-3">
          <fa-icon class="tw-hidden sm:tw-inline-block" icon="sign-in-alt" />
          Register
        </router-link>
      </nav>
    </div>

    <div class="tw-bg-white tw-text-primary">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z" fill="currentColor"></path>
      </svg>
    </div>

    <Footer />
  </div>
</template>

<script>
import UnsignedNavigation from '@/components/UnsignedNavigation';
import Footer from '@/components/Footer.vue';
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

export default {
  name: 'Home',
  components: {
    Footer,
    UnsignedNavigation,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    if (route.query.token) {
      store.dispatch('verifyEmail', route.query.token).then(() => {
        router.push({ name: 'Home' });
      }).catch((err) => {
        if (err.response.status === 422) {
          store.dispatch('getLoggedUser').then(() => {
            if (store.state.user.email_verified_at) {
              store.dispatch('addNotification', {
                type: 'error',
                message: "Your account is already verified!"
              });
            }
          });
        }

        router.push({ name: 'Home' });
      });
    }

    if (route.name === 'NotFound') {
      router.push({ name: 'Home' });
    }

    if (! store.getters.isLoggedIn && route.query.ref_id) {
      localStorage.setItem('ref_id', route.query.ref_id);
    }

    const promoCode = ref('');

    const redeemPromoCode = () => {
      store.dispatch('redeemPromoCode', promoCode.value).then(() => {
        promoCode.value = '';

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Promo code has been redeemed',
        });
      }).catch((err) => {
        if (err.response.status === 422) {
          store.dispatch('addNotification', {
            type: 'error',
            message: err.response.data.errors ? err.response.data.errors.code[0] : err.response.data.message,
          });
        }

        promoCode.value = '';
      });
    }

    if (! store.getters.isLoggedIn) {
      store.dispatch('stats')
    }

    return {
      promoCode,
      redeemPromoCode,
    }
  }
}
</script>