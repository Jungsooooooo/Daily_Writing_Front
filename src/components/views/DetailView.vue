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
      titleValue: "",
      contextValue: "",
    };
  },
  mounted() {
    const title = this.$route.query.title;
    const context = this.$route.query.context;
    console.log({ title });
    if (title !== undefined) {
      this.titleValue = title;
      this.contextValue = context;
    }
  },

  methods: {
    deleteWriting(id) {
      axios.delete("/api/writings/delete/" + id).then(() => {
        console.log("삭제완료");
      });
    },
    updateWriting() {
      this.$router.push({
        path: "/update",
        query: { title: this.titleValue, context: this.contextValue, id: this.id },
      });
    },
  },
};
</script>
