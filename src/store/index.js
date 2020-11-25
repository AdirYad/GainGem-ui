import { createStore } from 'vuex'
import { axiosInstance } from '@/_helpers/axios';
import router from "@/router";

export default createStore({
  state: {
    notifications: [],
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null,
    token: localStorage.getItem('token') || null,
    offerwalls: [
      {
        background: '#369ee0',
        image: require('@/assets/images/offerwalls/adgatemedia.png'),
        provider: 'adgatemedia',
      },
      {
        background: '#fff',
        image: require('@/assets/images/offerwalls/adgem.png'),
        provider: 'adgem',
      },
      {
        background: '#11455b',
        image: require('@/assets/images/offerwalls/cpxresearch.png'),
        provider: 'cpxresearch',
      },
      {
        background: '#30b0d5',
        image: require('@/assets/images/offerwalls/lootably.png'),
        provider: 'lootably',
      },
      {
        background: '#233649',
        image: require('@/assets/images/offerwalls/ayet-studios.png'),
        provider: 'ayetstudios',
      },
      {
        background: '#2a303c',
        image: require('@/assets/images/offerwalls/offertoro.png'),
        provider: 'offertoro',
      },
    ],
    rewards: [
      {
        name: 'Robux',
        image: require('@/assets/images/rewards/robux.png'),
        provider: 'robux',
        stock: true,
      },
      {
        name: 'Bitcoin',
        image: require('@/assets/images/rewards/bitcoin.png'),
        provider: 'bitcoin',
        stock: true,
      },
      {
        name: 'App Store',
        image: require('@/assets/images/rewards/apple.png'),
        provider: 'apple',
        stock: true,
      },
      {
        name: 'Xbox',
        image: require('@/assets/images/rewards/xbox.png'),
        provider: 'xbox',
        stock: false,
      },
      {
        name: 'Roblox Gifts',
        image: require('@/assets/images/rewards/roblox.png'),
        provider: 'roblox',
        stock: true,
      },
      {
        name: 'Psn',
        image: require('@/assets/images/rewards/psn.png'),
        provider: 'psn',
        stock: true,
      },
      {
        name: 'Google Play',
        image: require('@/assets/images/rewards/googleplay.png'),
        provider: 'googleplay',
        stock: true,
      },
      {
        name: 'Netflix',
        image: require('@/assets/images/rewards/netflix.png'),
        provider: 'netflix',
        stock: true,
      },
      {
        name: 'Spotify',
        image: require('@/assets/images/rewards/spotify.png'),
        provider: 'spotify',
        stock: true,
      },
      {
        name: 'Discord',
        image: require('@/assets/images/rewards/discord.png'),
        provider: 'discord',
        stock: true,
      },
    ],
  },
  getters: {
    isLoggedIn: (state) => typeof state.token === "string",
  },
  mutations: {
    pushNotification(state, notification) {
      state.notifications.push({
        ...notification,
        id: (Math.random().toString(36) + Date.now().toString(36)).substr(2),
      });
    },

    removeNotification(state, notificationToRemove) {
      state.notifications = state.notifications.filter(notification => notification.id !== notificationToRemove.id);
    },

    setToken(state, { token }) {
      state.token = token;
      localStorage.setItem('token', token);
    },

    removeToken(state) {
      state.token = null;
      localStorage.removeItem('token');
    },

    setUser(state, { user }) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },

    removeUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    },

    tempEmailVerification(state) {
      state.user.email_verified_at = 1;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
  },
  actions: {
    addNotification({ commit }, notification) {
      commit('pushNotification', notification);
    },
    removeNotification({ commit }, notification) {
      commit('removeNotification', notification);
    },
    login({ commit, getters }, payload) {
      if (getters.isLoggedIn) {
        return;
      }

      return axiosInstance.post('/auth/login', payload).then(response => {
        commit('setUser', response.data);
        commit('setToken', response.data);
      });
    },
    register({ commit, getters }, payload) {
      if (getters.isLoggedIn) {
        return;
      }

      return axiosInstance.post('/auth/register', payload).then(response => {
        commit('setUser', response.data);
        commit('setToken', response.data);
      });
    },
    logout({ commit }) {
      commit('removeUser');
      commit('removeToken');
    },
    getLoggedUser({ commit, getters, state }) {
      if (! getters.isLoggedIn) {
        return;
      }

      axiosInstance.post('/auth/user', state.token).then((response) => {
        commit('setUser', response.data);
      }).catch(() => {
        commit('removeUser');
        commit('removeToken');

        router.push({ name: 'Home' });
      });
    },
    verifyEmail({ dispatch, commit, getters, state }, token) {
      return axiosInstance.post('/verify', {
        token: token,
      }).then((response) => {
        if (getters.isLoggedIn && state.user && state.user.id === response.data.user.id) {
          commit('setUser', response.data)
        } else {
          dispatch('getLoggedUser');
        }
      });
    },
    resendEmailVerification({ getters, state }) {
      if (! getters.isLoggedIn || ! state.user || state.user && (! state.user.email || state.user.email_verified_at)) {
        return;
      }

      return axiosInstance.post('/resend-verification', {
        email: state.user.email
      });
    },
    redeemPromoCode({ getters, commit }, promoCode) {
      if (! getters.isLoggedIn) {
        return;
      }

      return axiosInstance.post('/coupons/redeem', {
        code: promoCode
      }).then((response) => {
        commit('setUser', response.data);
      });
    },
  },
  modules: {
  },
});
