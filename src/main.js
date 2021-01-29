import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import AxiosPlugin from '@/_helpers/axios';
import titleMixin from './mixins/titleMixin'

// Font Awesome
import './font-awesome';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

if (store.state.token !== null) {
    store.dispatch('getLoggedUser');
} else if (store.state.user) {
    store.commit('removeUser');
    store.commit('removeToken');
}

const app = createApp(App)
    .component('fa-icon', FontAwesomeIcon)
    .use(AxiosPlugin)
    .use(store)
    .use(router)
    .mixin(titleMixin)
    .mount('#app');