<template>
  <teleport to="#modal">
    <transition name="fade">
      <div class="modal-overlay" @click="$emit('update:visible', false)" v-if="visible"></div>
    </transition>
    <transition name="fade">
      <div class="modal" v-if="visible">
        <button @click="$emit('update:visible', false)" class="tw-absolute tw-text-sm" style="top: 12px; right: 12px">
          <fa-icon icon="times" />
        </button>
        <div class="tw-relative tw-overflow-scroll" style="max-height: 90vh">
          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import {  watch } from 'vue';

export default {
  name: 'VModal',
  props: {
    visible: {
      type: Boolean,
      required: true,
    }
  },
  setup(props) {
    watch(() => props.visible, () => {
      document.documentElement.style.overflow = props.visible ? 'hidden' : 'auto';
    })
  }
}
</script>

<style>
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;

  @apply fixed top-0 left-0 right-0 bottom-0 overflow-auto;
}

.modal {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  max-width: 600px;
  border-radius: 16px;
  padding: 25px;

  @apply fixed w-full bg-white;

  h1 {
    font-size: 22px;

    @apply text-primary font-bold;
  }

  p {
    margin-bottom: 15px;
  }
}

@media (max-width: 499px) {
  .modal {
    max-width: 90vw;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>