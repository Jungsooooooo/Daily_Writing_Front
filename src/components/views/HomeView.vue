<template>
  <b-col cols="12">
    <div class="homeCard">
      <b-card
        v-for="item in data"
        :key="item.title"
        :title="item.title"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem"
        class="mb-2"
      >
        {{ item.context }}
      </b-card>
    </div>
  </b-col>
</template>

<script>
import axios from "axios";
import "../../css/HomeView.css";
export default {
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    axios.get("/api/writings").then((res) => {
      this.data = res.data;
      console.log(this.data);
    });
  },
};
</script>
