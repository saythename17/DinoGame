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
Q. 점프 여러번 금지?

Q. 공룡이 달리는 것처럼 보이게?

Q. 배경 다가오는건?

Q. 장애물이 나타나는 간격을 랜덤하게?

Q. 점수표기는?

Q. 시간 지날 때 점수도 오르는 기능은? frame 함수 실행할떄 프레임마다 1++, 종료될때 멈추고 표시*/
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

canvas.width = window.innerWidth - 100
canvas.height = window.innerHeight - 100

const dinoImage = new Image()
dinoImage.src = 'dino.png'

var dino = {
  x: 20,
  y: 200,
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

let animation
let timer = 0
let jumpTimer = 0

let cactuses = []
let score = 0
// let scoreText = document.getElementById('score')
let jumping = false

function playPerFrame() {
  animation = requestAnimationFrame(playPerFrame)
  timer++

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (timer % 120 === 0) {
    var cactus = new Cactus(1500, 200, 100, 100)
    cactuses.push(cactus)
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
    if (dino.y < 100) {
      jumping = false
    }
    jumpTimer++
  } else if (dino.y < 200) {
    dino.y += 3
    jumpTimer = 0
  }
  if (jumpTimer > 200) {
    jumping = false
  }
  dino.draw()
}
playPerFrame()

const detectCollision = (dino, cactus) => {
  if (
    dino.x < cactus.x + cactus.width + 30 &&
    dino.x + dino.width > cactus.x + 30 &&
    dino.y < cactus.y + cactus.height &&
    dino.y + dino.height > cactus.y
  ) {
    console.log('collision')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    cancelAnimationFrame(animation)
    return true
  }
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    jumping = true
  }
})
