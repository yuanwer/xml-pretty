<script setup lang="ts">
import * as monaco from 'monaco-editor'
// 加载 XML 语言支持
import 'monaco-editor/esm/vs/basic-languages/xml/xml.contribution.js'
import { getLocalInput, setLocalInput } from '@/utils/getLocalSettings.js'
import { onMounted, ref } from 'vue'
import { compressXml, formatXml } from '@/utils/xml.js'

// 获取本地输入内容，也就是最近一次用户输入的内容
const localInput = getLocalInput()
let editor = null

onMounted(() => {
  // 创建编辑器实例
  editor = monaco.editor.create(document.getElementById('editor'), {
    value: localInput || '',
    language: 'xml',
    theme: 'vs',
    fontSize: 18
  })

  // 每次用户输入时，都会往本地存储内容，确保记录是最新的
  editor.onDidChangeModelContent(function () {
    const originalText = editor.getValue().trim()
    setLocalInput(originalText)
  })
})

function handleFormat() {
  const originalText = editor.getValue().trim()
  if (!originalText) {
    return
  }
  editor.setValue(formatXml(originalText))
}

function handleCompress() {
  const originalText = editor.getValue().trim()
  if (!originalText) {
    return
  }
  editor.setValue(compressXml(originalText))
}

function jumpToGitHubPage() {
  window.open('https://github.com/yuanwer/xml-pretty')
}
</script>

<template>
  <div class="home">
    <header>
      <div class="logo">
        <img src="@/assets/chick.png" alt="logo" />
        XML Pretty
      </div>
      <div class="buttons">
        <button class="c-button" @click="handleFormat">格式化</button>
        <button class="c-button" @click="handleCompress">压缩</button>
      </div>
      <div class="github-button c-button" @click="jumpToGitHubPage">
        <img src="https://github.githubassets.com/apple-touch-icon-144x144.png" alt="github icon" />
        GitHub
      </div>
    </header>
    <main>
      <div id="editor"></div>
    </main>
  </div>
</template>

<style lang="less" scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  header {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    .logo {
      margin-right: 30px;
      display: flex;
      align-items: center;

      img {
        width: 50px;
        height: 50px;
      }
    }

    .github-button {
      display: flex;
      align-items: center;
      img {
        margin-right: 5px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
      position: absolute;
      right: 20px;
    }
  }

  main {
    padding-top: 15px;
    flex: 1;
    display: flex;
    #editor {
      flex: 1;
    }
  }
}
</style>
