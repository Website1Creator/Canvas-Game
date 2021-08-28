let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight
const widthCenter = canvas.width / 2
const heightCenter = canvas.height / 2
const widthQuarter = canvas.width / 4
var pSize = canvas.height / 20
var playerMov = {x:0, y:0}
bullets = []
score = 0
//Get score element
scoreL = document.querySelector('score')

//Create Players
var Player1 = document.getElementById("Player1")
Player2 = document.getElementById("Player2")
ctx.drawImage(Player2, (widthQuarter * 3) - 25, heightCenter, 50, 100)

class Bullet {
    constructor(v, sx, sy, c, ctx, pSize) {
        this.velocity = v
        this.color = c
        this.ctx = ctx
        this.pSize = pSize
        this.x = sx + (pSize / 2)
        this.y = sy + (pSize / 2)
        this.radius = this.pSize / 10
    }
    draw () {
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        this.ctx.fillStyle = this.color
        this.ctx.fill()
    }
    update () {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

//In Charge Of Player 1
class player1 {
    constructor(pSize, pl1, ctx, wq, sh, wc, hc, playerMov) {
        this.playerMov = playerMov
        this.sh = sh
        this.wc = wc
        this.hc = hc
        this.wq = wq
        this.x = wq - 25
        this.y = hc
        this.ctx = ctx
        this.pl1 = pl1
        this.pSize = pSize
        this.angle = 0
        this.angleX = 0
        this.sw = this.wc * 2
        this.fired = 0
    }
    moveLeft() {
        this.playerMov.x = -2
    }
    moveRight() {
        this.playerMov.x = 2
    }
    moveForward() {
        this.playerMov.y = -2
    }
    moveBackward() {
        this.playerMov.y = 2
    }
    rotateR() {
        this.angleX= 0.1
    }
    rotateL() {
        this.angleX = -0.1
    }
    stopX() {
        this.playerMov.x = 0
    }
    stopY() {
        this.playerMov.y = 0
    }
    stopR() {
        this.angleX = 0
    }
    //Prevents Constant Firing while holding the fire key
    keyup() {
        this.fired = 0
    }
    //Fire Players Gun
    fire() {
        if (this.fired == 0) {
            this.fired = 1
            this.velocity = {
                x: Math.cos(this.angle - 1.55) * 5,
                y: Math.sin(this.angle - 1.55) * 5
            }
            this.c = 'blue'

            bullets.push(new Bullet(this.velocity, this.x, this.y, this.c, this.ctx, this.pSize))
        }
    }
    //Draw character and rotate
    draw() {
        this.ctx.save()
        this.ctx.translate(this.x + (this.pSize / 2), this.y + (this.pSize / 2))
        this.ctx.rotate(this.angle)
        this.ctx.translate(-(this.x + (this.pSize / 2)), -(this.y + (this.pSize / 2)))
        this.ctx.drawImage(this.pl1, this.x, this.y, this.pSize, this.pSize)
        this.ctx.rotate(this.angle)
        this.ctx.restore()
    }
    //Update all variables and draw
    update() {
        this.draw()
        this.angle = this.angle + this.angleX
        if(this.angle > 6) {
            this.angle = 0
        }
        if(this.angle < 0) {
            this.angle = 6
        }
        this.x = this.x + this.playerMov.x
        this.y = this.y + this.playerMov.y
        if(this.x > this.wc - this.pSize) this.x = this.wc - this.pSize
        if(this.x < 0) this.x = 0
        if(this.y < 0) this.y = 0
        if(this.y > this.sh - this.pSize) this.y = this.sh - this.pSize
    }
}

//Get Inputs
class inputs {
    constructor(playerMove) {
        document.addEventListener('keydown', (event) => {
            switch(event.keyCode) {
                case 65:
                    playerMove.moveLeft()
                    break;
 
                case 87:
                    playerMove.moveForward()
                    break;

                case 68:
                    playerMove.moveRight()
                    break;

                case 83:
                    playerMove.moveBackward()
                    break;

                case 88:
                    playerMove.fire()
                    break;

                case 67:
                    playerMove.rotateL()
                    break;

                case 86:
                    playerMove.rotateR()
                    break;
                }
        })

        document.addEventListener('keyup', (event) => {
            switch(event.keyCode) {
                case 65:
                    playerMove.stopX()
                    break;
 
                case 87:
                    playerMove.stopY()
                    break;

                case 68:
                    playerMove.stopX()
                    break;

                case 83:
                    playerMove.stopY()
                    break;

                case 88:
                    playerMove.keyup()
                    break;

                case 67:
                    playerMove.stopR()
                    break;

                case 86:
                    playerMove.stopR()
                    break;
                }
        })
    }
}

//Decoration On Screen(Only For Left Canvas)
class UI {
    constructor(ctx, sh, wq, wc, sw) {
        this.ctx = ctx
        this.sh = sh
        this.wq = wq
        this.wc = wc
        this.sw = sw
    }

    centerLine () {
        this.ctx.strokestyle = 'black'
        this.ctx.lineWidth = 2
        this.ctx.beginPath()
        this.ctx.moveTo(this.wc - 1, 0)
        this.ctx.lineTo(this.wc - 1, this.sh)
        this.ctx.stroke()
    }
}

//Make the classes and set inputs
playerOne = new player1(pSize, Player1, ctx, widthQuarter, innerHeight, widthCenter, heightCenter, playerMov)
new inputs(playerOne)//Add Player Two
//For Left Canvas
ui = new UI(ctx, innerHeight, widthQuarter, widthCenter, innerWidth)

function Bullets(bullets, wc, sh) {
    bullets.forEach((bullet, index) => {
        bullet.update()

        if (bullet.x < 0 || bullet.y < 0 || bullet.x > wc || bullet.y > sh) {
            setTimeout(() => {
                bullets.splice(index, 1)
            }, 0)
        }
    })
}

//Game Loop
let lastTime = 0
function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, innerWidth, innerHeight);
    playerOne.update(deltaTime);
    // playermove2.update(deltaTime);
    ui.centerLine()
    Bullets(bullets, widthCenter, innerHeight)
    scoreL.innerHTML = score

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);