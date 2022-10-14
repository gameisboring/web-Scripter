var socket = io()

const mainScript = document.getElementById('mainScript')

socket.on('print message', (msg) => {
  mainScript.innerText = msg
})
