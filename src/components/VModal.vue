<template>
  <teleport to="#modal">
    <transition name="fade">
      <div class="modal-overlay" @click="$emit('closeModal')" v-if="visible"></div>
    </transition>
    <transition name="fade">
      <div class="modal" v-if="visible">
        <button @click="$emit('closeModal')" class="tw-absolute tw-text-sm tw-text-red-500" style="top: 12px; right: 12px">
          <fa-icon icon="times" />
        </button>
        <div class="tw-relative tw-overflow-scroll">
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
  emits: ['closeModal'],
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
    margin-bottom: 15px;

    @apply text-black font-bold;
  }

  p {
    color: #666;
    font-size: 18px;
    font-weight: 400;
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