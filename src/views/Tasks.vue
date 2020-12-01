<template>
  <div>
    <div class="tw-text-center lg:tw-text-left tw-font-medium tw-text-2xl lg:tw-text-3xl tw-uppercase tw-tracking-wider tw-mb-4">
      Daily Tasks
    </div>

    <div class="tw-text-primary tw-bg-white tw-rounded-sm tw-shadow tw-text-center tw-p-6 tw-mb-8">
      <div class="similar-integers tw-text-3xl sm:tw-text-4xl md:tw-text-5xl tw-font-bold">
          {{ countdown.displayHours }}h {{ countdown.displayMinutes }}m {{ countdown.displaySeconds }}s
      </div>
      <div class="tw-text-black md:tw-text-lg tw-tracking-wider">
          Complete daily tasks fot bonus points, daily challenges reset every 24 hours.
      </div>
    </div>
    <div v-for="(index, item) in 4" :key="index" class="tw-flex tw-justify-center tw-flex-wrap tw-mb-4">
      <div class="giveaway-description-card tw-w-full tw-flex tw-flex-col tw-items-center tw-w-full xl:tw-w-1/4 tw-bg-secondary tw-border-t-2 tw-border-primary tw-shadow-md tw-p-4 lg:tw-mx-4">
          <div class="tw-font-medium tw-text-xl tw-uppercase tw-tracking-wider tw-mt-2 tw-mb-4">
              Complete 1 offer
          </div>
          <button class="tw-bg-primary tw-w-full tw-rounded-full tw-text-sm tw-mb-2">
              redeem
          </button>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import { useStore } from "vuex";
import { computed, onBeforeUnmount, reactive, ref } from "vue";

export default {
  name: 'Tasks',
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
      displayHours: getCorrectDisplay(23 - now.get('hour')),
      displayMinutes: getCorrectDisplay(59 - now.get('minute')),
      displaySeconds: getCorrectDisplay(59 - now.get('second')),
    });

    const _seconds = computed(() => 1000);
    const _minutes = computed(() => _seconds.value * 60);
    const _hours = computed(() => _minutes.value * 60);
    const _days = computed(() => _hours.value * 24);

    const showRemaining = () => {
      timer.value = setInterval(() => {
        const distance = getDistance();

        if (distance < 0) {
          clearInterval(timer);
          return;
        }

        countdown.displayHours = getCorrectDisplay(Math.floor((distance % _days.value) / _hours.value));
        countdown.displayMinutes = getCorrectDisplay(Math.floor((distance % _hours.value) / _minutes.value));
        countdown.displaySeconds = getCorrectDisplay((Math.floor((distance % _minutes.value) / _seconds.value)));
      }, 1000);
    };

    showRemaining();

    onBeforeUnmount(() => {
      clearTimeout(timer);
    });

    return {
      countdown,
    }
  }
}
</script>