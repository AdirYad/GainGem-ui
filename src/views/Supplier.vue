<template>
  <div>
    <div class="tw-flex tw-flex-col lg:tw-flex-row">
      <div class="tw-flex tw-flex-1 tw-bg-white tw-shadow-md">
        <Tabs class="tw-min-h-12 tw-w-full">
          <Tab name="Groups" query="groups">
            <Groups />
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
import Groups from '@/components/Suppliers/Groups';
import Payments from '@/components/Suppliers/Payments';

export default {
  name: 'Supplier',
  title: 'Supplier',
  components: {
    Tab,
    Tabs,
    Groups,
    Payments,
  },
}
</script>