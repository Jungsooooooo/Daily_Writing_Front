<template>
  <div class="header">
    <b-navbar type="dark" variant="none">
      <b-navbar-brand href="/" class="title">Daily_Writing</b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-icon-search class="searchIcon" @click="goToSearch()" />
            <b-button size="sm" class="writeButton" @click="goToWrite()">새 글 쓰기</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "headerBar",
  compatConfig: { MODE: 3 },
  methods: {
    click() {
      axios.get("/api/writings").then(() => {});
    },

    goToWrite() {
      axios.post("/api/files/create-temp-folder");
      this.$router.push("/write");
      axios.post("/api/files/create-temp-folder").catch((error) => {
        console.error(error);
      });
    },

    goToSearch() {
      this.$router.push("search");
    },
  },
};

// eslint-disable-line no-unused-vars
</script>

<style>
@import "../../css/Header.css";
</style>
