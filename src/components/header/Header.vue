<template>
  <div class="header">
    <b-navbar type="dark" variant="none">
      <b-navbar-brand href="/" class="title">Daily_Writing</b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-icon-search class="searchIcon" />
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
      axios.get("/api/writings").then((res) => {
        console.log(res.data);
      });
    },

    goToWrite() {
      this.$router.push("/write");
    },
  },
};

// eslint-disable-line no-unused-vars
</script>

<style>
@import "../../css/Header.css";
</style>
