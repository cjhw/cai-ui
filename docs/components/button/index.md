# Button 按钮

## 基础按钮

:::demo 基础按钮

```vue
<template>
  <c-button></c-button>
</template>
```

:::

## 按钮类型 type

:::demo 通过 type 属性设置按钮样式，可选：primary | secondary | text

```vue
<template>
  <c-button></c-button>
  <c-button type="primary"></c-button>
  <c-button type="text"></c-button>
</template>
```

:::

## 按钮尺寸 size

:::demo 通过 size 属性设置按钮样式，可选：small | medium | large
```vue
<template>
  <c-button size="small">Small</c-button>
  <c-button>Medium</c-button>
  <c-button size="large">Large</c-button>
</template>
```
:::


## 禁用按钮 disabled

:::demo 通过 disabled 属性禁用按钮
```vue
<template>
    <c-button type="primary"          
      @click="confirm">Primary</c-button>
    <c-button type="primary" disabled 
      @click="confirm">Disabled</c-button>
</template>
<script setup>
  const confirm = () => console.log('confirm')
</script>
```
:::

## 块级按钮 block

:::demo 通过 block 属性设置按钮为块级
```vue
<template>
  <c-button type="primary" block>Confirm</c-button>
  <c-button block>Cancel</c-button>
</template>
```
:::