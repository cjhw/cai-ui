# 分页c-pagination
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


## 使用案例
:::demo
```vue
<template>
  <div class="essays-container">
    <a v-for="article of articles" :href="`http://juejin.cn/post/${article.article_id}`" target="_blank">
      <div class="essay-list">
        <div class="first-line">
          <span class="title">{{ article.title }}</span>
        </div>
        <div class="infos">
          <span> {{ article.ctime }} </span>
          <span class="split-line"></span>
          <span>{{ article.view_count }}阅读</span>
          <span class="dot">·</span>
          <span>{{ article.digg_count }}点赞</span>
          <span class="dot">·</span>
          <span>{{ article.comment_count }}评论</span>
          <span class="dot">·</span>
          <span>{{ article.collect_count }}收藏</span>
        </div>
      </div>
    </a>
  </div>
  <!-- 使用我们的 Pagination 对文章进行分页-->
  <CPagination :total="sourceArticles.length" :pageSize="pageSize" v-model="pageIndex" />
</template>
<script setup>
import {ref, computed} from 'vue'
// 文章数据来自掘金后台接口
    const sourceArticles = ref([
      {
        article_id: "7154007357305913357",
        title: "一起写个vite", // 标题
        collect_count: 7, // 收藏
        comment_count: 2, // 评论数
        ctime: "1638507790", // 创建时间
        digg_count: 10, // 点赞数
        view_count: 1600, // 阅读数
      },
      {
        article_id: "7154007357305913357",
        title: "一起写个vite", // 标题
        collect_count: 7, // 收藏
        comment_count: 2, // 评论数
        ctime: "1638507790", // 创建时间
        digg_count: 10, // 点赞数
        view_count: 1600, // 阅读数
      },
      {
        article_id: "7154007357305913357",
        title: "一起写个vite", // 标题
        collect_count: 7, // 收藏
        comment_count: 2, // 评论数
        ctime: "1638507790", // 创建时间
        digg_count: 10, // 点赞数
        view_count: 1600, // 阅读数
      },
      {
        article_id: "7154007357305913357",
        title: "一起写个vite", // 标题
        collect_count: 7, // 收藏
        comment_count: 2, // 评论数
        ctime: "1638507790", // 创建时间
        digg_count: 10, // 点赞数
        view_count: 1600, // 阅读数
      },
      {
        article_id: "7154007357305913357",
        title: "一起写个vite", // 标题
        collect_count: 7, // 收藏
        comment_count: 2, // 评论数
        ctime: "1638507790", // 创建时间
        digg_count: 10, // 点赞数
        view_count: 1600, // 阅读数
      }
    ])
    
    const pageIndex = ref(1)
    const pageSize = ref(2)
    
    const articles = computed(() => sourceArticles.value.slice((pageIndex.value - 1) * pageSize.value, pageIndex.value * pageSize.value))
    
</script>
```
:::