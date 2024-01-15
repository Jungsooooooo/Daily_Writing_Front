<template>
  <div>
    <div class="searchBar">
      <b-col cols="4"></b-col>
      <b-col cols="4" align-self="center">
        <b-input-group>
          <b-form-input
            placeholder="검색어를 입력해주세요"
            id="searchTitle"
          ></b-form-input>
          <b-button @click="search()">Search</b-button>
        </b-input-group>
      </b-col>
    </div>

    <div v-if="writingList.length > 0" class="searchCard">
      <b-card
        v-for="item in writingList"
        :title="item.title"
        :key="item.id"
        :img-src="
          item.mainImageUrl == null
            ? 'http://192.168.75.128/images/noImage.jpg'
            : item.mainImageUrl
        "
        img-alt="Image"
        img-height="150px"
        tag="article"
        class="mt-3"
        id="cardSearchEach"
        @click="goToDetail(item.id)"
      >
        <p class="itemContext">{{ item.context }}</p>
      </b-card>
    </div>

    <div v-else class="nullCheck">{{ nullCheck }}</div>
  </div>
</template>

<script>
import "../../css/Search.css";
import axios from "axios";

export default {
  data() {
    return {
      writingList: [],
      nullCheck: "",
      perPage: 12,
      currentPage: 1,
      maxCardsPerRow: 4, // 한 줄에 표시할 최대 카드 수
    };
  },

  methods: {
    search() {
      const title = { title: document.getElementById("searchTitle").value };
      const name = document.getElementById("searchTitle").value;
      axios.get("/api/writings/search/" + name).then((res) => {
        const checkData = res.data;
        this.writingList = res.data;

        if (checkData.length == 0) {
          this.nullCheck =
            "'" + title.title + "'" + "에 해당하는 데이터가 없습니다";
        }
      });
    },
    goToDetail(id) {
      console.log(id);
      axios
        .get("/api/writings/" + id)
        .then((res) => {
          console.log(res);
          this.$router.push({
            path: "/detail",
            query: { title: res.data.title, context: res.data.context, id: id },
          });
        })
        .catch((error) => {
          console.error("An error occurred while saving the text:", error);
        });
    },
  },
};
</script>
