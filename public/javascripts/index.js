var socket = io()

var textForm = document.getElementById('TextForm')
var configForm = document.getElementById('ConfigForm')
var configFormInputs = document.querySelectorAll('#ConfigForm input')

var textInput = document.getElementById('TextInput')
var textSubmit = document.getElementById('textSubBtn')

var cancleScriptBtn = document.querySelector('#cancleScriptBtn')

textForm.addEventListener('submit', (e) => {
  e.preventDefault()
  if (textInput.value) {
    socket.emit('input message', textInput.value)
    textInput.value = ''
  }
})

configForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const configData = new Array()

  for (var i = 0; i < configFormInputs.length - 1; i++) {
    var name = configFormInputs[i].name
    var value = configFormInputs[i].value
    console.log(value)
    console.log(typeof value)
    if (value != '') {
      configData.push({ name: name, value: value })
    }
  }
  socket.emit('save config', configData)
})

textInput.addEventListener('keypress', (e) => {
  if (e.keyCode == 13) {
    textSubmit.click()
  }
})

cancleScriptBtn.addEventListener('click', (e) => {
  console.log('cancle Button clicked')
})
