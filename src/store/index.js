import { createStore } from 'vuex'
import { axiosInstance } from '@/_helpers/axios';
import router from "@/router";

export default createStore({
  state: {
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null,
    token: localStorage.getItem('token') || null,
  },
  getters: {
    isLoggedIn: (state) => typeof state.token === "string",
  },
  mutations: {
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
        console.log(getters.isLoggedIn && state.user && state.user.id === response.data.user.id)
        console.log(state.user.id)
        console.log(response.data.user.id)
        if (getters.isLoggedIn && state.user && state.user.id === response.data.user.id) {
          commit('setUser', response.data)
        } else {
          dispatch('getLoggedUser');
        }
      });
    },
    resendEmailVerification({ getters, state }) {
      if (! getters.isLoggedIn || state.user && (! state.user.email || state.user.email_verified_at)) {
        return;
      }

      return axiosInstance.post('/resend-verification', {
        email: state.user.email
      });
    },
  }
  ,
  modules: {
  },
});
