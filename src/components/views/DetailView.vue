<template>
  <div class="detailEntireView">
    <div>
      <h1 class="detailTitle">{{ $route.query.title }}</h1>
    </div>

    <div class="detailContext">
      <p>{{ $route.query.context }}</p>
    </div>

    <div>
      <b-link @click="deleteWriting($route.query.id)">삭제</b-link>
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
    deleteWriting() {
      axios.delete("/api/writings/delete/" + this.longId).then(() => {
        console.log("삭제완료");
      });
    },
  },
};
</script>
