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
        style="max-width: 10rem, max-height:10px"
        class="mt-3"
        id="cardEach"
        @click="goToDetail(item.id)"
      >
        <p class="itemContext">{{ item.context }}</p>
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
      imageUrl: null,
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
  methods: {
    goToDetail(id) {
      console.log(id);
      axios.get("/api/writings/" + id).then((res) => {
        console.log(res);
        this.$router.push({
          path: "/detail",
          query: { title: res.data.title, context: res.data.context, id: id },
        });
      });
    },
    previewImage(event) {
      const file = event.target.files[0];

      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = (e) => {
          this.imageUrl = e.target.result;
        };

        console.log(this.imageUrl);
        console.log(file);

        reader.readAsDataURL(file);
      } else {
        // Handle non-image file types
        this.imageUrl = null;
        alert("Please choose a valid image file.");
      }
    },
  },
};
</script>
