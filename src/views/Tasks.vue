<template>
  <div>
    <div class="tw-text-center lg:tw-text-left tw-font-medium tw-text-2xl lg:tw-text-3xl tw-uppercase tw-tracking-wider tw-mb-4">
      Daily Challenges
    </div>

    <div class="tw-text-primary tw-bg-white tw-rounded-sm tw-shadow tw-text-center tw-p-6 tw-mb-8">
      <div class="tw-text-3xl sm:tw-text-4xl md:tw-text-5xl tw-font-bold">
          {{ countdown.displayHours }}h {{ countdown.displayMinutes }}m {{ countdown.displaySeconds }}s
      </div>
      <div class="tw-text-black md:tw-text-lg tw-tracking-wider">
          Complete daily challenges fot bonus points, daily challenges reset every 24 hours.
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
import {useStore} from "vuex";
import {computed, onBeforeUnmount, reactive, ref} from "vue";

export default {
  name: 'Tasks',
  setup() {
    const store = useStore();

    const timer = ref(null);
    const countdown = reactive({
        displayHours: '00',
        displayMinutes: '00',
        displaySeconds: '00',
    });

    const _seconds = computed(() => 1000);
    const _minutes = computed(() => _seconds.value * 60);
    const _hours = computed(() => _minutes.value * 60);
    const _days = computed(() => _hours.value * 24);

    const showRemaining = () => {
        timer.value = setInterval(() => {
            const now = new Date();
            const end = new Date(now.getFullYear(), now.getMonth() , now.getDate() + 1);
            const distance = end.getTime() - now.getTime();

            if (distance < 0) {
                clearInterval(timer);
                return;
            }

            const hours = Math.floor((distance % _days.value) / _hours.value);
            const minutes = Math.floor((distance % _hours.value) / _minutes.value);
            const seconds = Math.floor((distance % _minutes.value) / _seconds.value);
            countdown.displaHours = hours < 10 ? '0' + hours : hours;
            countdown.displayMinutes = minutes < 10 ? '0' + minutes : minutes;
            countdown.displaySeconds = seconds < 10 ? '0' + seconds : seconds;
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