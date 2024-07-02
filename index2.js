const dealer = {
    hand: document.getElementById("dealerHand"),
    sum: document.getElementById("dealerHandCount")
}
const me = {
    hand: document.getElementById("hand"),
    sum: document.getElementById("handCount")
}
const btn = {
    start: document.getElementById("startBtn"),
    hit: document.getElementById("hitBtn"),
    stand: document.getElementById("standBtn")
}
const wl = document.getElementById("wlRatio")

let win = 0, loss = 0, dealerCards = [], dealerSum = 0, myCards = [], mySum = 0
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10] // J Q K

const disableBtn = btn => {
    btn.classList.add("disabled")
    btn.onclick = null
}
const enableBtn = btn => btn.classList.remove("disabled")
const updateText = (elem, text) => elem.innerText = text
const resetBtn = (btn, text, onClick) => {
    btn.innerText = text
    btn.className = "btn btn-success mx-1 my-1 disabled"
    btn.onclick = onClick
}
const updateWl = () => updateText(wl, `${win}/${loss}`)


function startGame() {
    disableBtn(btn.start)
    enableBtn(btn.hit)
    enableBtn(btn.stand)

    btn.hit.onclick = hit
    btn.stand.onclick = stand

    updateText(dealer.hand, Array(generateDealerHand()).fill("-").join(" "))
    updateText(dealer.sum, "?")
}

function hit() {
    if (me.hand.innerText === "-") updateText(me.hand, null)

    let card = cards[Math.floor(Math.random() * cards.length)]

    myCards.push(card)
    mySum += card

    updateText(me.hand, myCards.join(", "))
    updateText(me.sum, mySum)

    if (mySum > 21) {
        disableBtn(btn.stand)
        endGame(btn.hit, "BUST", "lose", bust)
    }
    else if (mySum === 21) endGame(btn.hit, "JACKPOT", "win", doWin)
}

function endGame(btn, btnText, result, onClick) {
    updateText(btn, btnText)
    applyBorderEffect(result)

    if (result === "lose") btn.classList.replace("btn-success", "btn-danger")

    btn.onclick = onClick
}

function bust() { loss++; finalizeGame() }
function doWin() { win++; finalizeGame() }
function doLose() { loss++; finalizeGame() }
function youWin(btn) { endGame(btn, "WIN", "win", doWin) }
function youLose(btn) { endGame(btn, "LOSE", "lose", doLose) }

function finalizeGame() {
    updateWl()
    resetGame()
}

function stand() {
    updateText(dealer.hand, dealerCards.join(", "))
    updateText(dealer.sum, dealerSum)

    disableBtn(btn.hit)

    if (dealerSum > 21 || dealerSum < mySum) youWin(btn.stand)
    else if (dealerSum === mySum) youWin(btn.stand)
    else youLose(btn.stand)
}

function generateDealerHand() {
    while (dealerSum < 17) {
        let card = cards[Math.floor(Math.random() * cards.length)]
        dealerCards.push(card)
        dealerSum += card
    }
    return dealerCards.length
}

function resetGame() {
    enableBtn(btn.start)
    resetBtn(btn.hit, "HIT", null)
    resetBtn(btn.stand, "STAND", null)

    btn.start.onclick = startGame

    updateText(dealer.hand, "-")
    updateText(dealer.sum, "-")
    updateText(me.hand, "-")
    updateText(me.sum, "-")
    dealerCards = [], dealerSum = 0
    myCards = [], mySum = 0
}

function applyBorderEffect(result) {
    const dealerContainer = document.getElementById("cardContainer1")
    const playerContainer = document.getElementById("cardContainer2")
    const borderClass = `border-${result}`

    dealerContainer.classList.add(borderClass);
    playerContainer.classList.add(borderClass);
    setTimeout(() => {
        dealerContainer.classList.remove(borderClass);
        playerContainer.classList.remove(borderClass);
    }, 1000);
}

