<script setup lang="ts">
import CButton from './button/src/button'
</script>

<template>
  <c-button type="primary" size="large">确定</c-button>
  <c-button type="primary">取消</c-button>
  <c-button size="small">取消</c-button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
