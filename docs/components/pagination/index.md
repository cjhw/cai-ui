# 分页
## 基础
通过设置`total`属性设置分页总条目数即可
:::demo
```vue
<template>
  <c-pagination :total="50"></c-pagination>

  <h6>total=1时应该只显示首页</h6>
  <c-pagination :total="1"></c-pagination>
  <h6>total=11时应该显示首页和尾页</h6>
  <c-pagination :total="11"></c-pagination>
  <h6>total=80 && pageIndex=4，应该显示右更多按钮</h6>
  <h6>total=80 && pageIndex=5，应该显示左更多按钮</h6>
  <c-pagination :total="80"></c-pagination>
  <h6>total=90 && pageIndex=5，应该显示左、右更多按钮</h6>
  <h6>total=90 && pageIndex=4，应该只显示右更多按钮</h6>
  <c-pagination :total="90"></c-pagination>
</template>
```
:::