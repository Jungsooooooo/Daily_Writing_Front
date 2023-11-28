import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "./components/views/HomeView.vue";
import ToWrite from "./components/views/ToWrite.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/home",
      component: HomeView,
    },
    { path: "/write", component: ToWrite },
  ],
});

export default router;
