<script setup lang="ts">
import CButton from './button/src/button'
</script>

<template>
  <c-button type="primary">确定</c-button>
  <CButton>取消</CButton>
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
