<template>
  <div class="tw-flex tw-flex-wrap">
    <div class="tw-w-full tw-mb-4">
      <form @submit.prevent="create">
        <div class="tw-flex tw-flex-wrap">
          <div class="tw-w-full sm:tw-w-1/2 tw-mb-4 sm:tw-pr-2">
            <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="cookie">
              Cookie
            </label>
            <input id="cookie" type="text" placeholder="Cookie"
                   class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                   v-model="payload.cookie"
                   :class="{ 'input-invalid tw-mb-3' : v$.cookie.$invalid || errors.cookie }"
                   @keydown="resetErrors('cookie')"
            >
            <p v-if="v$.cookie.$error" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ v$.cookie.$errors[0].$message }}
            </p>
            <p v-else-if="errors.cookie" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ errors.cookie[0] }}
            </p>
          </div>
          <div class="tw-w-full sm:tw-w-1/2 tw-mb-4 sm:tw-px-2">
            <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="robux_group_id">
              Group ID
            </label>
            <input id="robux_group_id" type="number" min="1" placeholder="Group ID"
                   onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                   class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                   v-model="payload.robux_group_id"
                   :class="{ 'input-invalid tw-mb-3' : v$.robux_group_id.$invalid || errors.robux_group_id }"
                   @keydown="resetErrors('robux_group_id')"
            >
            <p v-if="v$.robux_group_id.$error" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ v$.robux_group_id.$errors[0].$message }}
            </p>
            <p v-else-if="errors.robux_group_id" class="tw-text-red-500 tw-text-xs tw-italic">
              {{ errors.robux_group_id[0] }}
            </p>
          </div>
          <div class="tw-w-full tw-text-center">
            <button class="tw-h-full tw-w-full sm:tw-w-40 tw-text-white tw-text-xl tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-py-1" type="submit">
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <div class="full-size-table tw-rounded-lg tw-overflow-scroll tw-mb-4">
    <table class="unresponsive-table tw-w-full tw-flex sm:tw-bg-white tw-shadow-lg tw-overflow-hidden">
      <thead class="tw-text-white">
        <tr class="tw-bg-primary tw-table-row tw-rounded-l-lg sm:tw-rounded-none">
          <th class="tw-p-3 tw-text-left sm:tw-w-10">#</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40" style="white-space: nowrap">Group ID</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40" style="white-space: nowrap">Owner Username</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40" style="white-space: nowrap">Robux Left</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Status</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Actions</th>
        </tr>
      </thead>
      <tbody class="tw-flex-1 sm:tw-flex-none">
        <tr v-if="groupsObj.groups" v-for="(group, index) in groupsObj.groups" :key="index"  class="tw-table-row">
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="group.id" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="group.robux_group_id" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="group.robux_owner_username" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="group.robux_amount" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3">
            <div class="tw-text-xs tw-rounded-xl tw-text-white tw-font-bold tw-text-center tw-inline-block tw-w-20 tw-px-4 tw-py-1"
                 :class="! group.disabled_at ? 'tw-bg-green-500' : 'tw-bg-red-500'"
            >
              {{ ! group.disabled_at ? 'Active' : 'Inactive' }}
            </div>
          </td>
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-px-3 tw-py-1">
            <div class="tw-flex">
              <button @click="refresh(group)"
                      class="tw-w-8 tw-h-8 tw-inline tw-duration-300 tw-bg-gray-300 tw-text-blue-500 tw-rounded-full hover:tw-bg-blue-500 hover:tw-text-white tw-mr-2"
                      :class="{ 'rotating' : group.isRefreshing }"
              >
                <fa-icon icon="sync-alt" />
              </button>
              <button @click="destroy(group)" class="tw-w-8 tw-h-8 tw-inline tw-duration-300 tw-bg-gray-300 tw-text-red-500 tw-rounded-full hover:tw-text-white hover:tw-bg-red-500">
                <fa-icon :icon="['far', 'trash-alt']" />
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

  <BarChart :data="chartData" :options="options" />

  <Pagination v-if="groupsObj.pagination" v-model="page" :records="groupsObj.pagination.total" :per-page="groupsObj.pagination.per_page" @paginate="getRobuxGroups" :options="{ chunk: 5 }" />
</template>

<script>
import Pagination from 'v-pagination-3';
import { LoopingRhombusesSpinner } from 'epic-spinners';
import BarChart from '../BarChart';
import useVuelidate from '@vuelidate/core';
import { maxLength, minLength, required, minValue, maxValue } from '@vuelidate/validators';
import { useStore } from 'vuex';
import { ref, reactive, toRef } from 'vue';

export default {
  name: 'Admin.PromoCodes',
  components: {
    Pagination,
    LoopingRhombusesSpinner,
    BarChart,
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  setup() {
    const store = useStore();

    const isCreating = ref(false);
    const groupsObj = ref({});
    const page = ref(1);
    const payload = reactive({
      cookie: '',
      robux_group_id: null,
    });
    const chartData = reactive({
      labels: ["Babol",	"Cabanatuan",	"Daegu",	"Jerusalem",	"Fairfield",	"New York",	"Gangtok", "Buenos Aires", "Hafar Al-Batin", "Idlib"],
      datasets: [
        {
          label: 'Line Chart',
          data: [600,	1150,	342,	6050,	2522,	3241,	1259,	157,	1545, 9841],
          fill: false,
          borderColor: '#2554FF',
          backgroundColor: '#2554FF',
          borderWidth: 1
        }
      ]
    });
    const options = reactive({
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            display: true
          }
        }],
        xAxes: [ {
          gridLines: {
            display: false
          }
        }]
      },
      legend: {
        display: true
      },
      responsive: true,
      maintainAspectRatio: false
    });

    const errors = ref({});

    const rules = {
      cookie: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(1000),
      },
      robux_group_id: {
        required,
        minValue: minValue(1),
        maxValue: maxValue(9999999999),
      },
    };

    const v$ = useVuelidate(rules, {
      cookie: toRef(payload, 'cookie'),
      robux_group_id: toRef(payload, 'robux_group_id'),
    });

    getRobuxGroups();

    return {
      groupsObj,
      page,
      payload,
      errors,
      v$,
      chartData,
      options,
      getRobuxGroups,
      destroy,
      create,
      refresh,
      resetErrors,
    };

    function getRobuxGroups() {
      delete groupsObj.value.groups;

      const payload = {
        page: page.value,
        user_id: store.state.user.id
      }

      store.dispatch('getRobuxGroups', payload).then((response) => {
        groupsObj.value = response.data;
      });
    }

    function destroy(group) {
      store.dispatch('deleteRobuxGroup', group.id).then(() => {
        groupsObj.value.groups.splice(groupsObj.value.groups.indexOf(group), 1);
        groupsObj.value.pagination.total--;

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Group removed successfully!',
        });

        if (page.value > 1 && groupsObj.value.pagination.total <= 10) {
          page.value = 1;

          getRobuxGroups();
        }
      });
    }

    function refresh(group) {
      if (group.isRefreshing) {
        return;
      }

      group.isRefreshing = true;

      store.dispatch('refreshRobuxGroup', group.id).then((response) => {
        group.robux_owner_username = response.data.robux_owner_username;
        group.robux_amount = response.data.robux_amount;
        group.disabled_at = response.data.disabled_at;

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Group refreshed successfully!',
        });

        group.isRefreshing = false;
      }).catch((err) => {
        store.dispatch('addNotification', {
          type: 'error',
          message: err.response.data.message,
        });

        group.isRefreshing = false;
      });
    }

    function create() {
      v$.value.$touch();

      if (v$.value.$invalid || isCreating.value) {
        return;
      }

      errors.value = {};
      isCreating.value = true;

      store.dispatch('storeRobuxGroup', payload).then((response) => {
        v$.value.$reset();

        payload.cookie = '';
        payload.robux_group_id = null;
        groupsObj.value.groups.unshift(response.data);
        groupsObj.value.pagination.total++;

        store.dispatch('addNotification', {
          type: 'success',
          message: 'Group created successfully!',
        });

        isCreating.value = false;
      }).catch((err) => {
        if (err.response.status === 422) {
          if (err.response.data.errors) {
            errors.value = err.response.data.errors;
          } else {
            store.dispatch('addNotification', {
              type: 'error',
              message: err.response.data.message,
            });
          }
        }

        isCreating.value = false;
      });
    }

    function resetErrors(key) {
      v$.value[key].$reset();
      delete errors.value[key];
    }
  },
}
</script>

<style scoped>
@-webkit-keyframes rotating {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.rotating {
  -webkit-animation: rotating 1s linear infinite;
  -moz-animation: rotating 1s linear infinite;
  -ms-animation: rotating 1s linear infinite;
  -o-animation: rotating 1s linear infinite;
  animation: rotating 1s linear infinite;
}
</style>