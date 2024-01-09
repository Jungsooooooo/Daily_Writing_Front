<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col cols="6">
          <input class="writeTitle" placeholder="제목을 입력해주세요" />

          <div>
            <textarea
              class="writeContext"
              wrap="soft"
              placeholder="내용"
              @dragover.prevent
              @drop="handleDrop"
              v-model="imageData"
              @input="contextInput"
            />
          </div>
          <footer class="saveWriteCol">
            <b-button size="sm" class="saveWrite" @click="saveWrite()"
              >저장</b-button
            >
          </footer>
        </b-col>

        <b-col cols="6">
          <textarea
            v-model="imageData"
            class="writeContext"
            readonly
          ></textarea>
        </b-col>
      </b-row>
    </b-container>
    <b-modal ref="saveModal"></b-modal>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
<script>
import axios from "axios";
export default {
  data() {
    return {
      image: "",
      imageData: "",
      contextInput: "",
    };
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
        this.$bvModal
          .msgBoxOk(res.data.title + "이 작성되었습니다.")
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

        reader.onload = (e) => {
          this.image = e.target.result.split(",")[1];
          this.imageData += "\n" + "![]" + "(" + file.name + ")";
        };

        reader.readAsDataURL(file);
      }
      const formData = new FormData();
      // formData.append("file", this.image);
      console.log(this.image);
      setTimeout(() => {
        axios.post("/api/files/upload", {
          imageInfo: this.image,
          imageName: file.name,
        });
      }, 100);
    },
    // readfile(file){

    // }

    contextInput() {},
  },
};

import "../../css/Write.css";
</script>
