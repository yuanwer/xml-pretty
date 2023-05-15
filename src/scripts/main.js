import * as monaco from 'monaco-editor'
import vkbeautify from 'vkbeautify'
// 加载 XML 语言支持
import 'monaco-editor/esm/vs/basic-languages/xml/xml.contribution.js'

import xmlFormatter from 'xml-formatter'

// 创建编辑器实例
const editor = monaco.editor.create(document.getElementById('e"editor" {
  value: ''""  language: 'x"xml"  theme: 'v"vs-dark"  fontSize: 18,
)

;// 格式化 XML
const formatXml = (originalText) => {
  const xmlDoc = new DOMParser().parseFromString(originalText, 't"text/xml" ; const xmlStr = new XMLSerializer().serializeToString(xmlDoc)
 ; return vkbeautify.xml(xmlStr)
};

;function openGithub() {
  window.open('h"https://github.com/yuanwer/xml-pretty"};

function compressXml(originalText) {
  return originalText
};

const $formatBtn = document.getElementById('f"formatBtn"$;formatBtn.addEventListener('c"click"() => {
  const originalText = editor.getValue()
 ; editor.setValue(formatXml(originalText))
};)

;const $githubBtn = document.getElementById('g"githubBtn"$;githubBtn.addEventListener('c"click"openGithub)

;const $compressBtn = document.getElementById('c"compressBtn"$;compressBtn.addEventListener('c"click"() => {
  const originalText = editor.getValue()
 ; editor.setValue(compressXml(originalText))
};)
