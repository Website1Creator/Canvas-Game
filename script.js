let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight
const widthCenter = canvas.width / 2
const heightCenter = canvas.height / 2
const widthQuarter = canvas.width / 4
var pSize = canvas.height / 20
var playerMov1 = {x:0, y:0}
var playerMov2 = {x:0, y:0}
bullets1 = []
bullets2 = []
enemiesO = []
enemiesT = []
enemyTimer = 0
//Get score element
scoreL = document.querySelector('scoreL')
scoreR = document.querySelector('scoreR')
width = ((innerWidth - 50)) + 'px'
document.querySelector('scoreR').style.marginLeft = width

//Create Players
var Player1 = document.getElementById("Player1")
var Player2 = document.getElementById("Player2")

class game {
    constructor(scoreL, scoreR) {
        this.scoreLeft = 100
        this.scoreRight = 100
        this.scoreL = scoreL
        this.scoreR = scoreR
        this.enemiesT = enemiesT
        this.enemies1 = enemies1
    }
    scoreLeftAdd () {
        this.scoreLeft += 25
        this.scoreL.innerHTML = this.scoreLeft
    }
    scoreRightAdd () {
        this.scoreRight += 25
        this.scoreR.innerHTML = this.scoreRight
    }
    scoreLeftSubtract () {
        this.scoreLeft -= 25
        this.scoreL.innerHTML = this.scoreLeft
    }
    scoreRightSubtract () {
        this.scoreRight -= 25
        this.scoreR.innerHTML = this.scoreRight
    }
    update(gameloop) {
        if (this.scoreLeft <= 0 || this.scoreRight <= 0) {
            cancelAnimationFrame(gameloop)
            console.log(this.scoreLeft)
        }
    }
}

class bullet1 {
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

class bullet2 {
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
    constructor(pSize, pl1, ctx, wq, sh, wc, hc, playerMov1) {
        this.playerMov1 = playerMov1
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
        this.playerMov1.x = -2
    }
    moveRight() {
        this.playerMov1.x = 2
    }
    moveForward() {
        this.playerMov1.y = -2
    }
    moveBackward() {
        this.playerMov1.y = 2
    }
    rotateR() {
        this.angleX= 0.1
    }
    rotateL() {
        this.angleX = -0.1
    }
    stopX() {
        this.playerMov1.x = 0
    }
    stopY() {
        this.playerMov1.y = 0
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
                x: Math.cos(this.angle - 1.55),
                y: Math.sin(this.angle - 1.55)
            }
            this.c = 'blue'

            bullets1.push(new bullet1(this.velocity, this.x, this.y, this.c, this.ctx, this.pSize))
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
        this.x = this.x + this.playerMov1.x
        this.y = this.y + this.playerMov1.y
        if(this.x > this.wc * 2 - this.pSize) this.x = this.wc * 2 - this.pSize
        if(this.x < 0) this.x = 0
        if(this.y < 0) this.y = 0
        if(this.y > this.sh - this.pSize) this.y = this.sh - this.pSize
    }
}

class player2 {
    constructor(pSize, pl2, ctx, wq, sh, wc, hc, playerMov2) {
        this.playerMov2 = playerMov2
        this.sh = sh
        this.wc = wc
        this.hc = hc
        this.wq = wq
        this.x = wc + wq - 25
        this.y = hc
        this.ctx = ctx
        this.pl2 = pl2
        this.pSize = pSize
        this.angle = 0
        this.angleX = 0
        this.sw = this.wc * 2
        this.fired = 0
    }
    moveLeft() {
        this.playerMov2.x = -2
    }
    moveRight() {
        this.playerMov2.x = 2
    }
    moveForward() {
        this.playerMov2.y = -2
    }
    moveBackward() {
        this.playerMov2.y = 2
    }
    rotateR() {
        this.angleX= 0.1
    }
    rotateL() {
        this.angleX = -0.1
    }
    stopX() {
        this.playerMov2.x = 0
    }
    stopY() {
        this.playerMov2.y = 0
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
                x: Math.cos(this.angle - 1.55),
                y: Math.sin(this.angle - 1.55)
            }
            this.c = 'red'

            bullets2.push(new bullet2(this.velocity, this.x, this.y, this.c, this.ctx, this.pSize))
        }
    }
    //Draw character and rotate
    draw() {
        this.ctx.save()
        this.ctx.translate(this.x + (this.pSize / 2), this.y + (this.pSize / 2))
        this.ctx.rotate(this.angle)
        this.ctx.translate(-(this.x + (this.pSize / 2)), -(this.y + (this.pSize / 2)))
        this.ctx.drawImage(this.pl2, this.x, this.y, this.pSize, this.pSize)
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
        this.x = this.x + this.playerMov2.x
        this.y = this.y + this.playerMov2.y
        if(this.x > this.wc * 2 - this.pSize) this.x = this.wc * 2 - this.pSize
        if(this.x < 0) this.x = 0
        if(this.y < 0) this.y = 0
        if(this.y > this.sh - this.pSize) this.y = this.sh - this.pSize
    }
}

class enemies1 {
    constructor(ctx, pl1, x, y) {
        this.angle = 0
        this.ctx = ctx
        this.pl1 = pl1
        this.x = x
        this.y = y
        this.size = 25
        this.velX = 0
        this.velY = 0
    }
    draw () {
        this.ctx.save()
        this.ctx.translate(this.x + (this.size / 2), this.y + (this.size / 2))
        this.ctx.rotate(this.angle + 1.5)
        this.ctx.translate(-(this.x + (this.size / 2)), -(this.y + (this.size / 2)))
        this.ctx.drawImage(this.pl1, this.x, this.y, this.size, this.size)
        this.ctx.rotate(this.angle + 1.5)
        this.ctx.restore()
    }
    update () {
        this.angle = Math.atan2(
            (playerOne.y + (playerOne.pSize / 4)) - this.y,
            (playerOne.x + (playerOne.pSize / 4)) - this.x
        )
        this.draw()
        this.vel = {
            x: Math.cos(this.angle),
            y: Math.sin(this.angle)
        }
        this.x = this.x + this.vel.x
        this.y = this.y + this.vel.y
    }
}

class enemies2 {
    constructor(ctx, pl2, x, y) {
        this.angle = 0
        this.ctx = ctx
        this.pl2 = pl2
        this.x = x
        this.y = y
        this.size = 25
        this.velX = 0
        this.velY = 0
        this.enemyDist = 0
        }
    draw () {
        this.ctx.save()
        this.ctx.translate(this.x + (this.size / 2), this.y + (this.size / 2))
        this.ctx.rotate(this.angle + 1.5)
        this.ctx.translate(-(this.x + (this.size / 2)), -(this.y + (this.size / 2)))
        this.ctx.drawImage(this.pl2, this.x, this.y, this.size, this.size)
        this.ctx.rotate(this.angle + 1.5)
        this.ctx.restore()
    }
    update () {
        this.angle = Math.atan2(
            (playerTwo.y + (playerTwo.pSize / 4)) - this.y,
            (playerTwo.x + (playerTwo.pSize / 4)) - this.x
        )
        this.enemyDist = Math.hypot(playerTwo.x - this.x, playerTwo.y - this.y)
            // if(enemyDist < 10) {
            //     setTimeout(() => {
            //         enemiesT.splice(enemyIndex, 1)
            //     }, 0)
            // }
        this.draw()
        this.vel = {
            x: Math.cos(this.angle),
            y: Math.sin(this.angle)
        }
        this.x = this.x + this.vel.x
        this.y = this.y + this.vel.y
    }
}

function enemyControllerL(ctx, Player1, enemiesO, playerOne, enemyTimer, bullets1, wc, sh, Game) {
    x = 0
    y = 0
    if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - 17.5 : canvas.width - 25
        y = Math.random() * canvas.height
    } else {
        x = Math.random() * canvas.width
        y = Math.random() < 0.5 ? 0 - 17.5 : canvas.height + 17.5      
    }
    if(enemyTimer > 1) {
        enemiesO.push(new enemies1(ctx, Player1, x, y, playerOne))
    }

    enemiesO.forEach((enemies1, enemyIndex) => {
        enemies1.update()
        
        bullets1.forEach((bullet1, index) => {
            bullet1.update()
        
            if (bullet1.x < 0 || bullet1.y < 0 || bullet1.x > wc * 2 || bullet1.y > sh) {
                setTimeout(() => {
                    bullets1.splice(index, 1)
                }, 0)
            }
            const dist = Math.hypot(bullet1.x - enemies1.x, bullet1.y - enemies1.y)
            if(dist - 17.5 - bullet1.radius < 1) {
                Game.scoreLeftAdd()
                setTimeout(() => {
                    bullets1.splice(index, 1)
                    enemiesO.splice(enemyIndex, 1)
                }, 0)
            }
            const enemyDist = Math.hypot(playerOne.x - enemies1.x, playerOne.y - enemies1.y)
            if(enemyDist < 10) {
                setTimeout(() => {
                    enemiesO.splice(enemyIndex, 1)
                }, 0)
            }
        })
    })
}

function enemyControllerR(ctx, Player2, enemiesT, playerTwo, enemyTimer, bullets2, wc, sh, Game) {
    x = 0
    y = 0
    if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - 17.5 : canvas.width - 25
        y = Math.random() * canvas.height
    } else {
        x = Math.random() < 0.5 ? 0 - 17.5 : canvas.width - 25
        y = Math.random() < 0.5 ? 0 - 17.5 : canvas.height + 17.5      
    }
    if(enemyTimer > 1) {
        enemiesT.push(new enemies2(ctx, Player2, x, y, playerTwo))
    }

    enemiesT.forEach((enemies2, enemyIndex) => {
        enemies2.update()
        
        bullets2.forEach((bullet2, index) => {
            bullet2.update()
        
            if (bullet2.x < 0 || bullet2.y < 0 || bullet2.x > wc * 2 || bullet2.y > sh) {
                setTimeout(() => {
                    bullets2.splice(index, 1)
                }, 0)
            }
            const dist = Math.hypot(bullet2.x - enemies2.x, bullet2.y - enemies2.y)
            if(dist - 17.5 - bullet2.radius < 1) {
                Game.scoreRightAdd()
                setTimeout(() => {
                    bullets2.splice(index, 1)
                    enemiesT.splice(enemyIndex, 1)
                }, 0)
            }
        })
    })
}

//Get Inputs
class inputs {
    constructor(playerMove1, playerMove2) {
        document.addEventListener('keydown', (event) => {
            switch(event.keyCode) {
                case 65:
                    playerMove1.moveLeft()
                    break;
 
                case 87:
                    playerMove1.moveForward()
                    break;

                case 68:
                    playerMove1.moveRight()
                    break;

                case 83:
                    playerMove1.moveBackward()
                    break;

                case 88:
                    playerMove1.fire()
                    break;

                case 67:
                    playerMove1.rotateL()
                    break;

                case 86:
                    playerMove1.rotateR()
                    break;

                case 37:
                    playerMove2.moveLeft()
                    break;
 
                case 38:
                    playerMove2.moveForward()
                    break;

                case 39:
                    playerMove2.moveRight()
                    break;

                case 40:
                    playerMove2.moveBackward()
                    break;

                case 77:
                    playerMove2.fire()
                    break;

                case 188:
                    playerMove2.rotateL()
                    break;

                case 190:
                    playerMove2.rotateR()
                    break;
                }
        })

        document.addEventListener('keyup', (event) => {
            switch(event.keyCode) {
                case 65:
                    playerMove1.stopX()
                    break;
 
                case 87:
                    playerMove1.stopY()
                    break;

                case 68:
                    playerMove1.stopX()
                    break;

                case 83:
                    playerMove1.stopY()
                    break;

                case 88:
                    playerMove1.keyup()
                    break;

                case 67:
                    playerMove1.stopR()
                    break;

                case 86:
                    playerMove1.stopR()
                    break;

                case 65:
                    playerMove1.stopX()
                    break;
 
                case 87:
                    playerMove1.stopY()
                    break;

                case 68:
                    playerMove1.stopX()
                    break;

                case 83:
                    playerMove1.stopY()
                    break;

                case 88:
                    playerMove1.keyup()
                    break;

                case 67:
                    playerMove1.stopR()
                    break;

                case 86:
                    playerMove1.stopR()
                    break;

                case 37:
                    playerMove2.stopX()
                    break;
 
                case 38:
                    playerMove2.stopY()
                    break;

                case 39:
                    playerMove2.stopX()
                    break;

                case 40:
                    playerMove2.stopY()
                    break;

                case 77:
                    playerMove2.keyup()
                    break;

                case 188:
                    playerMove2.stopR()
                    break;

                case 190:
                    playerMove2.stopR()
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

    // centerLine () {
    //     this.ctx.strokestyle = 'black'
    //     this.ctx.lineWidth = 2
    //     this.ctx.beginPath()
    //     this.ctx.moveTo(this.wc - 1, 0)
    //     this.ctx.lineTo(this.wc - 1, this.sh)
    //     this.ctx.stroke()
    // }
}

function deathController(enemiesO, enemiesT, playerOne, playerTwo, Game) {
    this.enemiesO.forEach((enemies1, enemyIndex) => {
        this.enemyDist1 = Math.hypot(playerOne.x - enemies1.x, playerOne.y - enemies1.y)
        if(this.enemyDist1 - 17.5 < 1) {
            Game.scoreLeftSubtract()
            setTimeout(() => {
                enemiesO.splice(enemyIndex, 1)
            }, 0)
        }
    })
    this.enemiesT.forEach((enemies2, enemyIndex) => {
        this.enemyDist2 = Math.hypot(playerTwo.x - enemies2.x, playerTwo.y - enemies2.y)
        if(this.enemyDist2 - 17.5 < 1) {
            Game.scoreRightSubtract()
            setTimeout(() => {
                enemiesT.splice(enemyIndex, 1)
            }, 0)
        }
    })
}

//Make the classes and set inputs
playerOne = new player1(pSize, Player1, ctx, widthQuarter, innerHeight, widthCenter, heightCenter, playerMov1)
playerTwo = new player2(pSize, Player2, ctx, widthQuarter, innerHeight, widthCenter, heightCenter, playerMov2)
new inputs(playerOne, playerTwo)
//For Left Canvas
enemiesOne = new enemies1(ctx, Player1)
enemiesTwo = new enemies2(ctx, Player2)
ui = new UI(ctx, innerHeight, widthQuarter, widthCenter, innerWidth)
Game = new game(scoreL, scoreR, enemiesO, enemiesT, playerOne, playerTwo, enemiesOne, enemiesTwo)

//Game Loop
let lastTime = 0
function gameLoop(timestamp) {
    gameloop = requestAnimationFrame(gameLoop)
    let deltaTime = timestamp - lastTime
    lastTime = timestamp

    ctx.clearRect(0, 0, innerWidth, innerHeight)
    playerOne.update(deltaTime)
    playerTwo.update(deltaTime)
    // ui.centerLine()
    enemiesOne.draw()
    enemiesTwo.draw()
    Game.update(gameloop)
    enemyTimer = enemyTimer + 0.02
    deathController(enemiesO, enemiesT, playerOne, playerTwo, Game)
    enemyControllerL(ctx, Player1, enemiesO, playerOne, enemyTimer, bullets1, widthCenter, innerHeight, Game)
    enemyControllerR(ctx, Player2, enemiesT, playerTwo, enemyTimer, bullets2, widthCenter, innerHeight, Game)
    if(enemyTimer > 1) {
        enemyTimer = 0
    }
    // requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)