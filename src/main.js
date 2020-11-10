import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AxiosPlugin, { axiosInstance } from '@/_helpers/axios';

createApp(App)
    .use(AxiosPlugin)
    .use(store)
    .use(router)
    .mount('#app');