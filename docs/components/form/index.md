# 表单 Form

## 基础用法

传入 model 属性设置数据模型。

:::demo 传入 model 属性设置数据模型

```vue
<template>
  <c-form :model="model" layout="horizontal" labelSize="lg" labelAlign="start">
    <c-form-item label="用户名:" field="user">
      <input />
    </c-form-item>
  </c-form>
</template>
<script setup>
  import {ref} from 'vue'
  const model = ref({
    user: 'tom'
  })
</script>
```