let dHand = document.getElementById("dealerHand")
let dCount = document.getElementById("dealerHandCount")
let mHand = document.getElementById("hand")
let mCount = document.getElementById("handCount")
let startBtn = document.getElementById("startBtn")
let hitBtn = document.getElementById("hitBtn")
let standBtn = document.getElementById("standBtn")
let wl = document.getElementById("wlRatio")
let win = 0
let loss = 0
let dealerCards = []
let dealerSum = 0

let cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10] //J Q K

function starts() {
    startBtn.classList.toggle("disabled")
    hitBtn.classList.toggle("disabled")
    standBtn.classList.toggle("disabled")
    startBtn.onclick = null
    
    let mask = generateDealerHand()
    dHand.innerText = Array(mask).fill("-").join(" ")
    dCount.innerText = "?"
}

function hit(){
    
}

function stand(){
}

function generateDealerHand(){
    let count = 0

    while (true) {
        let rand = Math.floor(Math.random() * cards.length)
        let card = cards[rand]
        dealerSum = dealerSum + card
        count++
        
        dealerCards.push(card)
        if(dealerSum >= 17)
            break
    }
    return count
}


function reset() {
    startBtn.classList.toggle("disabled")
    hitBtn.classList.toggle("disabled")
    standBtn.classList.toggle("disabled")
    startBtn.onclick = starts

    dHand.innerText = "-"
    dCount.innerText = "-"
    mHand.innerText = "-"
    mCount.innerText = "-"
    
    dealerCards = []
    dealerSum = 0
}