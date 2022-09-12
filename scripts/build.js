const path = require('path')
const fs = require('fs')
// 引入vite导出的build方法，用它来创建
const { defineConfig, build } = require('vite')
const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')
const fsExtra = require('fs-extra')

// 基础配置
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()]
})
// 入口文件
const entryFile = path.resolve(__dirname, './entry.ts')
// 组件目录
const componentsDir = path.resolve(__dirname, '../src')
// 输出目录
const outputDir = path.resolve(__dirname, '../build')

// rollup配置
const rollupOptions = {
  // 外置
  external: ['vue', 'vue-router'],
  output: {
    globals: {
      vue: 'Vue'
    }
  }
}

// 生成package.json
const createPackageJson = name => {
  // 预设
  const fileStr = `{
    "name": "${name ? name : 'pjcai-ui'}",
    "version": "0.0.1",
    "main": "${name ? 'index.umd.js' : 'pjcai-ui.umd.js'}",
    "module": "${name ? 'index.mjs' : 'pjcai-ui.mjs'}",
    "author": "cjh",
    "description": "组件库cai-ui，冲冲冲",
    "repository": {
      "type": "git",
      "url": "git+https://github.com/cjhw/cai-ui.git"
    },
    "keywords": ["vue3", "组件库", "tsx", "UI"],
    "license": "ISC",
    "bugs": {
      "url": "https://github.com/cjhw/cai-ui/issues"
    }
  }`

  if (name) {
    // 单个组件，输出对应的package.json
    fsExtra.outputFile(
      path.resolve(outputDir, `${name}/package.json`),
      fileStr,
      'utf-8'
    )
  } else {
    // 全量
    fsExtra.outputFile(
      path.resolve(outputDir, 'package.json'),
      fileStr,
      'utf-8'
    )
  }
}

// 执行创建

// 单组件按需构建
const buildSingle = async name => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: path.resolve(componentsDir, name),
          name: 'index',
          fileName: 'index',
          formats: ['es', 'umd']
        },
        outDir: path.resolve(outputDir, name)
      }
    })
  )

  createPackageJson(name)
}

// 全量构建
const buildAll = async () => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: entryFile,
          name: 'pjcai-ui',
          fileName: 'pjcai-ui',
          formats: ['es', 'umd']
        },
        outDir: outputDir
      }
    })
  )

  // 生成package.json
  createPackageJson()
}

const buildLib = async () => {
  await buildAll()

  // 按需打包
  fs.readdirSync(componentsDir)
    .filter(name => {
      // 只要目录不要文件，且里面包含index.ts
      const componentDir = path.resolve(componentsDir, name)
      const isDir = fs.lstatSync(componentDir).isDirectory()
      return isDir && fs.readdirSync(componentDir).includes('index.ts')
    })
    .forEach(async name => {
      await buildSingle(name)
    })
}

buildLib()
