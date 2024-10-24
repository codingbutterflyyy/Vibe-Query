const path = localStorage.getItem("front-animation")

const front = new Worker("code/frontScreen.js")
front.postMessage("start")
front.onmessage = (e) =>
{
    // console.log(e.data + " to anim")
}

let it = 0;

const circle = document.createElement("div")
circle.id = "circle"
circle.classList.add("invisible")

const div = document.createElement("div")
div.id = "iconHolder"
div.classList.add("iconHolder")

const music = document.createElement("img")
music.src = path + "music.png"
music.id = "music"

const lens = document.createElement("img")
lens.src = path + "lens.png"
lens.id = "lens"
lens.classList.add("lensZoom")

const drop = document.createElement("div")
drop.id = "drop"
drop.classList.add("invisible")

const back = document.createElement("div")
back.id = "back-lens"
const border = document.createElement("div")
border.id = "border"
border.classList.add("invisible")
const inner = document.createElement("div")
inner.id = "inner-lens"

const textDiv = document.createElement("div")
textDiv.id = "text-display"
textDiv.classList.add("invisible")
const text = "Vibe Query"
let i = text.length - 1
while(i >= 0)
{
    let char = text.at(i)
    let charDiv = document.createElement("div")
    charDiv.classList.add("char")
    charDiv.innerText = char
    textDiv.appendChild(charDiv)
    setTimeout(() => i--, 200)
}

lens.onanimationstart = () =>
{
    setTimeout(() =>
    {
        music.classList.add("noteZoomIn")
    },1000)
}

music.onanimationend = () =>
{
    drop.classList.add("dropFalling")
    drop.classList.remove("invisible")
}

drop.onanimationend = () =>
{
    back.classList.add("fill")
    border.classList.remove("invisible")
    drop.remove()
}

back.onanimationend = () =>
{
    circle.classList.add("circleLoop")
    circle.classList.remove("invisible")
    inner.style.backgroundColor = "#F5F2B8"
}

circle.onanimationiteration = () =>
{
    ++it
    if(it >= 3)
    {
        circle.classList.remove("circleLoop")
        circle.classList.add("circleOut")
        div.classList.add("lensOut")
    }
}

div.onanimationend = () =>
{
    if(div.classList.contains("lensOut"))
    {
        div.classList.remove("lensOut")
        div.classList.add("lensBack")
        music.remove()
    }
    else
    {
        textDiv.classList.remove("invisible")
    }
}

back.appendChild(border)
back.appendChild(inner)

div.appendChild(music)
div.appendChild(lens)
div.appendChild(drop)
div.appendChild(back)

document.body.appendChild(drop)
document.body.appendChild(div)
document.body.appendChild(circle)