<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col cols="6" class="writePosition">
          <input
            v-model="titleValue"
            class="writeTitle"
            @input="updateTitlePreview"
          />
          <div>
            <textarea
              v-model="contextValue"
              class="writeContext"
              wrap="soft"
              @dragover.prevent
              @drop="handleDrop"
            />
          </div>
          <footer class="saveWriteCol">
            <b-button size="sm" class="saveWrite" @click="updateWrite()"
              >수정</b-button
            >
          </footer>
        </b-col>
        <b-col cols="6">
          <h1>
            <input type="text" v-model="titleValue" class="preShowTitle" />
          </h1>
          <div v-for="(line, index) in contextValue.split('\n')" :key="index">
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
      <div>
        <b-modal ref="saveModal"></b-modal>
      </div>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import "../../css/Write.css";

export default {
  data() {
    return {
      titleValue: this.$route.query.title,
      contextValue: "",
      title: "",
      id: "",
      images: [],
      lines: [],
      dynamicHeight: "auto",
      inputContainer: document.getElementById("inputContainer"),
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
  watch: {
    contextValue: function (newText) {
      // textarea의 각 줄을 배열로 분리

      this.lines = newText.split("\n");
    },
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

        reader.onload = (e) => {
          this.image = e.target.result.split(",")[1];
          this.contextValue +=
            "\n" +
            "![]" +
            "(" +
            "http://192.168.67.128/images/" +
            file.name +
            ")";
        };

        reader.readAsDataURL(file);
      }

      // formData.append("file", this.image);
      setTimeout(() => {
        axios.post("/api/files/upload", {
          imageInfo: this.image,
          imageName: file.name,
        });
      }, 100);
    },
    updateTitlePreview() {
      this.title = document.getElementsByClassName("writeTitle")[0].value;
    },
    adjustTextareaHeight() {
      // 입력된 텍스트의 높이에 따라 동적으로 늘어나도록 높이 조절
      this.dynamicHeight = this.$refs.dynamicTextarea.scrollHeight + "px";
    },
    extractImageUrl(line) {
      var match = line.match(/\((.*?)\)/);
      if (match && match[1]) {
        return match[1].trim();
      } else {
        return "";
      }
    },
  },
};

import "../../css/Write.css";
</script>
