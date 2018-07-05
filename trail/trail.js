const buildSparkle = (elementId) => {
    const div = document.createElement("DIV")
    const spark = document.createTextNode("🌟")
    div.appendChild(spark)
    div.style.position = "absolute"
    div.style.cursor = "default"
    div.style.display = "none"
    div.id = elementId
    return div
}

const SPARKLE_IDS = Array(5).fill().map((_, i) => "sparkle-" + i)

const sparkles = SPARKLE_IDS.map(el => buildSparkle(el))
sparkles.forEach(el => document.body.appendChild(el))

let [trailTimeouts, trailIndex] = [Array(sparkles.length), 0]

window.addEventListener("mousemove", event => {
    const sparkle = sparkles[trailIndex]
    sparkle.style.display = "block"
    sparkle.style.left = Math.round(event.pageX + 15)
    sparkle.style.top = Math.round(event.pageY + 15)
    trailTimeouts[trailIndex] = setTimeout(() => sparkle.style.display = "none", 500)
    trailIndex = (trailIndex + 1) % sparkles.length
})


