const createButton = (name) => {
    const button = document.createElement("BUTTON")
    button.appendChild(document.createTextNode(name))
    button.onclick = tabButtonOnClick(name, button)
    button.setAttribute("button-tabname", name)
    return button
}

const tabButtonOnClick = (name, button) => () => {
    displayTab(name, button)
    styleTabButtons(name, button)
}

const styleTabButtons = (name, button) => {
    console.log(name, button)
    Array(...button.parentNode.childNodes)
        .filter(hasAttribute("button-tabname"))
        .forEach(btn => btn.getAttribute("button-tabname") === name ? btn.style.background = "green" : btn.style.background = "red")
}

const displayTab = (name, button) => {
    Array(...button.parentNode.childNodes)
        .filter(hasAttribute("data-tabname"))
        .forEach(div => div.getAttribute("data-tabname") === name ? div.style.display = "block" : div.style.display = "none")
}

const hasAttribute = (name) => (node) => node.hasAttribute ? node.hasAttribute(name) : false
const hasTag = (name) => (node) => node.tagName === name

const createButtons = (node) => {
    return Array(...node.childNodes)
        .filter(hasAttribute("data-tabname"))
        .map(el => createButton(el.getAttribute("data-tabname")));
}

const setInitialVisibility = (node) => {
    return Array(...node.childNodes).filter(hasTag("DIV"))
        .forEach((node, i) => i === 0 ? node.style.display = "block" : node.style.display = "none");
}

const asTabs = (node) => {
    const buttons = createButtons(node)
    buttons.reverse().forEach(button => node.insertBefore(button, node.firstChild))
    setInitialVisibility(node);
}

