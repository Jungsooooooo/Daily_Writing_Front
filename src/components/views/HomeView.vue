<template>
  <div>
    <div class="homeCard">
      <!-- <b-card-group deck v-for="(group, index) in groupedData" :key="index"> -->
      <b-card
        v-for="item in data"
        :title="item.title"
        :key="item.id"
        img-src="http://192.168.67.128/images/test2.PNG"
        img-alt="Image"
        img-top
        tag="article"
        style="width: 100px, max-height:10px"
        class="mt-3"
        id="cardEach"
        @click="goToDetail(item.id)"
      >
        <p class="itemContext">{{ item.context }}</p>
      </b-card>
      <!-- </b-card-group> -->
    </div>
    <div class="pagingColumn">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
      ></b-pagination>
    </div>
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
      rows: 0,
      perPage: 12,
      currentPage: 1,
      maxCardsPerRow: 4, // 한 줄에 표시할 최대 카드 수
    };
  },
  computed: {},
  mounted() {
    this.getHomeData();
  },
  methods: {
    getHomeData() {
      let page = this.currentPage - 1;
      let size = 12;
      axios
        .get("/api/writings", {
          params: {
            page,
            size,
          },
        })
        .then((res) => {
          this.data = res.data.writings;

          this.rows = res.data.totalElements;
        });

      return this.data;
    },

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
  },
  watch: {
    currentPage: "getHomeData",
  },
};
</script>
