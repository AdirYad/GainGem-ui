<template>
  <div class="tw-flex tw-justify-center tw-items-center tw-flex-wrap tw-mb-2">
    <button class="tw-duration-300 tw-border-2 tw-border-primary tw-rounded-xl tw-text-primary tw-text-xs hover:tw-bg-primary hover:tw-text-white tw-font-bold tw-text-center tw-inline-block tw-px-8 tw-py-2"
            @click="openEditGlobalRateModal"
    >
      Change Global Rate
    </button>
  </div>
  <div class="tw-flex tw-justify-center tw-items-center tw-flex-wrap" :class="{ 'tw-mb-4' : chosenType }">
    <template v-for="(type, index) in ['Suppliers', 'Groups', 'Payments']" :key="index">
      <button
              class="tw-duration-300 tw-border-2 tw-border-primary tw-rounded-xl tw-text-xs hover:tw-bg-primary hover:tw-text-white tw-font-bold tw-text-center tw-inline-block tw-px-4 tw-py-1 tw-m-2"
              :class="type === chosenType ? 'tw-bg-primary tw-text-white' : 'tw-text-primary'"
              @click="chosenType = type"
      >
        {{ type }}
      </button>
    </template>
  </div>

  <Index v-if="chosenType === 'Suppliers'" />
  <Bitcoin v-else-if="chosenType === 'bitcoin'" />
  <GiftCard v-else-if="chosenType" :provider="chosenType" :points-value="pointsValue" />

  <VModal v-model:visible="modal.visible">
    <form @submit.prevent="updatePointsValue" class="tw-px-2">
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-w-full tw-mb-4">
          <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="edit_points">
            Points Value
          </label>
          <input id="edit_points" type="number" min="1" max="10000" placeholder="Value"
                 onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                 class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                 v-model="modal.points"
          >
        </div>
      </div>
      <button class="tw-w-full sm:tw-w-40 tw-text-white tw-text-xl tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-py-1" type="submit">
        Save
      </button>
    </form>
  </VModal>
</template>

<script>
import Pagination from 'v-pagination-3';
import GiftCard from '@/components/Admin/Rewards/GiftCard';
import Index from '@/components/Admin/Suppliers/Index';
import Bitcoin from '@/components/Admin/Rewards/Bitcoin';
import VModal from '@/components/VModal';
import { useStore } from 'vuex';
import { ref, reactive } from 'vue';

export default {
  name: 'Admin.Suppliers',
  components: {
    Pagination,
    GiftCard,
    Index,
    Bitcoin,
    VModal,
  },
  setup() {
    const store = useStore();

    const chosenType = ref(null);

    const pointsValue = ref(40);
    const modal = reactive({
      visible: false,
      points: null,
    });

    store.dispatch('getPointsValue').then((response) => {
      pointsValue.value = response.data;
      modal.points = response.data;
    });

    return {
      chosenType,
      pointsValue,
      modal,
      openEditGlobalRateModal,
      updatePointsValue,
    };

    function openEditGlobalRateModal() {
      modal.visible = true;
      modal.points = pointsValue.value;
    }

    function updatePointsValue() {
      store.dispatch('updatePointsValue', modal.points).then((response) => {
        modal.visible = false;
        pointsValue.value = response.data;

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Points value saved successfully!',
        });
      }).catch((err) => {
        if (err.response.status === 422) {
          if (err.response.data.errors && err.response.data.errors.points)
            store.dispatch('addNotification', {
              type: 'error',
              message: err.response.data.errors.points[0],
            });
          } else {
            store.dispatch('addNotification', {
              type: 'error',
              message: err.response.data.message,
            });
          }
      });
    }
  },
}
</script>