import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./components/views/Home";

Vue.useAttrs(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [{ path: "/home", component: Home }],
});
