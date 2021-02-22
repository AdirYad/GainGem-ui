<template>
  <div>
    <div class="tw-flex tw-flex-col lg:tw-flex-row">
      <div class="tw-flex tw-flex-1 tw-bg-white tw-shadow-md">
        <Tabs class="tw-min-h-12 tw-w-full">
          <Tab name="Accounts" query="accounts">
            <Accounts />
          </Tab>
          <Tab v-if="$store.getters.isRoleSupplier" name="Payments" query="payments">
            <Payments />
          </Tab>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Tab from '@/components/Tab'
import Tabs from "@/components/Tabs";
import Accounts from '@/components/Suppliers/Accounts';
import Payments from '@/components/Suppliers/Payments';

export default {
  name: 'Supplier',
  title: 'Supplier',
  components: {
    Tab,
    Tabs,
    Accounts,
    Payments,
  },
}
</script>