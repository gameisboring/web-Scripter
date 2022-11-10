var socket = io()

var textForm = document.getElementById('TextForm')
var configForm = document.getElementById('ConfigForm')
var configFormInputs = document.querySelectorAll('#ConfigForm input')
var raffleConfigForm = document.querySelector('#ConfigRaffleForm')
var raffleConfigFormInputs = document.querySelectorAll(
  '#ConfigRaffleForm input'
)

var textInput = document.getElementById('TextInput')
var textSubmit = document.getElementById('textSubBtn')

var cancleScriptBtn = document.querySelector('#cancleScriptBtn')
var showScriptBtn = document.querySelector('#showScriptBtn')

textForm.addEventListener('submit', (e) => {
  e.preventDefault()
  if (textInput.value) {
    socket.emit('input message', textInput.value)

    fetch('/script/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author: 'main',
        text: textInput.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))

    textInput.value = ''
  }
})

cancleScriptBtn.addEventListener('click', (e) => {
  socket.emit('toggle', 'hide')
  console.log('hide Button clicked')
  cancleScriptBtn.style.display = 'none'
  showScriptBtn.style.display = 'block'
})

showScriptBtn.addEventListener('click', (e) => {
  socket.emit('toggle', 'show')
  console.log('show Button clicked')
  cancleScriptBtn.style.display = 'block'
  showScriptBtn.style.display = 'none'
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

raffleConfigForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const data = new Object()
  const radio = document.getElementsByClassName('radioInput')
  for (var i in radio) {
    if (radio[i].checked) {
      data.useSound = radio[i].value
      console.log(data.useSound)
    }
  }
  data.range = document.getElementById('ConfigRaffleRange').value
  data.length = document.getElementById('ConfigRaffleLength').value

  console.log(data)
  await fetch('/raffle/config', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.ok) {
        alert('설정 입력 성공')
      } else {
        alert('설정 입력 실패')
      }
    })
})

textInput.addEventListener('keypress', (e) => {
  if (e.keyCode == 13) {
    textSubmit.click()
  }
})
