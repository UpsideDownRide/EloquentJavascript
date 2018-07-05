const [BALLOON_ID, INC, DEC, EXPLOSION_SIZE] = ["cbal", 2, -2, 100]

const getStyleProperty = (elementId, prop) => window.getComputedStyle(document.getElementById(elementId)).getPropertyValue(prop)
const fontSizeToNumeric = (str) => Number(str.replace(/\D/g, ""))
const getFontSize = (elementId) => fontSizeToNumeric(getStyleProperty(elementId, "font-size")) 
const changeFontSize = (elementId, delta) => {
    const currentFontSize = getFontSize(elementId)
    document.getElementById(elementId).style.fontSize = currentFontSize + delta
}

const arrowUpHandler = event => {
    if (event.key == "ArrowUp") {
        event.preventDefault()
        changeFontSize(BALLOON_ID, INC)
        if (getFontSize(BALLOON_ID) >= EXPLOSION_SIZE) {
            explodeBalloon(BALLOON_ID) 
        }
    }
}
const arrowDownHandler = event => {
    if (event.key == "ArrowDown") {
        event.preventDefault()
        changeFontSize(BALLOON_ID, DEC)
    }
}

const explodeBalloon = (elementId) => {
    document.getElementById(elementId).textContent = "💥"
    window.removeEventListener("keydown", arrowUpHandler)
    window.removeEventListener("keydown", arrowDownHandler)
}

window.addEventListener("keydown", arrowUpHandler)
window.addEventListener("keydown", arrowDownHandler)


