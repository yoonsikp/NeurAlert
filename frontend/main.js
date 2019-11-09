function printMouseDown(event) {
    var textContent =
    "clientX: " + event.clientX +
    " - clientY: " + event.clientY;
}

function printMouseUp(event) {
    var textContent =
    "clientX: " + event.clientX +
    " - clientY: " + event.clientY;
    alert(textContent)
}

document.addEventListener("mousedown", printMouseDown)
document.addEventListener("mouseup", printMouseUp)