<script setup lang="ts">
import VirtualList from './components/VirtualList.vue'

const confirm = () => {
  console.log('confirm')
}
</script>

<template>
  <VirtualList></VirtualList>
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
