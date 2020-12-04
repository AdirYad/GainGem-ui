import { createStore } from 'vuex'
import { axiosInstance } from '@/_helpers/axios';
import router from "@/router";

export default createStore({
  state: {
    notifications: [],
    token: localStorage.getItem('token') || null,
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null,
    daily_tasks: localStorage.getItem("daily_tasks")
        ? JSON.parse(localStorage.getItem("daily_tasks"))
        : null,
    stats: localStorage.getItem("stats")
        ? JSON.parse(localStorage.getItem("stats"))
        : {
      total_points_earned: 0,
      total_offers_completed: 0,
    },
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
        modal: {
          name: 'Roblox',
          ul: [
              'Enter your Roblox username',
              'Enter the amount of Robux you want to receive (1 Robux = 1 Point)',
              'Join the group that will be shown to you',
              'When you are in the group, click ‘Claim Robux’ and you will receive your Robux within 5 minutes',
          ],
        }
      },
      {
        name: 'Bitcoin',
        image: require('@/assets/images/rewards/bitcoin.png'),
        provider: 'bitcoin',
        stock: true,
        modal: {
          name: 'Bitcoin',
        }
      },
      {
        name: 'App Store',
        image: require('@/assets/images/rewards/apple.png'),
        provider: 'apple',
        stock: true,
        modal: {
          name: 'Apple',
          redeemAlert: 'All App Store Gift Cards can be redeemed on the App Store.',
          ul: [
              'On your iPhone, iPad, or iPod touch, open the App Store app.',
              'At the top of the screen, tap the sign-in button or your photo.',
              'Tap "Redeem Gift Card or Code." If you don’t see “Redeem Gift Card or Code,” sign in with your Apple ID.',
              'Enter your code manually.',
              'Tap Redeem in the top right corner.',
          ],
        }
      },
      {
        name: 'Xbox',
        image: require('@/assets/images/rewards/xbox.png'),
        provider: 'xbox',
        stock: true,
        modal: {
          name: 'Xbox',
          redeemAlert: 'All XBOX Gift Cards can be redeemed on the XBOX website.',
          text: 'You can redeem XBOX Gift Card codes internationally as long as you change your XBOX account region to <strong>match the correct country</strong>.',
        }
      },
      {
        name: 'Roblox',
        image: require('@/assets/images/rewards/roblox.png'),
        provider: 'roblox',
        stock: true,
        modal: {
          name: 'Roblox',
          redeemAlert: 'All ROBLOX Gift Cards can be redeemed on the ROBLOX website.',
          ul: [
              'Navigate to <a class="tw-text-primary" href="https://roblox.com/gamecards/redeem" target="_blank">roblox.com/gamecards/redeem</a> from a web browser.',
              'Enter your code in the \'Enter Pin Code\' section.',
              'Tap Redeem.',
              'Then hit Redeem to add the balance to your ROBLOX account.',
          ],
        }
      },
      {
        name: 'Psn',
        image: require('@/assets/images/rewards/psn.png'),
        provider: 'psn',
        stock: true,
        modal: {
          name: 'PlayStation',
          redeemAlert: 'All PlayStation Gift Cards can be redeemed on the PlayStation website.',
          text: 'You can only redeem PlayStation Gift Card codes in the account’s region so <strong>make sure to select the correct country</strong>',
        }
      },
      {
        name: 'Google Play',
        image: require('@/assets/images/rewards/googleplay.png'),
        provider: 'googleplay',
        stock: true,
        modal: {
          name: 'Google Play',
          redeemAlert: 'All Google Play Gift Cards can be redeemed on the Google website.',
          ul: [
              'Navigate to <a class="tw-text-primary" href="https://play.google.com/redeem" target="_blank">play.google.com/redeem</a> from a web browser.',
              'Click on Redeem near the bottom left corner (or just go to <a class="tw-text-primary" href="https://play.google.com/redeem" target="_blank">play.google.com/redeem</a>).',
              'Enter your 16-digit code in the popup.',
              'Tap Redeem.',
              'Then hit Confirm to add the balance to your Google account.',
          ],
        }
      },
      {
        name: 'Netflix',
        image: require('@/assets/images/rewards/netflix.png'),
        provider: 'netflix',
        stock: true,
        modal: {
          name: 'Netflix',
          redeemAlert: 'All Netflix Gift Cards can be redeemed on the Netflix website.',
          text: 'You can only redeem Netflix Gift Cards on an account that uses the same currency. <br>' +
              'For example: £ Gift Cards can be used in the United Kingdom but not in the United States. <br>' +
              '$ Gift Cards can be used in the United States but not in the United Kingdom.',
        }
      },
      {
        name: 'Spotify',
        image: require('@/assets/images/rewards/spotify.png'),
        provider: 'spotify',
        stock: true,
        modal: {
          name: 'Spotify',
          redeemAlert: 'Spotify Gift Cards can only be redeemed on Spotify accounts registered in the <strong>same country</strong> where they were purchased.',
          ul: [
            'Go to <a class="tw-text-primary" href="https://spotify.com/redeem" target="_blank">spotify.com/redeem</a>.',
            'Login to Spotify.',
            'Enter the code and click Redeem.',
          ],
        }
      },
      {
        name: 'Discord',
        image: require('@/assets/images/rewards/discord.png'),
        provider: 'discord',
        stock: true,
        modal: {
          name: 'Discord',
          ul: [
              'Navigate to <a class="tw-text-primary" href="https://discord.com/app" target="_blank">discord.com/app</a> and open your user settings.',
              'Click on ‘Gift Inventory’',
              'Enter your code in the \'Redeem Codes\' section.',
              'Tap Redeem.',
          ],
        }
      },
    ],
  },
  getters: {
    isLoggedIn: (state) => typeof state.token === "string",
  },
  mutations: {
    pushNotification(state, notification) {
      state.notifications.unshift({
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

    setStats(state, stats) {
      state.stats = stats;
      localStorage.setItem('stats', JSON.stringify(stats));
    },

    setDailyTasks(state, dailyTasks) {
      state.daily_tasks = dailyTasks;
      localStorage.setItem('daily_tasks', JSON.stringify(dailyTasks));
    },

    updateDailyTasks(state, offers_count) {
      state.daily_tasks.completed_daily_tasks.push(offers_count);
      localStorage.setItem('daily_tasks', JSON.stringify(state.daily_tasks));
    },

    removeDailyTasks(state) {
      state.daily_tasks = null;
      localStorage.removeItem('daily_tasks');
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
    stats({ commit, getters }) {
      if (getters.isLoggedIn) {
        return;
      }

      return axiosInstance.get('stats').then((response) => {
        commit('setStats', response.data);
      });
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
      commit('removeDailyTasks');
    },
    getLoggedUser({ commit, getters, state }) {
      if (! getters.isLoggedIn) {
        return;
      }

      return axiosInstance.post('/auth/user', state.token).then((response) => {
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

      return axiosInstance.post(`/coupons/${promoCode}/redeems`).then((response) => {
        commit('setUser', response.data);
      });
    },
    getDailyTasks({ getters, commit }) {
      if (! getters.isLoggedIn) {
        return;
      }

      return axiosInstance.get('/daily-tasks').then((response) => {
          commit('setDailyTasks', response.data);
      });
    },
    storeDailyTasks({ getters, commit }, offers_count) {
      if (! getters.isLoggedIn) {
        return;
      }

      return axiosInstance.post('/daily-tasks', { offers_count }).then((response) => {
          commit('setUser', response.data);
          commit('updateDailyTasks', offers_count);
      });
    },
  },
  modules: {
  },
});
