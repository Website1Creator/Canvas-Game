let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight
const widthCenter = canvas.width / 2
const heightCenter = canvas.height / 2
const widthQuarter = canvas.width / 4
var pSize = canvas.height / 20
var playerMov = {x:0, y:0}

//Create Players
Player1 = document.getElementById("Player1")
Player2 = document.getElementById("Player2")
ctx.drawImage(Player2, (widthQuarter * 3) - 25, heightCenter, 50, 100)


//In Charge Of Player Movement
class playerMove1 {
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
        this.angleX= 0.001
    }
    rotateL() {
        this.angleX = -0.001
    }
    stopX() {
        this.playerMov.x = 0
    }
    stopY() {
        this.playerMov.y = 0
    }
    stopR() {
        this.angle = 0
        this.angleX = 0
    }
    draw() {
        ctx.rotate(this.angle)
        this.ctx.drawImage(this.pl1, this.x, this.y, this.pSize, this.pSize)
    }
    update() {
        this.draw()
        this.angle = this.angle + this.angleX 
        this.x = this.x + this.playerMov.x
        this.y = this.y + this.playerMov.y
        if(this.x > this.wc - this.pSize) this.x = this.wc - this.pSize
        if(this.x < 0) this.x = 0
        if(this.y < 0) this.y = 0
        if(this.y > this.sh - this.pSize) this.y = this.sh - this.pSize
    }
}


//Players gun
class playerGun {
    constructor() {

    }
    fire() {

    }
}

//Get Inputs
class input1 {
    constructor(playerMove, playerGun) {
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
                    playerGun.fire()
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
playermove1 = new playerMove1(pSize, Player1, ctx, widthQuarter, innerHeight, widthCenter, heightCenter, playerMov)
playergun = new playerGun()
new input1(playermove1, playergun)
//For Left Canvas
ui = new UI(ctx, innerHeight, widthQuarter, widthCenter, innerWidth)

let lastTime = 0

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, innerWidth, innerHeight);
    playermove1.update(deltaTime);
    // playermove2.update(deltaTime);
    ui.centerLine()

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);