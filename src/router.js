import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "./components/views/HomeView.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/home",
      component: HomeView,
    },
  ],
});

export default router;
