<template>
  <div class="write">
    <b-col cols="6">
      <input class="writeTitle" placeholder="제목을 입력해주세요" />
      <div>
        <textarea class="writeContext" wrap="soft" placeholder="내용" />
      </div>
      <template #footer> <div>hi</div> </template>
    </b-col>
  </div>
</template>

<script>
export default {};

import "../../css/Write.css";
</script>
