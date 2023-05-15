import * as monaco from 'monaco-editor'
import vkbeautify from 'vkbeautify'
// 加载 XML 语言支持
import 'monaco-editor/esm/vs/basic-languages/xml/xml.contribution.js'

import xmlFormatter from 'xml-formatter'

// 创建编辑器实例
const editor = monaco.editor.create(document.getElementById('editor'), {
  value: '',
  language: 'xml',
  theme: 'vs-dark',
  fontSize: 18,
})

// 格式化 XML
const formatXml = (originalText) => {
  const xmlDoc = new DOMParser().parseFromString(originalText, 'text/xml')
  const xmlStr = new XMLSerializer().serializeToString(xmlDoc)
  return vkbeautify.xml(xmlStr)
}

function openGithub() {
  window.open('https://github.com/yuanwer/xml-pretty')
}

function compressXml(originalText) {
  return originalText
}

const $formatBtn = document.getElementById('formatBtn')
$formatBtn.addEventListener('click', () => {
  const originalText = editor.getValue().trim()
  if (!originalText) {
    return
  }
  editor.setValue(formatXml(originalText))
})

const $githubBtn = document.getElementById('githubBtn')
$githubBtn.addEventListener('click', openGithub)

const $compressBtn = document.getElementById('compressBtn')
$compressBtn.addEventListener('click', () => {
  const originalText = editor.getValue()
  editor.setValue(compressXml(originalText))
})
