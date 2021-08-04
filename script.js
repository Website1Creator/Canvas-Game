let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight
const widthCenter = canvas.width / 2
const heightCenter = canvas.height / 2
const widthQuarter = canvas.width / 4

//Create Players
function Players(wq, hc, ctx) {
    Player1 = document.getElementById("Player1")
    ctx.drawImage(Player1, wq - 25, hc, 50, 100)

    Player2 = document.getElementById("Player2")
    ctx.drawImage(Player2, (wq * 3) - 25, hc, 50, 100)
}

//In Charge Of Player Movement
class playerMove {
    constructor(wc, hc) {
        this.playerMov = {
            x: 0, 
            y: 0
        }
        this.wc = wc
        this.hc = hc
    }
    moveLeft() {
        this.playerMov.x = -1
    }
    moveRight() {
        this.playerMov.x = 1
    }
    moveForward() {
        this.playerMov.y = 1
    }
    moveBackward() {
        this.playerMov.y = -1
    }
    rotateR() {

    }
    rotateL() {

    }
    stop() {
        this.playerMov.x = 0
        this.playerMov.y = 0
    }
    stopR() {

    }
}

let playerMov

//Players gun
class playerGun {
    constructor() {

    }
    fire() {

    }
}

//Get Inputs
class input {
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
                    playerMove.stop()
                    break;
 
                case 87:
                    playerMove.stop()
                    break;

                case 68:
                    playerMove.stop()
                    break;

                case 83:
                    playerMove.stop()
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
playermove = new playerMove(widthCenter, heightCenter)
playergun = new playerGun()
new input(playermove, playergun)
Players(widthQuarter, heightCenter, ctx)
//For Left Canvas
ui = new UI(ctx, innerHeight, widthQuarter, widthCenter, innerWidth)
ui.centerLine()
function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    game.update(deltaTime);
    game.draw(ctx);

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);