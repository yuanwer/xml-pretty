import * as monaco from 'monaco-editor'

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
const formatXml = () => {
  try {
    const originalText = editor.getValue()
    const formattedText = xmlFormatter(originalText, {
      // 这里可以添加美化选项
      indentation: '    ', // 使用4个空格缩进
      collapseContent: true, // 将只包含文本的元素折叠成一行
    })
    editor.setValue(formattedText)
  } catch (error) {}
}

const $formatBtn = document.getElementById('formatBtn')
$formatBtn.addEventListener('click', formatXml)

const $settingBtn = document.getElementById('settingBtn')
$settingBtn.addEventListener('click', openSettings)

function openSettings() {}
