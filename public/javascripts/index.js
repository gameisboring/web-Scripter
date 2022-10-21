var socket = io()

var textForm = document.getElementById('TextForm')
var configForm = document.getElementById('ConfigForm')
var configFormInputs = document.querySelectorAll('#ConfigForm > input')
var textInput = document.getElementById('TextInput')
var textSubmit = document.getElementById('textSubBtn')

textForm.addEventListener('submit', (e) => {
  e.preventDefault()
  if (textInput.value) {
    socket.emit('input message', textInput.value)
    textInput.value = ''
  }
})

configForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const configData = new Object()

  for (var i = 0; i < configFormInputs.length - 1; i++) {
    var name = configFormInputs[i].name
    var value = configFormInputs[i].value
    configData[name] = value
  }
  socket.emit('save config', configData)
})

textInput.addEventListener('keypress', (e) => {
  if (e.keyCode == 13) {
    textSubmit.click()
  }
})
