<script setup lang="ts">
import * as monaco from 'monaco-editor'
// 加载 XML 语言支持
import 'monaco-editor/esm/vs/basic-languages/xml/xml.contribution.js'
import { getLocalInput, setLocalInput } from '@/utils/getLocalSettings.js'
import { onMounted, Ref, ref } from 'vue'
import { compressXml, formatXml } from '@/utils/xml.js'

// 获取本地输入内容，也就是最近一次用户输入的内容
const localInput = getLocalInput()
let editor = null
const fileInputRef: Ref<HTMLInputElement | null> = ref(null)

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
  setEditorContent(editor, formatXml(originalText), 1)
}
function setEditorContent(
  editor: monaco.editor.IStandaloneCodeEditor,
  content: string,
  lineNumber: number
) {
  const lineCount = editor.getModel()?.getLineCount() || 1

  // 检查行号是否有效
  if (lineNumber < 1 || lineNumber > lineCount) {
    console.error('Invalid lineNumber:', lineNumber)
    return
  }

  try {
    // 设置内容
    editor.setValue(content)

    // 定位到指定行号
    editor.revealLineInCenter(lineNumber)
    editor.setPosition({ lineNumber, column: 1 })
  } catch (e) {
    console.error('设置编辑器内容出错了: ', e)
  }
}

function handleCompress() {
  const originalText = editor.getValue().trim()
  if (!originalText) {
    return
  }
  setEditorContent(editor, compressXml(originalText), 1)
}

function handleOpenFile() {
  fileInputRef.value?.click()
}

function handleFileChange(event: Event) {
  const fileList = (event.target as HTMLInputElement).files

  if (fileList.length === 0) {
    console.log('没有选择文件')
    return
  }

  const file = fileList[0]

  if (!file.type.match('xml.*')) {
    alert('请选择XML文件')
    return
  }

  const reader = new FileReader()

  reader.onload = function (event) {
    const xmlContent = event.target.result
    setEditorContent(editor, xmlContent, 1)
    if (fileInputRef.value) {
      fileInputRef.value.value = ''
    }

    // 在这里可以对XML内容进行进一步处理
  }

  reader.readAsText(file)
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
        <button class="c-button" @click="handleOpenFile">打开XML文件</button>
      </div>
      <div class="github-button c-button" @click="jumpToGitHubPage">
        <img src="https://github.githubassets.com/apple-touch-icon-144x144.png" alt="github icon" />
        GitHub
      </div>
    </header>
    <main>
      <div id="editor"></div>
    </main>

    <input type="file" accept=".xml" ref="fileInputRef" @change="handleFileChange" hidden />
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
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
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
    flex: 1;
    display: flex;
    #editor {
      flex: 1;
    }
  }
}
</style>
