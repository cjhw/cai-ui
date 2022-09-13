<script setup lang="ts">
const confirm = () => {
  console.log('confirm')
}
</script>

<template>
  <c-button type="primary" size="large" block>确定</c-button>
  <c-button type="primary" @click="confirm">取消</c-button>
  <c-button size="small" disabled @click="confirm">取消</c-button>
  <c-tree></c-tree>
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
