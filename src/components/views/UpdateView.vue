<template>
  <div>
    <b-col cols="6">
      <input v-model="titleValue" class="writeTitle" />
      <div>
        <textarea v-model="contextValue" class="writeContext" wrap="soft" />
      </div>
      <footer class="saveWriteCol">
        <b-button size="sm" class="saveWrite" @click="updateWrite()">수정</b-button>
      </footer>
    </b-col>
    <div>
      <b-modal ref="saveModal"></b-modal>
    </div>
  </div>
</template>

<script>
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

    if (title !== undefined) {
      this.titleValue = title;
      this.contextValue = context;
    }
  },
  methods: {
    saveWrite() {
      let title = document.getElementsByClassName("writeTitle")[0].value;
      let context = document.getElementsByClassName("writeContext")[0].value;
      const input = {
        title: title,
        context: context,
      };
      axios.post("/api/writings/create", input).then((res) => {
        console.log(res.data);
        this.$bvModal.msgBoxOk(res.data.title + "이 작성되었습니다.").then(() => {
          this.$router.push("/");
        });
      });
    },
  },
};

import "../../css/Write.css";
</script>
