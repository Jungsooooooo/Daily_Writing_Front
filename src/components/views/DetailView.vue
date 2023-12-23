<template>
  <div class="detailEntireView">
    <div>
      <h1 class="detailTitle">{{ $route.query.title }}</h1>
    </div>

    <div>
      <b-link @click="deleteWriting($route.query.id)">삭제</b-link>
      <b-link class="updateWriting" @click="updateWriting($route.query.id)">수정</b-link>
    </div>

    <div class="detailContext">
      <p>{{ $route.query.context }}</p>
    </div>
  </div>
</template>

<script>
import "../../css/DetailView.css";
import axios from "axios";

export default {
  data() {
    return {
      longId: this.id,
    };
  },
  computed: {},

  methods: {
    deleteWriting(id) {
      axios.delete("/api/writings/delete/" + id).then(() => {
        console.log("삭제완료");
      });
    },
    updateWriting() {
      this.$router.push({
        path: "/update",
        query: { title: this.title, context: this.context, id: this.id },
      });
    },
  },
};
</script>
