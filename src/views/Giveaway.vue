<template>
  <div class="tw-text-center">
    <div class="tw-text-center lg:tw-text-left tw-font-medium tw-text-2xl lg:tw-text-3xl tw-uppercase tw-tracking-wider tw-mb-4">
      Giveaways
    </div>

    <div class="tw-flex tw-justify-center tw-p-6 tw-bg-white tw-rounded-sm tw-shadow">
      <div class="tw-w-full xl:tw-w-3/4 tw-text-xl tw-text-primary tw-flex tw-justify-between xl:tw-justify-around tw-flex-row-reverse tw-items-center tw-flex-wrap">
        <div class="tw-w-1/2 sm:tw-w-1/3">
          <div class="tw-text-2xl tw-font-bold">
            <fa-icon class="tw-text-primary" icon="coins" />
            13
          </div>
          <div class="tw-text-black tw-text-xs tw-uppercase tw-tracking-wider">
            Winning Amount
          </div>
        </div>
        <div class="tw-w-1/2 sm:tw-w-1/3">
          <div class="similar-integers tw-text-2xl tw-font-bold tw-rounded-full tw-text-center">
            {{ countdown.displayMinutes }}m {{ countdown.displaySeconds }}s
          </div>
          <div class="tw-text-black tw-text-xs tw-uppercase tw-tracking-wider">
            Time left
          </div>
        </div>
        <div class="tw-w-full sm:tw-w-1/3 tw-mt-4 sm:tw-m-0">
          <button v-if="true" @click="enterGiveaway" class="tw-w-full sm:tw-w-auto tw-uppercase tw-text-sm tw-tracking-wider tw-font-bold tw-duration-300 tw-border-2 tw-border-primary tw-text-primary hover:tw-text-white hover:tw-bg-primary tw-rounded-full tw-px-4 md:tw-px-6 tw-py-2 md:tw-py-3">
            Enter Giveaway
          </button>
          <div v-else class="tw-w-full sm:tw-w-auto tw-inline-block tw-uppercase tw-text-sm tw-tracking-wider tw-font-bold tw-border-2 tw-border-primary tw-text-white tw-bg-primary tw-rounded-full tw-px-4 md:tw-px-6 tw-py-2 md:tw-py-3">
            You've entered
          </div>
        </div>
      </div>
    </div>

    <div class="tw-flex tw-justify-center tw-flex-wrap tw-mt-8">
      <div class="similar-integers tw-inline-block tw-w-full sm:tw-w-1/2 xl:tw-w-1/3 tw-border-t-2 tw-border-primary tw-shadow-md tw-px-4 tw-pt-4 xl:tw-mr-4">
        <div class="tw-flex tw-justify-between tw-items-center tw-flex-wrap">
          <div class="tw-text-lg md:tw-text-xl tw-uppercase tw-tracking-wider tw-mr-2">
            Recent Entries
          </div>
          <div>
            15000 Entries
          </div>
        </div>
        <div v-for="(item, index) in 10" :key="index" :class="{ 'tw-border-b' : index !== 9 }" class="body-ga tw-border-primary tw-flex tw-justify-between tw-py-3">
          <div class="tw-w-6 tw-h-6 tw-mr-2">
            <img class="tw-rounded-full" src="http://localhost:8000/storage/assets/user.png">
          </div>
          <div class="tw-flex-1 tw-text-left tw-truncate">
            username
          </div>
          <div class="tw-w-20 tw-text-right">
            24hrs ago
          </div>
        </div>
      </div>

      <div class="similar-integers tw-inline-block tw-w-full sm:tw-w-1/2 xl:tw-w-1/3 tw-border-t-2 tw-border-primary tw-shadow-md tw-px-4 tw-pt-4 tw-mt-4 sm:tw-mt-0">
        <div class="tw-flex tw-text-lg md:tw-text-xl tw-uppercase tw-tracking-wider">
          Previous Winners
        </div>
        <div v-for="(item, index) in 10" :key="index" :class="{ 'tw-border-b' : index !== 9 }" class="body-ga tw-border-primary tw-flex tw-justify-between tw-py-3">
          <div class="tw-h-6 tw-w-6 tw-mr-2">
            <img class="tw-rounded-full" src="http://localhost:8000/storage/assets/user.png">
          </div>
          <div class="tw-flex-1 tw-text-left tw-truncate">
            username
          </div>
          <div class="tw-flex tw-justify-end tw-items-center tw-mr-1 sm:tw-mr-2 md:tw-mr-4">
            <fa-icon class="tw-mx-2 tw-text-primary" icon="coins" />
            50
          </div>
          <div class="tw-w-20 tw-text-right">
            24hrs ago
          </div>
        </div>
      </div>
    </div>

    <div class="tw-text-primary tw-font-medium tw-text-2xl lg:tw-text-3xl tw-uppercase tw-tracking-wider tw-my-4 lg:tw-my-8">
      How does it work?
    </div>
    <div class="tw-flex tw-justify-center tw-flex-wrap">
      <div class="giveaway-description-card tw-w-full tw-flex tw-flex-col tw-items-center tw-w-full xl:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mx-4">
        <div class="tw-flex tw-justify-center tw-items-center tw-w-12 tw-h-12 tw-border-2 tw-border-primary tw-rounded-full tw-text-2xl">
          1
        </div>
        <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mt-10 tw-mb-4">
          Enter The Giveaway
        </div>
        <div class="tw-text-sm tw-mb-2">
          In order to participate in the giveaway, you must complete at least one offer in the last hour.
        </div>
        <div class="tw-text-sm tw-mb-2">
          After completing an offer, you'll be able to enter the giveaway by clicking the "ENTER" button above.
        </div>
      </div>

      <div class="giveaway-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" viewBox="0 0 512 512">
          <path id="arrow" d="M32.017,443.987l80.255-187.5L32.017,68.985,480,256.485Z"></path>
        </svg>
      </div>

      <div class="giveaway-description-card tw-w-full tw-flex tw-flex-col tw-items-center tw-w-full xl:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mx-4">
        <div class="tw-flex tw-justify-center tw-items-center tw-w-12 tw-h-12 tw-border-2 tw-border-primary tw-rounded-full tw-text-2xl">
          2
        </div>
        <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mt-10 tw-mb-4">
          Receive Points
        </div>
        <div class="tw-text-sm tw-mb-2">
          Once you've entered the giveaway, you have a chance to win the amount of points that is written above.
        </div>
      </div>

      <div class="giveaway-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" viewBox="0 0 512 512">
          <path id="arrow" d="M32.017,443.987l80.255-187.5L32.017,68.985,480,256.485Z"></path>
        </svg>
      </div>

      <div class="giveaway-description-card tw-w-full tw-flex tw-flex-col tw-items-center tw-w-full xl:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mx-4">
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
          The more you participate in giveaways, the better chance to win!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useStore } from 'vuex';
import { ref, reactive, computed, onBeforeUnmount } from 'vue';

export default {
  name: 'Giveaway',
  setup() {
    const store = useStore();

    const timer = ref(null);
    const getCorrectDisplay = (value) => value < 10 ? '0' + value : value;

    dayjs.extend(utc)
    dayjs.extend(timezone)

    let now = dayjs().tz(process.env.VUE_APP_TIMEZONE);

    const getDistance = () => {
      now = dayjs().tz(process.env.VUE_APP_TIMEZONE);

      return now.endOf('day') - now;
    };

    const countdown = reactive({
      displayMinutes: getCorrectDisplay(59 - now.get('minute')),
      displaySeconds: getCorrectDisplay(59 - now.get('second')),
    });

    const _seconds = computed(() => 1000);
    const _minutes = computed(() => _seconds.value * 60);
    const _hours = computed(() => _minutes.value * 60);

    const showRemaining = () => {
      timer.value = setInterval(() => {
        const distance = getDistance();

        if (distance < 0) {
          clearInterval(timer);
          return;
        }

        countdown.displayMinutes = getCorrectDisplay(Math.floor((distance % _hours.value) / _minutes.value));
        countdown.displaySeconds = getCorrectDisplay(Math.floor((distance % _minutes.value) / _seconds.value));
      }, 1000);
    };

    showRemaining();

    onBeforeUnmount(() => {
      clearTimeout(timer);
    });

    const enterGiveaway = () => {
      store.dispatch('enterGiveaway');
    };

    return {
      countdown,
      enterGiveaway,
    }
  }
}
</script>

<style scoped>
.giveaway-arrow {
  max-width: 100px;
  fill: var(--primary-color);

  @apply flex justify-center items-center;

  svg {
    max-width: 100%;
    height: auto;
  }
}

@media (min-width: 1024px) {
  .giveaway-description-card {
    max-width: 300px;
  }

  .giveaway-description-card {
    flex: 3;
  }

  .giveaway-arrow {
    flex: 1;
  }
}

@media (max-width: 1023px) {
  .giveaway-arrow {
    transform: rotate(90deg);
    max-width: 40px;
    margin: 15px 0;
  }
}
</style>