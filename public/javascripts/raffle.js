const raffleStartBtn = document.querySelector('.textBox button')
const video = document.querySelector('.videoBackgroundBox video')
const winnerText = document.querySelector('.textBox .winnerText')
const winnerNumber = document.querySelector('.textBox .winnerNumber')
const controlBox = document.querySelector('.ctrlBox')
const retryBtn = document.querySelector('.ctrlBox .retryBtn')
var fanfare1 = new Audio('audios/Fanfare1.mp3')
var fanfare2 = new Audio('audios/Fanfare2.mp3')
var tada = new Audio('audios/TaDa.mp3')
var socket = io()

var raffleTime = 0
document.addEventListener('DOMContentLoaded', async () => {
  const numbers = await raffleNumExtracter()
  const config = await fetch('/raffle/config', { method: 'GET' })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      return data
    })

  raffleStartBtn.addEventListener('click', () => {
    console.log('button click')
    video.play()
    raffleStartBtn.style.opacity = 0
    console.log(config)
    if (config.useSound) {
      fanfare1.play()
      setTimeout(() => {
        tada.play()
      }, 9500)
    }

    setTimeout(() => {
      raffleStartBtn.style.display = 'none'
    }, 300)

    setTimeout(async () => {
      winnerText.style.display = 'block'
      winnerNumber.innerText = numbers[raffleTime]
    }, 1000)

    setTimeout(() => {
      winnerText.style.transform = 'scale(6)'
    }, 8000)
  })

  video.addEventListener('pause', () => {
    controlBox.style.display = 'block'
    raffleTime++
  })

  retryBtn.addEventListener('click', () => {
    if (video.paused) {
      winnerText.style.display = 'none'
      winnerText.style.transform = 'scale(0)'
      raffleStartBtn.click()
      controlBox.style.display = 'none'
    }
  })

  /**
   * 중복없는 정수 배열을 반환합니다
   * @returns randomNumbs
   */
  async function raffleNumExtracter() {
    const randomNumbs = await fetch('/raffle/numbers', { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        socket.emit('send numbers', data)
        return data
      })
    return randomNumbs
  }
})
