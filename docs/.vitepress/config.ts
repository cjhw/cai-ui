const sidebar = {
  '/': [
    { text: '快速开始', link: '/', items: [] },
    {
      text: '通用',
      items: [{ text: 'Button 按钮', link: '/components/button/' }]
    },
    {
      text: '导航',
      items: [{ text: 'pagination分页', link: '/components/pagination/' }]
    },
    { text: '反馈', items: [] },
    {
      text: '数据录入',
      items: [{ text: 'form表单', link: '/components/form/' }]
    },
    {
      text: '数据展示',
      items: [{ text: 'Tree 树', link: '/components/tree/' }]
    },
    {
      text: '布局',
      items: []
    }
  ]
}

const config = {
  themeConfig: {
    sidebar
  },
  markdown: {
    config(md) {
      // 这里可以使用markdown-it插件
      const { demoBlockPlugin } = require('vitepress-theme-demoblock')
      md.use(demoBlockPlugin, {
        cssPreprocessor: 'scss'
      })
    }
  }
}

export default config
