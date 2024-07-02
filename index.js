let dHand = document.getElementById("dealerHand")
let dCount = document.getElementById("dealerHandCount")
let mHand = document.getElementById("hand")
let mCount = document.getElementById("handCount")
let startBtn = document.getElementById("startBtn")
let hitBtn = document.getElementById("hitBtn")
let standBtn = document.getElementById("standBtn")
let resetBtn = document.getElementById("resetBtn")
let wl = document.getElementById("wlRatio")
let win = 0
let loss = 0
let dealerCards = []
let dealerSum = 0
let myCards = []
let mySum = 0

let cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10] //J Q K

function starts() {
    startBtn.classList.add("disabled")
    hitBtn.classList.remove("disabled")
    standBtn.classList.remove("disabled")

    hitBtn.onclick = hit
    standBtn.onclick = stand
    startBtn.onclick = null

    let mask = generateDealerHand()
    dHand.innerText = Array(mask).fill("-").join(" ")
    dCount.innerText = "?"
}

function hit() {
    if (mHand.innerText == "-") mHand.innerText = null

    let rand = Math.floor(Math.random() * cards.length)
    let card = cards[rand]
    myCards.push(card)
    mySum += card

    mHand.innerText = myCards.join(", ")
    mCount.innerText = mySum

    if (mySum > 21) {
        hitBtn.innerText = "BUST"
        hitBtn.classList.remove("btn-primary")
        hitBtn.classList.add("btn-danger")
        resetBtn.onclick = null
        standBtn.onclick = null
        hitBtn.onclick = bust

        standBtn.classList.add("disabled")
    }
}

function bust() {
    loss += 1
    updateWl()
    clear()
}

function updateWl() {
    wl.innerText = win + "/" + loss
}

function stand() {
    dHand.innerText = dealerCards.join(", ")
    dCount.innerText = dealerSum
    hitBtn.classList.add("disabled")
    resetBtn.classList.add("disabled")
    resetBtn.onclick = null
    hitBtn.onclick = null

    if(dealerSum > 21){
        youWin()
        return
    }
    
    if(dealerSum == mySum){
        youDraw()
        return
    }
    
    if (dealerSum < mySum) {
        youWin()
    } else {
        youLose()
    }
}

function youDraw(){
    standBtn.innerText = "WIN"
    standBtn.onclick = doWin
}

function youWin(){
    standBtn.innerText = "WIN"
    standBtn.onclick = doWin
}

function youLose(){
    standBtn.innerText = "LOSE"
    standBtn.classList.remove("btn-primary")
    standBtn.classList.add("btn-danger")
    standBtn.onclick = doLose
    resetBtn.onclick = null
    
}

function doDraw(){
    updateWl()
    clear()
}

function doWin() {
    win += 1
    updateWl()
    clear()
}

function doLose(){
    loss += 1
    updateWl()
    clear()
}

function generateDealerHand() {
    let count = 0

    while (true) {
        let rand = Math.floor(Math.random() * cards.length)
        let card = cards[rand]
        dealerSum = dealerSum + card
        count++

        dealerCards.push(card)
        if (dealerSum >= 17)
            break
    }
    return count
}

function reset() {
    clear()
}

function clear() {
    startBtn.classList.remove("disabled")
    hitBtn.className = "btn btn-success mx-1 my-1 disabled"
    hitBtn.innerText = "HIT"
    standBtn.className = "btn btn-success mx-1 my-1 disabled"
    standBtn.innerText = "STAND"

    startBtn.onclick = starts
    standBtn.onclick = null
    hitBtn.onclick = null
    
    resetBtn.onclick = reset
    resetBtn.classList.remove("disabled")

    dHand.innerText = "-"
    dCount.innerText = "-"
    mHand.innerText = "-"
    mCount.innerText = "-"

    dealerCards = []
    dealerSum = 0

    myCards = []
    mySum = 0
}