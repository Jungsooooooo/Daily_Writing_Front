<template>
  <div>
    <div class="searchBar">
      <b-row>
        <b-col cols="4"></b-col>
        <b-col cols="4" align-self="center">
          <b-input-group class="mt3">
            <b-form-input
              placeholder="검색어를 입력해주세요"
              id="searchTitle"
            ></b-form-input>
            <b-button @click="search()">Search</b-button>
          </b-input-group>
        </b-col>
      </b-row>
    </div>
    <div class="homeCard">
      <div v-if="writingList.length > 0">
        <b-card-group deck v-for="(group, index) in groupedData" :key="index">
          <b-card
            v-for="item in group"
            :title="item.title"
            :key="item.id"
            img-src="192.168.75.128/home/user/Pictures/diary_picture/1123.jpg"
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
      <div v-else>hello</div>
    </div>
  </div>
</template>

<script>
import "../../css/Search.css";
import axios from "axios";

export default {
  data() {
    return {
      writingList: [],
    };
  },
  computed: {
    groupedData() {
      const groupSize = 4;
      const result = [];

      for (let i = 0; i < this.writingList.length; i += groupSize) {
        result.push(this.writingList.slice(i, i + groupSize));
      }

      return result;
    },
  },

  methods: {
    search() {
      const title = { title: document.getElementById("searchTitle").value };
      axios.post("/api/writings/search", title).then((res) => {
        this.writingList = res.data;
        console.log(this.writingList);
      });
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
};
</script>
