<template>
  <div>
    <headerBar />
    <div>
      <router-view> </router-view>
    </div>
  </div>
</template>

<script>
import headerBar from "./components/header/Header.vue";

export default {
  name: "App",
  components: {
    headerBar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
textarea:disabled {
  background-color: #ffffff;
  resize: none;
}
</style>
