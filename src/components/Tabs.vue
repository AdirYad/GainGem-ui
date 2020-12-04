<template>
    <article>

        <!--        <div class="tw-flex tw-h-12 tw-w-full">-->
        <!--          <button @click="selectTab(tab)" v-for="(tab, index) in $store.state.tabs" :key="index"-->
        <!--                  class="tw-flex tw-items-end tw-justify-center tw-truncate tw-text-xs lg:tw-text-sm
                            tw-uppercase tw-font-light tw-h-12 tw-w-1/4"-->
        <!--          >-->
        <!--            <div v-if="tab.isActive" :class="{ 'isActive': tab.isActive }"-->
        <!--                 class="tw-flex tw-items-end tw-justify-center tw-text-sm lg:tw-text-base tw-text-primary tw-font-bold tw-border-t-2 tw-border-primary tw-h-full tw-w-full">-->
        <!--              {{ tab.name }}-->
        <!--            </div>-->
        <!--            <div v-else>-->
        <!--              {{ tab.name }}-->
        <!--            </div>-->
        <!--          </button>-->
        <!--        </div>-->
        <header class="tw-h-12 tw-w-full">
            <ul class="tw-h-full tw-w-full">
                <li v-for="(tab, index) in tabs" :key="index"
                    class="tw-flex tw-items-end tw-justify-center tw-text-xs lg:tw-text-sm tw-uppercase tw-font-light tw-w-1/4 nav-item" :class="{ 'is-active': tab.isActive }"
                    @click="selectTab(tab)">
                    {{ tab.name }}
                </li>
            </ul>
        </header>
        <section class="tabs-details">
            <slot />
        </section>
    </article>
</template>

<script>
import { ref } from 'vue';

export default {
    name: "Tabs",
    setup() {
        const tabs = ref([]);

        let selectTab = (selectedTab) => {
            tabs.value.forEach(tab => tab.isActive = tab.name === selectedTab.name);
        };

        return {
            tabs,
            selectTab,
        }
    },
}
</script>

<style scoped>
.tabs-details {
    padding: 10px;
}

ul {
    display: flex;

    .nav-item{
        cursor: pointer;

        &:hover{
            @apply text-primary font-bold;
        }

        &.is-active{
            @apply text-primary font-bold border-t-2 border-primary;
        }
    }
}
</style>