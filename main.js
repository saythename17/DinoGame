/** @format */
// TODO
// 1. Add score
// 2. Add game over screen
// 3. Add start screen
// 4. Add sound
// 5. Add background
// 6. Add more cactuses
// 7. Add more dinos
// 8. Add more obstacles
// 9. Add more levels
// 10. Add more animations
// 11. Add more powerups
// 12. Add more enemies
/** 
Q. 이단 점프 기능 구현

Q. 공룡이 달리는 것처럼 보이게?

Q. 배경 다가오는건?

Q. 장애물이 나타나는 간격을 랜덤하게?

Q. 점수표기는?

Q. 시간 지날 때 점수도 오르는 기능은? frame 함수 실행할떄 프레임마다 1++, 종료될때 멈추고 표시*/
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

canvas.width = window.innerWidth - 100
canvas.height = window.innerHeight - 100
const windowMiddleHeight = window.innerHeight / 2 - 100

const dinoImage = new Image()
dinoImage.src = 'dino.png'

/********UI, Chraacter************* */
var dino = {
  x: 20,
  y: windowMiddleHeight,
  width: 100,
  height: 100,
  draw() {
    ctx.fillStyle = 'green'
    // ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.drawImage(dinoImage, this.x, this.y, this.width, this.height)
  },
  changeColor() {
    ctx.fillStyle = 'yellow'
  },
}

const cactusImage = new Image()
cactusImage.src = 'cactus.png'

class Cactus {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
  draw() {
    ctx.fillStyle = 'red'
    // ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.drawImage(cactusImage, this.x, this.y, this.width, this.height)
  }
}

const score = {
  value: 0,
  x: canvas.width - 50,
  y: 100,
  draw() {
    ctx.fillStyle = 'black'
    ctx.font = '30px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(this.value, this.x, this.y)
  },
}

/*************************************/

let animation
let timer = 0

let jumping = false
let jumpTimer = 0
let jumpHeight = 150

let cactuses = []

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function playPerFrame() {
  animation = requestAnimationFrame(playPerFrame)
  timer++

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (timer % 15 === 0) {
    score.value++
  }
  if (timer % 120 === 0) {
    console.log('timer', timer)
    generateRandomCactus()
  }
  cactuses.forEach((cactus, index, array) => {
    if (cactus.x < 0) {
      array.splice(index, 1)
    }
    detectCollision(dino, cactus)
    cactus.x -= 5
    cactus.draw()
  })

  if (jumping) {
    dino.y -= 5
    if (dino.y < jumpHeight) {
      jumping = false
    }
    jumpTimer++
  } else if (dino.y < windowMiddleHeight) {
    dino.y += 3
    jumpTimer = 0
  }
  if (jumpTimer > 200) {
    jumping = false
  }
  dino.draw()
  score.draw()
}
playPerFrame()
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

document.addEventListener('keydown', (e) => {
  if (dino.y >= windowMiddleHeight && e.code === 'Space') {
    jumping = true
  }
})

//------------------------------------
const detectCollision = (dino, cactus) => {
  if (
    dino.x < cactus.x + cactus.width + 30 &&
    dino.x + dino.width > cactus.x + 30 &&
    dino.y < cactus.y + cactus.height &&
    dino.y + dino.height > cactus.y
  ) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    cancelAnimationFrame(animation)
    return true
  }
}

function generateRandomCactus() {
  if (getRandomInt(0, 100) > 50) return
  var cactus = new Cactus(1500, windowMiddleHeight, 100, 100)
  cactuses.push(cactus)
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //최댓값은 제외, 최솟값은 포함
}
