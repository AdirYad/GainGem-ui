import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import AxiosPlugin from '@/_helpers/axios';

if (store.state.token !== null) {
    store.dispatch('getLoggedUser');
} else if (store.state.user) {
    store.commit('removeUser');
    store.commit('removeToken');
}

const app = createApp(App)
    .use(AxiosPlugin)
    .use(store)
    .use(router)
    .mount('#app');