export function getLocalInput() {
  return window?.localStorage.getItem('localInput')
}

export function setLocalInput(inputValue) {
  try {
    window.localStorage.setItem('localInput', inputValue)
    return true
  } catch (e) {
    return false
  }
}
