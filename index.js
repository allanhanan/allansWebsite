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
        const messageElement = document.getElementById("confirmationMessage")
        const confirmButton = document.getElementById("confirmButton")
        const cancelButton = document.getElementById("cancelButton")

        messageElement.textContent = message

        modal.style.display = "block"

        confirmButton.onclick = function() {
            modal.style.display = "none"
            resolve(true)
        };

        cancelButton.onclick = function() {
            modal.style.display = "none"
            resolve(false)
        }
    })
}

function animate(){

    window.requestAnimationFrame(animate)
    bg.draw()
    git.draw()
    player.draw()
    ig.draw()

    if (colltest({rect1: player, rect2: git})){
        console.log('colliding')
        showConfirmation("Do you want to proceed?").then((result) => {
            if (result) {
                console.log("User clicked Yes. Proceeding...")
                window.location.href = "https://github.com/allanhanan"
            } else {
                console.log("User clicked No. Canceling...")
                while(colltest({rect1: player, rect2: git})){
                      movables.forEach(movable => {movable.position.y += 0.05})
                }

            }
        })
    }

    if (colltest({rect1: player, rect2: ig})){
        console.log('colliding')
        showConfirmation("Do you want to proceed?").then((result) => {
            if (result) {
                console.log("User clicked Yes. Proceeding...")
                window.location.href = "https://www.instagram.com/allan_hanan/"
            } else {
                console.log("User clicked No. Canceling...")
                while(colltest({rect1: player, rect2: git})){
                      movables.forEach(movable => {movable.position.y += 0.05})
                }

            }
        })
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
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})


addEventListener('click', () => {
  if (!clicked) {
    audio.play()
    clicked = true
    console.log('clicked')
  }
})