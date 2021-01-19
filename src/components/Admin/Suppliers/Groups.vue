<template>
  <div class="full-size-table tw-rounded-lg tw-overflow-scroll tw-mb-4">
    <table class="unresponsive-table tw-w-full tw-flex sm:tw-bg-white tw-shadow-lg tw-overflow-hidden">
      <thead class="tw-text-white">
        <tr class="tw-bg-primary tw-table-row tw-rounded-l-lg sm:tw-rounded-none">
          <th class="tw-p-3 tw-text-left sm:tw-w-10">#</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Withdrawn</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40" style="white-space: nowrap">Robux</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40" style="white-space: nowrap">Group ID</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40" style="white-space: nowrap">Owner ID</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Cookie</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Status</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Actions</th>
        </tr>
      </thead>
      <tbody class="tw-flex-1 sm:tw-flex-none">
        <tr v-if="groupsObj.groups" v-for="(group, index) in groupsObj.groups" :key="index" class="tw-table-row">
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="group.id" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="group.formatted_total_withdrawn" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="group.formatted_robux_amount" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="group.robux_group_id" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="group.robux_owner_id" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="group.cookie" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3">
            <div class="tw-text-xs tw-rounded-xl tw-text-white tw-font-bold tw-text-center tw-inline-block tw-w-20 tw-px-4 tw-py-1"
                 :class="group.disabled_at ? 'tw-bg-red-500' : 'tw-bg-green-500'"
            >
              {{ group.disabled_at ? 'Inactive' : 'Active' }}
            </div>
          </td>
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-px-3 tw-py-1">
            <div class="tw-flex">
              <button v-if="! group.disabled_at" @click="disableRobuxGroup(group)" class="tw-w-8 tw-h-8 tw-inline tw-duration-300 tw-bg-gray-300 tw-text-red-500 tw-rounded-full hover:tw-text-white hover:tw-bg-red-500">
                <fa-icon icon="lock" />
              </button>
              <button v-else @click="enableRobuxGroup(group)" class="tw-w-8 tw-h-8 tw-inline tw-duration-300 tw-bg-gray-300 tw-text-green-500 tw-rounded-full hover:tw-text-white hover:tw-bg-green-500">
                <fa-icon icon="unlock-alt" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="! groupsObj.groups" class="tw-flex tw-justify-center tw-items-center tw-w-full tw-my-6">
    <LoopingRhombusesSpinner
        :animation-duration="2500"
        :rhombus-size="25"
        color="var(--primary-color)"
    />
  </div>

  <Pagination v-if="groupsObj.pagination" v-model="page" :records="groupsObj.pagination.total" :per-page="groupsObj.pagination.per_page" @paginate="getRobuxGroups" :options="{ chunk: 5 }" />
</template>

<script>
import Pagination from 'v-pagination-3';
import { LoopingRhombusesSpinner } from 'epic-spinners';
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {
  name: 'Admin.SupplierGroups',
  components: {
    Pagination,
    LoopingRhombusesSpinner,
  },
  setup() {
    const store = useStore();

    const groupsObj = ref({});
    const page = ref(1);

    getRobuxGroups();

    return {
      groupsObj,
      page,
      getRobuxGroups,
      disableRobuxGroup,
      enableRobuxGroup,
    };

    function getRobuxGroups() {
      delete groupsObj.value.groups;

      store.dispatch('getRobuxGroups', { page: page.value }).then((response) => {
        groupsObj.value = response.data;
      });
    }

    function disableRobuxGroup(group) {
      store.dispatch('disableRobuxGroup', group.id).then((response) => {
        group.disabled_at = response.data.disabled_at;
        group.formatted_disabled_at = response.data.formatted_disabled_at;
      });
    }

    function enableRobuxGroup(group) {
      store.dispatch('enableRobuxGroup', group.id).then((response) => {
        group.disabled_at = response.data.disabled_at;
        group.formatted_disabled_at = response.data.formatted_disabled_at;
      });
    }
  },
}
</script>