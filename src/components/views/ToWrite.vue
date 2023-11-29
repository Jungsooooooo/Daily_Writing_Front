<template>
  <div>
    <b-col cols="6">
      <input class="writeTitle" placeholder="제목을 입력해주세요" />
      <div>
        <textarea class="writeContext" wrap="soft" placeholder="내용" />
      </div>
      <footer class="saveWriteCol">
        <b-button size="sm" class="saveWrite" @click="goToWrite()">저장</b-button>
      </footer>
    </b-col>
  </div>
</template>

<script>
export default {};

import "../../css/Write.css";
</script>
