<template>
  <div>
    <b-card-group deck v-for="(group, index) in groupedData" :key="index">
      <b-card
        v-for="item in group"
        :title="item.title"
        :key="item.title"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        class="mt-3"
        id="cardEach"
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
      const groupSize = 4;
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
};
</script>
