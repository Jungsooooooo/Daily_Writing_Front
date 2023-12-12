<template>
  <div class="detailEntireView">
    <div>
      <h1 class="detailTitle">{{ $route.query.title }}</h1>
    </div>

    <div class="detailContext">
      <p>{{ $route.query.context }}</p>
    </div>
  </div>
</template>

<script>
import "../../css/DetailView.css";
export default {};
</script>
