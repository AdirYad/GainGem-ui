<template>
  <div class="tw-flex tw-flex-wrap">
    <div class="tw-w-full tw-mb-4">
      <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="username">
        Search Users
      </label>
      <input id="username" type="text" placeholder="Username" autocomplete="off"
             class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
             v-model="username"
             @input="debounceSearchUsers"
      >
    </div>
  </div>
  <div class="full-size-table tw-rounded-lg tw-overflow-scroll tw-mb-4">
    <table class="unresponsive-table tw-w-full tw-flex sm:tw-bg-white tw-shadow-lg tw-overflow-hidden">
      <thead class="tw-text-white">
        <tr class="tw-bg-primary tw-table-row tw-rounded-l-lg sm:tw-rounded-none">
          <th class="tw-p-3 tw-text-left sm:tw-w-10">#</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Username</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Email</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Confirmation</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">IP</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Balance</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Total</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Transactions</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-10">Referrals</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Referred by</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Banned</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Reason</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Role</th>
          <th class="tw-p-3 tw-text-left sm:tw-w-40">Actions</th>
        </tr>
      </thead>
      <tbody class="tw-flex-1 sm:tw-flex-none">
        <tr v-if="usersObj.users" v-for="(user, index) in usersObj.users" :key="index"  class="tw-table-row">
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="user.id" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="user.username" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="user.email" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="user.formatted_email_verified_at" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="user.ip" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="user.formatted_available_points" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="user.formatted_total_points" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="user.withdraws" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="user.referrals" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="user.referred_by ? user.referred_by.username : ''" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="user.formatted_banned_at" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="user.banned_at ? user.ban_reason : ''" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-p-3" v-text="user.role" />
          <td class="tw-border-grey-light tw-border hover:tw-bg-gray-100 tw-px-3 tw-py-1">
            <div class="tw-flex">
              <button v-if="$store.getters.isRoleSuperAdmin && user.role === Roles.Admin || user.id !== $store.state.user.id && ! $store.getters.isRoleSuperAdmin && ! $store.getters.isRoleAdmin || user.role === Roles.User || user.role === Roles.Supplier" @click="openEditModal(user)" class="tw-w-8 tw-h-8 tw-inline tw-duration-300 tw-bg-gray-300 tw-text-blue-500 tw-rounded-full hover:tw-bg-blue-500 hover:tw-text-white tw-mr-2">
                <fa-icon icon="cog" />
              </button>
              <template v-if="user.role !== Roles.Admin && user.role !== Roles.SuperAdmin">
                <button v-if="! user.banned_at" @click="openBanModal(user)" class="tw-w-8 tw-h-8 tw-inline tw-duration-300 tw-bg-gray-300 tw-text-red-500 tw-rounded-full hover:tw-text-white hover:tw-bg-red-500 tw-mr-2">
                  <fa-icon icon="gavel" />
                </button>
                <button v-else @click="unban(user)" class="tw-w-8 tw-h-8 tw-inline tw-duration-300 tw-bg-gray-300 tw-text-green-500 tw-rounded-full hover:tw-text-white hover:tw-bg-green-500 tw-mr-2">
                  <fa-icon icon="unlock-alt" />
                </button>
              </template>
              <router-link v-if="user.role !== 'super_admin' || $store.getters.isRoleSuperAdmin" :to="{ name: 'Profile', query: { tab: 'details', user: user.id, back: page } }" class="tw-w-8 tw-h-8 tw-flex tw-justify-center tw-items-center tw-duration-300 tw-bg-gray-300 tw-text-green-500 tw-rounded-full hover:tw-text-white hover:tw-bg-green-500">
                <fa-icon :icon="['far', 'eye']" />
              </router-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="! usersObj.users" class="tw-flex tw-justify-center tw-items-center tw-w-full tw-my-6">
    <LoopingRhombusesSpinner
        :animation-duration="2500"
        :rhombus-size="25"
        color="var(--primary-color)"
    />
  </div>

  <Pagination v-if="usersObj.pagination" v-model="page" :records="usersObj.pagination.total" :per-page="usersObj.pagination.per_page" @paginate="searchUsers" :options="{ chunk: 5, edgeNavigation: true }" />
  <VModal v-model:visible="modal.visible">
    <form v-if="modal.type === 'edit'" @submit.prevent="edit" class="tw-px-2">
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-w-full tw-mb-4"
             :class="{ 'sm:tw-w-1/2 xl:tw-w-64 sm:tw-pr-2' : modal.user.role !== Roles.SuperAdmin && ($store.getters.isRoleSuperAdmin || modal.user.role !== Roles.Admin) }"
        >
          <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="points">
            Add Points
          </label>
          <input id="points" type="number" min="1" max="999999" placeholder="Points"
                 onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                 class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
                 v-model="modal.points"
          >
        </div>
        <div v-if="modal.user.role !== Roles.SuperAdmin && ($store.getters.isRoleSuperAdmin || modal.user.role !== Roles.Admin)" class="tw-w-full sm:tw-w-1/2 xl:tw-w-64 tw-mb-4 sm:tw-pl-2">
          <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="role">
            Role
          </label>
          <select v-model="modal.role" id="role" class="select tw-duration-300 tw-shadow tw-border tw-w-full tw-rounded-md tw-py-1 tw-px-4 tw-text-gray-500 focus:tw-outline-none" style="height: 38px">
            <option :value="Roles.User">
              User
            </option>
            <option :value="Roles.Supplier">
              Supplier
            </option>
            <option v-if="$store.getters.isRoleSuperAdmin" :value="Roles.Admin">
              Admin
            </option>
          </select>
        </div>
      </div>
      <button class="tw-w-full sm:tw-w-40 tw-text-white tw-text-xl tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-py-1" type="submit">
        Save
      </button>
    </form>
    <form v-else @submit.prevent="ban" class="tw-px-2">
      <div class="tw-w-full tw-mb-4">
        <label class="tw-flex-1 tw-text-primary tw-block tw-text-sm tw-font-bold tw-mb-2" for="reason">
          Ban Reason
        </label>
        <input id="reason" type="text" placeholder="Ban Reason"
               class="input tw-duration-300 tw-shadow tw-appearance-none tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-gray-500 tw-leading-tight focus:tw-outline-none"
               v-model="modal.ban_reason"
        >
      </div>
      <button class="tw-w-full sm:tw-w-40 tw-text-white tw-text-xl tw-uppercase tw-border tw-border-primary tw-bg-primary tw-rounded-full tw-py-1" type="submit">
        Ban
      </button>
    </form>
  </VModal>
</template>

<script>
const debounce = require('debounce');
import Pagination from 'v-pagination-3';
import VModal from '@/components/VModal';
import { LoopingRhombusesSpinner } from 'epic-spinners';
import { Roles } from '@/_helpers/roles';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { ref, reactive } from "vue";

export default {
  name: 'Admin.Users',
  components: {
    Pagination,
    VModal,
    LoopingRhombusesSpinner,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const usersObj = ref({});
    const page = ref(route.query.page && parseInt(route.query.page) ? parseInt(route.query.page) : 1);
    const previousUsername = ref('');
    const username = ref('');
    const modal = reactive({
      user: null,
      visible: false,
      type: null,
    });

    const debounceSearchUsers = debounce( () => {
      page.value = 1;
      searchUsers();
    }, 200);

    searchUsers();

    return {
      Roles,
      usersObj,
      page,
      username,
      modal,
      debounceSearchUsers,
      searchUsers,
      openEditModal,
      openBanModal,
      unban,
      edit,
      ban,
    };

    function searchUsers() {
      if (previousUsername.value !== username.value) {
        usersObj.value = {};
      } else {
        delete usersObj.value.users;
      }

      previousUsername.value = username.value;

      store.dispatch('getUsers', { username: username.value, page: page.value}).then((response) => {
        usersObj.value = response.data;

        if (usersObj.value.pagination.last_page < page.value) {
          page.value = 1;

          searchUsers();
        }
      });
    }

    function openEditModal(user) {
      modal.user = user;
      modal.visible = true;
      modal.role = user.role;
      modal.points = null;
      modal.type = 'edit';
    }

    function openBanModal(user) {
      modal.user = user;
      modal.visible = true;
      modal.ban_reason = '';
      modal.type = 'ban';
    }

    function unban(user) {
      store.dispatch('unbanUser', user.id).then((response) => {
        user.banned_at = response.data.user.banned_at;
        user.ban_reason = response.data.user.ban_reason;
        user.formatted_banned_at = response.data.user.formatted_banned_at;
      });
    }

    function edit() {
      const payload = {
        user_id: modal.user.id,
        points: modal.points,
        role: modal.role,
      };

      store.dispatch('updateUser', payload).then((response) => {
        modal.visible = false;
        modal.user.formatted_available_points = response.data.user.points;
        modal.user.formatted_total_points = response.data.user.total_points;
        modal.user.role = response.data.user.role;

        if (! response.data.user.banned_at) {
          modal.user.banned_at = null;
          modal.user.ban_reason = null;
          modal.user.formatted_banned_at = null;
        }

        store.dispatch('addNotification', {
          type: 'success',
          message: 'User details saved successfully!',
        });
      }).catch((err) => {
        if (err.response.status === 422) {
          if (err.response.data.errors) {
            store.dispatch('addNotification', {
              type: 'error',
              message: err.response.data.errors.points ? err.response.data.errors.points[0] : err.response.data.errors.role[0],
            });
          } else {
            store.dispatch('addNotification', {
              type: 'error',
              message: err.response.data.message,
            });
          }
        }
      });
    }

    function ban() {
      const payload = {
        user_id: modal.user.id,
        ban_reason: modal.ban_reason
      };

      if (! payload.ban_reason) {
        store.dispatch('addNotification', {
          type: 'error',
          message: 'You need to enter a reason!',
        });

        return;
      }

      store.dispatch('banUser', payload).then((response) => {
        modal.visible = false;
        modal.user.banned_at = response.data.user.banned_at;
        modal.user.ban_reason = response.data.user.ban_reason;
        modal.user.formatted_banned_at = response.data.user.formatted_banned_at;

        store.dispatch('addNotification', {
          type: 'success',
          message: 'User has banned successfully!',
        });
      }).catch((err) => {
        if (err.response.status === 422) {
          store.dispatch('addNotification', {
            type: 'error',
            message: err.response.data.errors && err.response.data.errors.ban_reason ? err.response.data.errors.ban_reason[0] : err.response.data.message,
          });
        }
      });
    }
  },
}
</script>
