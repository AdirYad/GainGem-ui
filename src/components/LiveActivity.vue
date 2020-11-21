<template>
  <div class="activity-items tw-bg-secondary tw-flex tw-items-end">
    <transition-group name="activity" tag="div" class="tw-w-full tw-relative tw-flex tw-px-3 lg:tw-pl-4 tw-overflow-hidden">
      <div v-for="(activity) in activities" :key="activity.id" class="activity-item tw-bg-white tw-text-xs tw-font-light tw-text-primary tw-rounded-md tw-border-b-2 tw-border-primary tw-mx-2 tw-px-4 tw-flex tw-justify-center tw-items-center">
        <span class="tw-h-6 tw-w-6 tw-inline-block tw-mr-2">
          <img class="tw-rounded-full" :src="activity.profile_image" alt="Mongo bongo">
        </span>
        <span class="user-activity tw-text-sm tw-font-medium tw-inline-block tw-truncate tw-mr-1">
          {{ activity.username }}
        </span>
        earned
        <span class="tw-flex tw-text-sm tw-font-medium tw-ml-1">
          <fa-icon class="tw-h-4 fa-w-20" icon="coins" />
          {{ activity.earned }}
        </span>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: 'LiveActivity',
  setup() {
    const activities = ref([
      {
        id: 8,
        username: 123123,
        profile_image: 'http://localhost:8000/assets/user.png',
        earned: 32,
      },
      {
        id: 7,
        username: 'Adoirrrrrrr',
        profile_image: 'http://localhost:8000/assets/user.png',
        earned: 332323,
      },
      {
        id: 6,
        username: 121212121,
        profile_image: 'http://localhost:8000/assets/user.png',
        earned: 55555,
      },
      {
        id: 5,
        username: 123123,
        profile_image: 'http://localhost:8000/assets/user.png',
        earned: 32222,
      },
      {
        id: 4,
        username: 123123,
        profile_image: 'http://localhost:8000/assets/user.png',
        earned: 99,
      },
      {
        id: 3,
        username: 'asdasdassad',
        profile_image: 'http://localhost:8000/assets/user.png',
        earned: 323232323,
      },
      {
        id: 2,
        username: 'asdasdassad',
        profile_image: 'http://localhost:8000/assets/user.png',
        earned: 323232323,
      },
      {
        id: 1,
        username: 'asdasdassad',
        profile_image: 'http://localhost:8000/assets/user.png',
        earned: 323232323,
      },
    ]);

    let i = 9;

    setInterval(() => {
      activities.value.unshift(
      {
        id: i++,
        username: 'asdasdassad',
        profile_image: 'http://localhost:8000/assets/user.png',
        earned: Math.floor(Math.random() * 2000),
      });
    }, 3000);

    return {
      activities
    }
  }
}
</script>

<style scoped>
.activity-enter, .activity-leave-to {
  opacity: 0;
  transform: translateX(250px);
}
</style>