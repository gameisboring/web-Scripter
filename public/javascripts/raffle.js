const raffleStartBtn = document.querySelector('.textBox button')
const video = document.querySelector('.videoBackgroundBox video')
const winnerText = document.querySelector('.textBox .winnerText')
const winnerNumber = document.querySelector('.textBox .winnerNumber')
const controlBox = document.querySelector('.ctrlBox')
const retryBtn = document.querySelector('.ctrlBox .retryBtn')

var raffleTime = 0
document.addEventListener('DOMContentLoaded', async () => {
  const numbers = await raffleNumExtracter()

  raffleStartBtn.addEventListener('click', () => {
    console.log('button click')
    video.play()
    raffleStartBtn.style.opacity = 0

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
   * @returns numbers
   */
  async function raffleNumExtracter() {
    const config = await fetch('/raffle/config', { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        return data
      })
    // const array = new Uint32Array(length)
    // self.crypto.getRandomValues(array)

    let numbers = []
    let i = 0
    while (i < (await config.numLength)) {
      let n = Math.floor(Math.random() * (await config.numRange)) + 1
      if (!sameNum(n)) {
        numbers.push(n)
        i++
      }
    }
    function sameNum(n) {
      return numbers.find((e) => e === n)
    }
    console.log(numbers)
    return numbers
  }
})
