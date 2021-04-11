<template>
  <div v-if="! isLoading">
    <div class="tw-flex tw-flex-col lg:tw-flex-row">
      <div class="tw-flex tw-flex-1 tw-bg-white tw-shadow-md">
        <Tabs @changedRoute="getSupplier" class="tw-min-h-12 tw-w-full">
          <Tab name="Accounts" query="accounts">
            <Accounts :supplier="supplier" />
          </Tab>
          <Tab v-if="$store.getters.isRoleSupplier || supplier.not_authenticated" name="Payments" query="payments">
            <Payments :supplier="supplier" />
          </Tab>
        </Tabs>
      </div>
    </div>
  </div>

  <div v-else class="tw-absolute tw-top-0 tw-left-0 tw-flex tw-justify-center tw-items-center tw-h-screen tw-w-full">
    <LoopingRhombusesSpinner
        class="tw-z-10"
        :animation-duration="2500"
        :rhombus-size="40"
        color="var(--primary-color)"
    />
  </div>
</template>

<script>
import Tab from '@/components/Tab'
import Tabs from "@/components/Tabs";
import Accounts from '@/components/Suppliers/Accounts';
import Payments from '@/components/Suppliers/Payments';
import { LoopingRhombusesSpinner } from 'epic-spinners';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import router from "@/router";

export default {
  name: 'Supplier',
  title: 'Supplier',
  components: {
    Tab,
    Tabs,
    Accounts,
    Payments,
    LoopingRhombusesSpinner,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const supplier = ref(store.state.user);
    const isLoading = ref(false);

    getSupplier();

    return {
      supplier,
      isLoading,
      getSupplier,
    }

    function getSupplier() {
      if (! store.getters.isRoleSuperAdmin || supplier.value.id === parseInt(route.query.supplier)) {
        return;
      }

      if (! (route.query.supplier && parseInt(route.query.supplier) && parseInt(route.query.supplier) !== store.state.user.id)) {
        isLoading.value = true;

        setTimeout(() => {
          supplier.value = store.state.user;
          isLoading.value = false;
        }, 0);

        return;
      }

      isLoading.value = true;

      store.dispatch('getSupplier', parseInt(route.query.supplier)).then((response) => {
        response.data.not_authenticated = true;
        supplier.value = response.data;

        isLoading.value = false;
      }).catch(() => {
        router.push({ name: 'Admin', query: { tab: 'suppliers' } })
      });
    }
  }
}
</script>