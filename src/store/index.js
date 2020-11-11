import { createStore } from 'vuex'
import { axiosInstance } from '@/_helpers/axios';

export default createStore({
  state: {
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null,
    token: localStorage.getItem('token') || null,
  },
  getters: {
    isLoggedIn(state) {
      return typeof state.token === "string";
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
