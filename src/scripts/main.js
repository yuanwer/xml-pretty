import * as monaco from 'monaco-editor'
// 加载 XML 语言支持
import 'monaco-editor/esm/vs/basic-languages/xml/xml.contribution.js'
import { getLocalInput, setLocalInput } from '~/src/utils/getLocalSettings.js'
import { compressXml, formatXml } from '~/src/utils/xml.js'

// 获取本地输入内容，也就是最近一次用户输入的内容
const localInput = getLocalInput()

// 创建编辑器实例
const editor = monaco.editor.create(document.getElementById('editor'), {
  value: localInput || '',
  language: 'xml',
  theme: 'vs-dark',
  fontSize: 18,
})

// 每次用户输入时，都会往本地存储内容，确保记录是最新的
editor.onDidChangeModelContent(function () {
  const originalText = editor.getValue().trim()
  setLocalInput(originalText)
})

// 用户点击格式化
const $formatBtn = document.getElementById('formatBtn')
$formatBtn.addEventListener('click', () => {
  const originalText = editor.getValue().trim()
  if (!originalText) {
    return
  }
  editor.setValue(formatXml(originalText))
})

// 用户点击压缩
const $compressBtn = document.getElementById('compressBtn')
$compressBtn.addEventListener('click', () => {
  const originalText = editor.getValue().trim()
  if (!originalText) {
    return
  }
  editor.setValue(compressXml(originalText))
})
