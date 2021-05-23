<template>
  <UnsignedNavigation class="tw-min-h-screen bg-home">
    <img src="../assets/images/rectangle.png" class="triangle1 tw-hidden lg:tw-block">
    <img src="../assets/images/rectangle2.png" class="triangle2">
    <img src="../assets/images/gem.png" class="gem">
    <main class="unsigned-header tw-relative tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-center md:tw-justify-between tw-py-5 lg:tw-py-10 md:tw-px-10 lg:tw-px-20">
      <div class="left-unsigned tw-relative tw-w-3/5 sm:tw-w-1/2 md:tw-w-full tw-mb-10 md:tw-mb-0">
        <img alt="man" src="@/assets/images/man.png">
        <img alt="elements" class="elements tw-absolute tw-top-0 tw-left-0" src="@/assets/images/elements.png">
      </div>
      <div class="right-unsigned tw-z-50 tw-w-full xl:tw-w-8/12 tw-text-center md:tw-text-left">
        <h1 class="tw-font-bold tw-text-3xl md:tw-text-4xl lg:tw-text-5xl xl:tw-text-6xl tw-text-white tw-uppercase tw-tracking-wider">
          Gain <span class="tw-text-primary">Gems</span> & <br> Redeem Prizes
        </h1>
        <p class="sm:tw-w-1/2 md:tw-w-full tw-text-sm sm:tw-text-lg lg:tw-text-xl tw-text-white tw-mt-4 tw-mb-6 md:tw-mb-8 tw-mx-auto">
          Earn digital rewards by completing simple tasks, watching videos and testing apps on the appstore. It's that easy!
        </p>
        <router-link :to="{ name: 'Register' }" class="home-unsigned tw-duration-300 tw-text-white tw-tracking-wider tw-font-bold tw-border-2 tw-border-primary tw-bg-primary tw-px-4 md:tw-px-6 tw-py-2 md:tw-py-3">
          <fa-icon icon="sign-in-alt" />
          Get Started
        </router-link>
      </div>
    </main>
  </UnsignedNavigation>

  <div class="landing-section tw-py-8 tw-bg-white">
    <div class="tw-flex tw-justify-around tw-items-center tw-text-center tw-py-4">
      <div class="tw-mr-2 lg:tw-mr-0 tw-w-1/2 lg:tw-w-1/4">
        <div class="tw-text-primary tw-text-2xl sm:tw-text-4xl lg:tw-text-5xl tw-font-bold">
          <AnimatedNumber :number="parseFloat($store.state.stats.total_points_earned)" :duration="4" />
        </div>
        <div class="tw-flex tw-justify-center tw-text-secondary tw-items-center tw-text-xs md:tw-text-sm tw-font-light tw-uppercase sm:tw-tracking-wider">
          <fa-icon class="tw-h-6 fa-w-20" icon="gem" />
          <span class="tw-ml-2">
            Gems Earned
          </span>
        </div>
      </div>
      <div class="tw-w-1/2 lg:tw-w-1/4">
        <div class="tw-text-primary tw-text-2xl sm:tw-text-4xl lg:tw-text-5xl tw-font-bold">
          <AnimatedNumber :number="parseInt($store.state.stats.total_offers_completed)" :duration="4" />
        </div>
        <div class="tw-flex tw-justify-center tw-text-secondary tw-items-center tw-text-xs md:tw-text-sm tw-font-light tw-uppercase sm:tw-tracking-wider">
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

    <Splide :options="{ type: 'loop', rewind : true, gap: '20px', autoWidth: true, focus: 'center', autoplay: true }" class="rewards-list">
      <SplideSlide v-for="(reward, index) in $store.state.rewards" :key="index">
        <div class="reward-gap tw-transform hover:tw-scale-90 tw-duration-300 ">
          <div class="reward tw-flex tw-justify-center tw-items-center" :class="`reward-${reward.provider}`">
            <img :src="reward.image" :alt="reward.name">
          </div>
        </div>
      </SplideSlide>
    </Splide>
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
            Check out our offerwalls to start earning gems!
          </div>
        </div>
        <div class="feature-card tw-w-full sm:tw-w-1/2 lg:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mr-4 tw-mb-4">
          <fa-icon class="tw-text-primary fa-w-40 tw-h-20" icon="gift" />
          <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mb-1">
            Giveaways
          </div>
          <div class="tw-mb-6">
            Enter our hourly giveaways on the website or keep an eye on our social medias for special promo codes!
          </div>
        </div>
        <div class="feature-card tw-w-full sm:tw-w-1/2 lg:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mr-4 tw-mb-4">
          <fa-icon class="tw-text-primary fa-w-40 tw-h-20" icon="people-arrows" />
          <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mb-1">
            Referrals
          </div>
          <div class="tw-mb-6">
            Invite your friends and earn 10% of their total earnings!
          </div>
        </div>
        <div class="feature-card tw-w-full sm:tw-w-1/2 lg:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mr-4 tw-mb-4">
          <fa-icon class="tw-text-primary fa-w-40 tw-h-20" icon="question" />
          <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mb-1">
            support
          </div>
          <div class="tw-mb-6">
            Check out our help center located on the bottom right of the page!
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="landing-section tw-bg-white tw-py-8 tw-flex tw-flex-col tw-justify-around tw-items-center">
    <div class="tw-text-2xl md:tw-text-3xl lg:tw-text-4xl tw-text-primary tw-font-bold tw-text-center lg:tw-text-left tw-mb-6">
      Start Earning Today!
    </div>
    <nav class="tw-flex">
      <router-link :to="{ name: 'Login' }" class="tw-transform hover:tw-scale-90 tw-text-primary hover:tw-text-white tw-uppercase tw-tracking-wider tw-font-bold tw-duration-300 tw-border-2 tw-border-white tw-border-primary hover:tw-bg-primary tw-px-4 md:tw-px-6 tw-py-2 md:tw-py-3 tw-mr-4 lg:tw-mr-8">
        <fa-icon class="tw-hidden sm:tw-inline-block" icon="sign-in-alt" />
        Login
      </router-link>
      <router-link :to="{ name: 'Register' }" class="tw-transform hover:tw-scale-90 tw-text-primary hover:tw-text-white tw-uppercase tw-tracking-wider tw-font-bold tw-duration-300 tw-border-2 tw-border-primary hover:tw-bg-primary tw-px-4 md:tw-px-6 tw-py-2 md:tw-py-3">
        <fa-icon class="tw-hidden sm:tw-inline-block" icon="sign-in-alt" />
        Register
      </router-link>
    </nav>
  </div>

  <Footer />
</template>

<script>
import AnimatedNumber from '@/components/AnimatedNumber';
import UnsignedNavigation from '@/components/UnsignedNavigation';
import Footer from '@/components/Footer.vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/splide/dist/css/themes/splide-sea-green.min.css';
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  name: 'UnsignedHome',
  title: 'GainGem',
  components: {
    Footer,
    UnsignedNavigation,
    AnimatedNumber,
    Splide,
    SplideSlide,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    store.dispatch('stats')

    if (route.query.ref_id) {
      localStorage.setItem('ref_id', route.query.ref_id);
    }
  }
}
</script>

<style>
.bg-home {
  background: var(--secondary-color) ;
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.triangle1 {
  position: absolute;
  left: -50px;
  top: 80%;
  transform: translateY(-50%);
  width: 450px;
  z-index: -1;
  opacity: 0.3;
}

.triangle2 {
  position: absolute;
  left: 50%;
  top: -200px;
  transform: translateX(-70%);
  width: 600px;
  z-index: -1;
  opacity: 0.3;
}

.gem {
  position: absolute;
  right: -250px;
  top: 50%;
  transform: translateX(-20%);
  width: 700px;
  z-index: -1;
  opacity: 0.5;
}

.splide {
  margin-top: -3em;
}

.splide__track {
  cursor: grabbing;
}

.splide__arrow--prev {
  left: 0.75em
}

.splide__arrow--next {
  right: 0.75em
}

.splide__arrow > svg {
  fill: rgba(var(--primary-color-rgb), 0.75);
}

.splide__arrow:hover > svg {
  fill: var(--primary-color);
}

.splide__pagination__page.is-active {
  background: rgba(var(--primary-color-rgb), 0.75);
}

.splide__pagination__page:hover {
  background: var(--primary-color);
}
</style>