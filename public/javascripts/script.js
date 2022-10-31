var socket = io()

const mainScript = document.querySelector('#mainScript')

socket.on('input message', (msg) => {
  mainScript.innerText = msg
})
socket.on('save config', (data) => {
  var i = 0
  while (i < data.length) {
    switch (data[i].name) {
      case 'fontSize': {
        mainScript.style.fontSize = `${data[i].value}px`
        console.log(data[i].name)
        break
      }
      case 'fontWeight': {
        mainScript.style.fontWeight = data[i].value
        break
      }
      case 'color': {
        mainScript.style.color = '#' + data[i].value
        break
      }
      case 'borderWidth': {
        mainScript.style.webkitTextStroke = `${data[i].value}px black`
        break
      }
      case 'fontFamily': {
        mainScript.style.fontFamily = data[i].value
        break
      }
    }
    i++
  }
})
