<template>
  <div v-if="$store.getters.isLoggedIn">
    test
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
      <div class="tw-w-full lg:tw-w-2/3 tw-text-2xl md:tw-text-3xl lg:tw-text-4xl tw-text-white tw-font-bold tw-text-center lg:tw-text-left">
        Get Started Today & Start Earning
      </div>
      <nav class="tw-flex tw-justify-center lg:tw-justify-end tw-w-full lg:tw-w-1/3">
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

export default {
  name: 'Home',
  components: {
    Footer,
  }
}
</script>
