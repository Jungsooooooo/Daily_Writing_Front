<template>
  <div>
    <b-col cols="6">
      <input class="writeTitle" placeholder="제목을 입력해주세요" />
      <div>
        <textarea class="writeContext" wrap="soft" placeholder="내용" />
      </div>
      <footer class="saveWriteCol">
        <b-button size="sm" class="saveWrite" @click="saveWrite()">저장</b-button>
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
