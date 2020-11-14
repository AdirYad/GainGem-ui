import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { VuelidatePlugin } from '@vuelidate/core';
import AxiosPlugin, { axiosInstance } from '@/_helpers/axios';

const app = createApp(App)
    .use(VuelidatePlugin)
    .use(AxiosPlugin)
    .use(store)
    .use(router)
    .mount('#app');