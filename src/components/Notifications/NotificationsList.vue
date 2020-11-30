<template>
  <teleport to="#notifications">
    <transition-group name="notifications" tag="div" class="notifications-list tw-fixed tw-top-0 tw-right-0">
      <NotificationMessage v-if="$store.state.notifications.length" v-for="notification in $store.state.notifications"
                           :key="notification.id"
                           :notification="notification"
      />
    </transition-group>
  </teleport>
</template>

<script>
import NotificationMessage from "@/components/Notifications/NotificationMessage";

export default {
  name: 'NotificationsList',
  components: {
    NotificationMessage,
  },
}
</script>

<style scoped>
.notifications-list {
  margin-right: 15px;
  width: 320px;
}

@media (max-width: 400px) {
  .notifications-list {
    margin-right: 0;
    width: 100vw;

    .notifications-enter-active {
      transform: translateX(100vw);
    }

    .notifications-enter, .notifications-leave-to {
      transform: translateX(100vw);
    }
  }
}

@media (max-width: 1023px) {
  .notifications-list {
    top: var(--navigation-height) !important;
  }
}

.notifications-leave-active, .notifications-enter-active {
  opacity: 0;
}

.notifications-enter-active {
  transition: none !important;
  transform: translateX(110%);
}

.notifications-enter {
  transform: translateX(-110%);
}
.notifications-leave-to {
  transform: translateX(110%);
}
</style>