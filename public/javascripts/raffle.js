const raffleStartBtn = document.querySelector('.textBox button')
const video = document.querySelector('.videoBackgroundBox video')
const winnerText = document.querySelector('.textBox .winnerText')
const winnerNumber = document.querySelector('.textBox .winnerNumber')
const controlBox = document.querySelector('.ctrlBox')
const retryBtn = document.querySelector('.ctrlBox .retryBtn')

var raffleTime = 0
const raffleNum = raffleNumExtracter(10, 100)
console.log('raffle number', raffleNum)
raffleStartBtn.addEventListener('click', () => {
  console.log('button click')
  video.play()
  raffleStartBtn.style.opacity = 0

  setTimeout(() => {
    raffleStartBtn.style.display = 'none'
  }, 300)

  setTimeout(() => {
    winnerText.style.display = 'block'
    winnerNumber.innerText = raffleNum[raffleTime]
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
 * @param {Number} length
 * @param {Number} range
 * @returns numbers
 */
function raffleNumExtracter(length, range) {
  let numbers = []
  let i = 0
  while (i < length) {
    let n = Math.floor(Math.random() * range) + 1
    if (!sameNum(n)) {
      numbers.push(n)
      i++
    }
  }
  function sameNum(n) {
    return numbers.find((e) => e === n)
  }
  return numbers
}
