var socket = io()
const mainScript = document.querySelector('#mainScript')

fetch('/script/data', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    mainScript.innerText = data.text
  })

socket.on('input message', (msg) => {
  console.log('input message')
  mainScript.innerText = msg
})

socket.on('toggle', (msg) => {
  console.log(msg)
  if (msg === 'hide') {
    mainScript.parentNode.style.opacity = 0
  } else if (msg === 'show') {
    mainScript.parentNode.style.opacity = 100
  }
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
