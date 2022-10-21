var socket = io()

const mainScript = document.querySelector('#mainScript')

socket.on('input message', (msg) => {
  mainScript.innerText = msg
})
socket.on('save config', (data) => {
  mainScript.style.fontSize = data.fontSize
    ? `${data.fontSize}px`
    : mainScript.style.fontSize

  mainScript.style.fontWeight = data.fontWeight
    ? data.fontWeight
    : mainScript.style.fontWeight

  mainScript.style.color = data.fontColor
    ? `#${data.fontColor}`
    : mainScript.style.color

  console.log(data)
})
