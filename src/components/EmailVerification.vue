<template>
  <div class="tw-px-4 md:tw-px-8 lg:tw-px-10 tw-pt-8 lg:tw-pt-10">
    <div class="tw-border-2 tw-border-primary tw-text-primary tw-rounded-lg tw-w-full tw-px-4 md:tw-px-8 tw-py-4 tw-flex tw-justify-between tw-items-center tw-text-sm">
      <template v-if="! hasSentVerification">
        <div>
          You need to verify your email address for better experience
        </div>
        <button @click="resendEmailVerification" class="tw-h-full tw-ml-2 md:tw-ml-4">
          Resend
        </button>
      </template>
      <template v-else>
        <div>
          We have successfully sent an email to {{ $store.state.user.email }}
        </div>
        <button @click="$store.commit('tempEmailVerification')" class="tw-h-full tw-ml-2 md:tw-ml-4">
          Close
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {
  name: 'EmailVerification',
  setup() {
    const store = useStore();
    const hasSentVerification = ref(false);

    const resendEmailVerification = () => {
      store.dispatch('resendEmailVerification').then(() => {
        hasSentVerification.value = true;
      })
      .catch((err) => {
        if (err.response.status === 422 && err.response.data.message === 'verified') {
          store.dispatch('getLoggedUser');
        }
      });
    }

    return {
      resendEmailVerification,
      hasSentVerification,
    }
  },
}
</script>
