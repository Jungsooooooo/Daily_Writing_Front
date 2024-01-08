<template>
  <div>
    <b-col cols="6">
      <input v-model="titleValue" class="writeTitle" />
      <div>
        <textarea
          v-model="contextValue"
          class="writeContext"
          wrap="soft"
          @dragover.prevent
          @drop="handleDrop"
          @input="contextInput"
        />
      </div>
      <footer class="saveWriteCol">
        <b-button size="sm" class="saveWrite" @click="updateWrite()"
          >수정</b-button
        >
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
      id: "",
    };
  },
  mounted() {
    const title = this.$route.query.title;
    const context = this.$route.query.context;
    const id = this.$route.query.id;

    if (title !== undefined) {
      this.titleValue = title;
      this.contextValue = context;
      this.id = id;
    }
  },
  methods: {
    updateWrite() {
      let title = document.getElementsByClassName("writeTitle")[0].value;
      let context = document.getElementsByClassName("writeContext")[0].value;
      let id = this.id;
      const input = {
        title: title,
        context: context,
        id: id,
      };
      axios.post("/api/writings/update", input).then((res) => {
        console.log(res.data);
        this.$bvModal
          .msgBoxOk(res.data.title + "이 수정되었습니다.")
          .then(() => {
            this.$router.push("/");
          });
      });
    },
    handleDrop(event) {
      event.preventDefault();

      // 드롭된 파일 가져오기
      const file = event.dataTransfer.files[0];
      console.log({ file });
      // 파일이 이미지인지 확인
      if (file && file.type.startsWith("image/")) {
        // 이미지 파일이면 데이터에 저장
        const reader = new FileReader();
        reader.onload = () => {
          this.image = reader.result;
          this.contextValue += "\n" + file.name;
        };
        reader.readAsText(file);
      }
    },
  },
};

import "../../css/Write.css";
</script>
