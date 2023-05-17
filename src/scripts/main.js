import * as monaco from 'monaco-editor'
// 用于格式化XML
import vkbeautify from 'vkbeautify'
// 加载 XML 语言支持
import 'monaco-editor/esm/vs/basic-languages/xml/xml.contribution.js'
import { getLocalInput, setLocalInput } from '../utils/getLocalSettings.js'

// 格式化 XML
function formatXml(originalText) {
  const xmlDoc = new DOMParser().parseFromString(fixXMLString(originalText), 'text/xml')
  const xmlStr = new XMLSerializer().serializeToString(xmlDoc)
  return vkbeautify.xml(xmlStr)
}

function fixXMLString(xmlString) {
  // 修正属性值没有用引号包裹的情况
  xmlString = xmlString.replace(/=\s*([^'"][^\s>]+)/g, '="$1"');

  // 修正标签没有闭合的情况
  xmlString = xmlString.replace(/<([^\s>]+)([^>]*)\/>/g, '<$1$2></$1>');

  return xmlString;
}


/**
 * 压缩XML
 * @param {string} originalText
 * @return {string} compressXmlText
 */
function compressXml(originalText) {
  return originalText
}

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

const $formatBtn = document.getElementById('formatBtn')
$formatBtn.addEventListener('click', () => {
  const originalText = editor.getValue().trim()
  if (!originalText) {
    return
  }
  const formatValue = formatXml(originalText)
  editor.setValue(formatValue)
  setLocalInput(formatValue)
})


const $compressBtn = document.getElementById('compressBtn')
$compressBtn.addEventListener('click', () => {
  const originalText = editor.getValue()
  editor.setValue(compressXml(originalText))
})
