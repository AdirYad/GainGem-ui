<template>
  <article>
    <header class="tw-h-12 tw-w-full">
      <ul class="tw-flex tw-h-full tw-w-full tw-overflow-scroll tw-relative">
        <li v-for="(tab, index) in tabs" :key="index"
            class="tw-flex tw-items-center tw-justify-center tw-border-t-2 tw-border-transparent tw-text-xs lg:tw-text-sm tw-uppercase tw-font-light tw-cursor-pointer tw-relative tw-flex-none tw-font-medium" :class="{ 'tw-flex tw-items-center tw-text-primary tw-border-t-2 tw-border-primary': tab.isActive }"
            @click="selectTab(tab)"
        >
          <div class="tw-px-6">
        {{ tab.name }}
          </div>
        </li>
      </ul>
    </header>
    <hr>
    <section class="tw-p-4">
      <slot />
    </section>
  </article>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from "vue-router";
import router from "@/router";

export default {
  name: 'Tabs',
  setup() {
    const route = useRoute();
    const tabs = ref([]);

    const selectTab = ({ name }) => {
      tabs.value.forEach(tab => {
        tab.isActive = tab.name === name || tab.query === name;

        if (tab.name === name) {
          router.push({ name: 'Profile', query: { tab: tab.query } });
        }
      });
    };

    if (route.query.tab) {
      setTimeout(() => {
        selectTab({ name: route.query.tab });
      }, 0);
    }

    return {
      tabs,
      selectTab,
    }
  },
}
</script>