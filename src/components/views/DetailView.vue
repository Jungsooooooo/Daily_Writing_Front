<template>
  <div class="detailEntireView">
    <div>
      <h1 class="detailTitle">{{ $route.query.title }}</h1>
    </div>

    <div>
      <b-link @click="deleteWriting($route.query.id)">삭제</b-link>
      <b-link class="updateWriting" @click="updateWriting($route.query.id)"
        >수정</b-link
      >
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
      id: "",
    };
  },
  mounted() {
    const title = this.$route.query.title;
    const context = this.$route.query.context;
    const id = this.$route.query.id;
    console.log({ title });
    if (title !== undefined) {
      this.titleValue = title;
      this.contextValue = context;
      this.id = id;
    }
  },

  methods: {
    deleteWriting(id) {
      this.$bvModal
        .msgBoxConfirm("삭제하겠습니까?", {
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "예",
          cancelTitle: "아니오",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
          cancelCallback: () => {},
        })
        .then((value) => {
          if (value) {
            axios.delete("/api/writings/delete/" + id).then(() => {
              this.$bvModal
                .msgBoxOk("삭제되었습니다.", {
                  size: "sm",
                  buttonSize: "sm",
                  centered: true,
                  okTitle: "예",
                })
                .then(() => {
                  this.$router.push("/");
                });
            });
          } else {
            return null;
          }
        });
    },
    updateWriting() {
      this.$router.push({
        path: "/update",
        query: {
          title: this.titleValue,
          context: this.contextValue,
          id: this.id,
        },
      });
    },
  },
};
</script>
