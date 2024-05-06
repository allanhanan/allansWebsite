html5: false
console.log("init")
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const baground = new Image()
const gitc = new Image()
const plyr = new Image()
const plyrUp = new Image()
const plyrLeft = new Image()
const plyrRight = new Image()
const loading = new Image()
const insta = new Image()
var audio = new Audio("./assets/bgmsc.mp3")
audio.loop = true
audio.volume = 0.5



insta.src = './assets/insta.png'
loading.src = './assets/loading.png'
plyr.src = './assets/playerDown.png'
plyrUp.src = 'https://cdn.discordapp.com/attachments/990279097366245439/1236333362608865392/playerUp.png?ex=6637a0ab&is=66364f2b&hm=f7ec56c999e89ac7453870c17c0e80e72844da673bdd04c96de5bc2c90274366&'
plyrLeft.src = './assets/playerLeft.png'
plyrRight.src = './assets/playerRight.png'
baground.src = './assets/spcBGts.png'
gitc.src = './assets/git.png'

canvas.width = window.innerWidth
canvas.height = window.innerHeight

ctx.drawImage(loading,0,0)
let clicked = false
let collisionFlag = false
let i = 0.1
let j = 0.1
let fell = false
audio.load()



class Sprite{
    constructor({position, velocity, image, frames = { max: 1}, sprites }){
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0}
        this.moving = false
        this.sprites = sprites

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height / this.frames.max

        }
    }

    draw(){
        ctx.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )

        if (!this.moving) return
        if (this.frames.max > 1){
            this.frames.elapsed++
        } 
        if (this.frames.elapsed % 10 === 0){
            if (this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
        }
    }
}


const offset = {
    x: -2000,
    y: -2000
}

const player = new Sprite({
    position: {
        x: canvas.width/2 - (plyr.width/4)/2,
        y: canvas.height/2 - plyr.height/2
    },
    frames: {
        max: 4
    },
    image: plyr,
    sprites: {
        up: plyrUp,
        left: plyrLeft,
        down: plyr,
        right: plyrRight
 
    }

})
const loadplayer = new Sprite({
    position: {
        x: canvas.width/4 - 15,
        y: canvas.height/2 - 115
    },
    frames: {
        max: 4
    },
    image: plyrRight
})

const bg = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: baground
})

const git = new Sprite({
    position: {
        x: 400,
        y: 400
    },
    image: gitc
})

const ig = new Sprite({
    position: {
        x: 1000,
        y: 450
    },
    image: insta
})

const keys= {
    w: {pressed: false},
    a: {pressed: false},
    s: {pressed: false},
    d: {pressed: false}
}

const movables = [bg, git, ig]

function sleep(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
}

function colltest({rect1, rect2}){
    return(
        rect1.position.x + rect1.width >= rect2.position.x &&
        rect1.position.x <= rect2.position.x + rect2.width  &&
        rect1.position.y <= rect2.position.y + rect2.height &&
        rect1.position.y + rect1.height >= rect2.position.y
    )

}


function showConfirmation(message) {
    return new Promise((resolve) => {
      const modal = document.getElementById("confirmationModal")
      const confirmButton = document.getElementById("confirmButton")
      const cancelButton = document.getElementById("cancelButton")

      document.getElementById("confirmationMessage").textContent = message
      modal.style.display = "block"

      confirmButton.focus()

      function handleKeyDown(event) {
        if (event.key === "ArrowRight") {
            console.log("right")
            event.preventDefault()
            cancelButton.focus()
        } else if (event.key === "ArrowLeft") {
            console.log('left')
            event.preventDefault()
             confirmButton.focus()
        } else if (event.key === "Enter") {
             modal.style.display = "none"
             resolve(document.activeElement === confirmButton)
        }
      }
  
      window.addEventListener("keydown", handleKeyDown);
  
      confirmButton.addEventListener("click", () => {
        modal.style.display = "none"
        resolve(true)
      })
  
      cancelButton.addEventListener("click", () => {
        modal.style.display = "none"
        resolve(false)
      })
    })
}

function drawProgressBar(x, y, width, height, progress) {
    //Background
    ctx.fillStyle = 'gray'
    ctx.fillRect(x, y, width, height)
    
    //Progress
    ctx.fillStyle = 'blue'
    ctx.fillRect(x, y, width * progress, height)
    console.log("drawn")
}


function drawallBG(){
    bg.draw()
    git.draw()
    ig.draw()
}
  


function animate(){

    window.requestAnimationFrame(animate)
    drawallBG()
    player.draw()
    
    if (!collisionFlag){
        if (colltest({rect1: player, rect2: git})){
            collisionFlag = true
            console.log('colliding')
            showConfirmation("Do you want to proceed?").then((result) => {
                if (result) {
                    console.log("User clicked Yes. Proceeding...")
                    window.location.href = "https://github.com/allanhanan"
                } else {
                    console.log("User clicked No. Canceling...")
                    collisionFlag = false
                    while(colltest({rect1: player, rect2: git})){
                        movables.forEach(movable => {movable.position.y += 0.05})
                    }

                }
            })
        }
    }

    if (!collisionFlag){
        if (colltest({rect1: player, rect2: ig})){
            collisionFlag = true
            console.log('colliding')
            showConfirmation("Do you want to proceed?").then((result) => {
                if (result) {
                    console.log("User clicked Yes. Proceeding...")
                    window.location.href = "https://www.instagram.com/allan_hanan/"
                } else {
                    console.log("User clicked No. Canceling...")
                    collisionFlag = false
                    while(colltest({rect1: player, rect2: ig})){
                        movables.forEach(movable => {movable.position.y += 0.05})
                    }

                }
            })
        }
    }

    player.moving = false
    if (keys.w.pressed && LastKey === 'w'){
        movables.forEach(movable => {movable.position.y += 1.5})
        player.image = player.sprites.up
        player.moving = true
    }
    else if (keys.a.pressed && LastKey === 'a'){
        movables.forEach(movable => {movable.position.x += 1.5})
        player.image = player.sprites.left
        player.moving = true

    }
    else if (keys.s.pressed && LastKey === 's'){
        movables.forEach(movable => {movable.position.y -= 1.5})
        player.image = player.sprites.down
        player.moving = true
    }
    else if (keys.d.pressed && LastKey === 'd'){
        movables.forEach(movable => {movable.position.x -= 1.5})
        player.image = player.sprites.right
        player.moving = true

    }


    if(!clicked){
        ctx.drawImage(loading, 0, 0, canvas.width, canvas.height)
        drawProgressBar(canvas.width/4, (canvas.height/2) - 50, canvas.width/4, 30, i)
        loadplayer.draw()
        loadplayer.moving = true
        if(loadplayer.position.x < canvas.width/2){
            loadplayer.position.x += i*2
        }
        else{
            loadplayer.position.x += i * 6
            loadplayer.position.y += j * 2
        }
        if(i<1){
            i += 0.0025
            j += 0.05
        }
    }

    if(clicked && !fell){
        if(loadplayer.position.y < canvas.height/2 - 20){
            loadplayer.position.y += 8  
            drawallBG()
            loadplayer.draw()
        }
        else{
            fell = true
        }
        
    }

}

animate()


let LastKey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key){
        case 'w':
            keys.w.pressed = true
            LastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            LastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            LastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            LastKey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key){
        case 'w':
            keys.w.pressed = false
            player.image = player.sprites.up
            break
        case 'a':
            keys.a.pressed = false
            player.image = player.sprites.left
            break
        case 's':
            keys.s.pressed = false
            player.image = player.sprites.down
            break
        case 'd':
            keys.d.pressed = false
            player.image = player.sprites.right
            break
    }
})


addEventListener('click', () => {
  if (!clicked && (i>1)) {
    audio.play()
    clicked = true
    console.log('clicked')
    loadplayer.position.x = canvas.width/2 - (plyr.width/4)/20 - 20
    loadplayer.position.y = 0
  }
})