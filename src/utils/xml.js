import vkbeautify from 'vkbeautify'

/**
 * 预格式化，用于修正xml字符串中不合规的部分，并去除多余的空白字符
 * @param originalText xml字符串
 * @returns {string} 预格式化后的xml字符串
 */
export function preFormat(originalText) {
  const xmlDoc = new DOMParser().parseFromString(fixXMLString(originalText), 'text/xml')
  return new XMLSerializer().serializeToString(xmlDoc)
}

export function fixXMLString(xmlString) {
  // 修正属性值没有用引号包裹的情况
  xmlString = xmlString.replace(/=\s*([^'"][^\s>]+)/g, '="$1"')

  // 修正标签没有闭合的情况
  xmlString = xmlString.replace(/<([^\s>]+)([^>]*)\/>/g, '<$1$2></$1>')

  return xmlString
}

// 格式化 XML
export function formatXml(originalText) {
  const xmlStr = preFormat(originalText)
  return vkbeautify.xml(xmlStr)
}

/**
 * 压缩XML
 * @param {string} originalText
 * @return {string} compressXmlText
 */
export function compressXml(originalText) {
  const xmlStr = preFormat(originalText)
  return vkbeautify.xmlmin(xmlStr)
}
