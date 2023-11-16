import Vue from "vue";
import VueRouter from "vue-router";
import hiHi from "./components/views/test2.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/home",
      component: hiHi,
    },
  ],
});

export default router;
