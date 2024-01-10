<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col cols="6" class="writePosition">
          <input
            class="writeTitle"
            placeholder="제목을 입력해주세요"
            @input="updateTitlePreview"
          />

          <div>
            <textarea
              class="writeContext"
              wrap="soft"
              placeholder="내용"
              @dragover.prevent
              @drop="handleDrop"
              v-model="imageData"
            />
          </div>
          <footer class="saveWriteCol">
            <b-button size="sm" class="saveWrite" @click="saveWrite()"
              >저장</b-button
            >
          </footer>
        </b-col>

        <b-col cols="6">
          <h1><input type="text" v-model="title" class="preShowTitle" /></h1>
          <div v-for="(line, index) in imageData.split('\n')" :key="index">
            <template v-if="line.startsWith('![]') && line.endsWith(')')">
              <input
                class="preShowImageWriting"
                type="image"
                :src="extractImageUrl(line)"
              />
            </template>
            <template v-else>
              <textarea
                v-model="lines[index]"
                class="preShowTextWriting"
                @input="adjustTextareaHeight"
                ref="dynamicTextarea"
                :style="{ height: dynamicHeight }"
                readonly
                disabled
              />
            </template>
          </div>
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
      inputContainer: document.getElementById("inputContainer"),
      lines: [],
      title: "",
      titlePreview: "",
      dynamicHeight: "auto",
    };
  },
  watch: {
    imageData: function (newText) {
      // textarea의 각 줄을 배열로 분리

      this.lines = newText.split("\n");
    },
  },
  methods: {
    saveWrite() {
      let title = document.getElementsByClassName("writeTitle")[0].value;
      let context = document.getElementsByClassName("writeContext")[0].value;
      var imageInputs = document.querySelectorAll('input[type="image"]');
      let mainImageUrl = imageInputs[0].src;
      console.log(mainImageUrl);
      const input = {
        title: title,
        context: context,
        mainImageUrl: imageInputs[0].src,
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
          this.imageData +=
            "\n" +
            "![]" +
            "(" +
            "http://192.168.67.128/images/" +
            file.name +
            ")";
        };

        reader.readAsDataURL(file);
      }
      setTimeout(() => {
        axios.post("/api/files/upload", {
          imageInfo: this.image,
          imageName: file.name,
        });
      }, 100);
    },
    extractImageUrl(line) {
      var match = line.match(/\((.*?)\)/);
      if (match && match[1]) {
        return match[1].trim();
      } else {
        return "";
      }
    },
    updateTitlePreview() {
      this.title = document.getElementsByClassName("writeTitle")[0].value;
    },
    adjustTextareaHeight() {
      // 입력된 텍스트의 높이에 따라 동적으로 늘어나도록 높이 조절
      this.dynamicHeight = this.$refs.dynamicTextarea.scrollHeight + "px";
    },
  },
};

import "../../css/Write.css";
</script>
