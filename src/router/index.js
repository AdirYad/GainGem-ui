import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store";
import routes from './routes';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);

  if (
      to.matched.some(record => record.meta.guestOnly) &&
      store.getters.isLoggedIn
  ) {
    return next({ name: "Home" });
  }

  if (
      to.matched.some(record => record.meta.authOnly) &&
      ! store.getters.isLoggedIn
  ) {
    return next({ name: "Home" });
  }

  next();
});

export default router;
