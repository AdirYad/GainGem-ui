<template>
  <transition name="bounce">
    <div v-if="announcementBanner.is_enabled" class="tw-w-full tw-relative tw-flex tw-justify-center tw-shadow-md tw-text-white tw-items-center tw-bg-primary tw-px-8 tw-py-4">
      <div v-html="announcementBanner.text" />
      <button @click="announcementBanner.is_enabled = false" class="tw-absolute tw-text-sm" style="top: 50%; right: 12px; transform: translateY(-50%)">
        <fa-icon icon="times" />
      </button>
    </div>
  </transition>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: 'AnnouncementBanner',
  setup() {
    const store = useStore();

    const announcementBanner = ref({
      is_enabled: false,
    });

    store.dispatch('getAnnouncementBanner').then((response) => {
      if (response.data.announcement_banner) {
        announcementBanner.value = response.data.announcement_banner;
      }
    });

    return {
      announcementBanner,
    }
  }
}
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>