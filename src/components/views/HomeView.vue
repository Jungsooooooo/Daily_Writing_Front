<template>
  <div class="homeCard">
    <b-card-group deck v-for="(group, index) in groupedData" :key="index">
      <b-card
        v-for="item in group"
        :title="item.title"
        :key="item.title"
        img-src="http://192.168.75.128/home/user/Pictures/diary_picture/1123.jpg"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 15rem"
        class="mt-3"
        id="cardEach"
        @click="goToDetail('item')"
      >
        {{ item.context }}
      </b-card>
    </b-card-group>
  </div>
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
  computed: {
    groupedData() {
      const groupSize = 5;
      const result = [];

      for (let i = 0; i < this.data.length; i += groupSize) {
        result.push(this.data.slice(i, i + groupSize));
      }

      return result;
    },
  },
  mounted() {
    axios.get("/api/writings").then((res) => {
      this.data = res.data;
      console.log(this.data);
    });
  },
  methods: {
    goToDetail(item) {
      console.log(item);
    },
  },
};
</script>
