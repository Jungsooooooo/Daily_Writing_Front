<template>
  <div class="header">
    <b-navbar type="dark" variant="none">
      <b-navbar-brand href="/">Daily_Writing</b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button
              size="sm"
              class="my-2 my-sm-0"
              id="search"
              @click="click()"
              >Search</b-button
            >
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
  },
};

// eslint-disable-line no-unused-vars
</script>

<style>
@import "../../css/Header.css";
</style>
