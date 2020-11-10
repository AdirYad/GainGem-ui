import { createStore } from 'vuex'
import { axiosInstance } from '@/_helpers/axios';

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
