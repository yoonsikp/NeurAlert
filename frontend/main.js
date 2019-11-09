var threeSecondsClickData = []

function printMouseDown(event) {
    // let textContent =
    // "clientX: " + event.clientX +
    // " - clientY: " + event.clientY;

    let downTime = Date.now()
    let dictDown = {"time": downTime, "clickType": "down"}
    threeSecondsClickData.push(dictDown)
    
}

function printMouseUp(event) {
    // let textContent =
    // "clientX: " + event.clientX +
    // " - clientY: " + event.clientY;

    let upTime = Date.now()
    let dictUp = {"time": upTime, "clickType": "up"}
    threeSecondsClickData.push(dictUp)
    
}

function sendThreeSeconds() {
    console.log(threeSecondsClickData)
    

    const request = new Request("http://localhost:5000/data", {
        method: 'post',
        body: JSON.stringify(threeSecondsClickData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    fetch(request).then((res)=> {
        threeSecondsClickData = []
    }

    ).catch((error) => { console.log("an error occurred", error)

    threeSecondsClickData = []

})


    


}

document.addEventListener("mousedown", printMouseDown)
document.addEventListener("mouseup", printMouseUp)
window.setInterval(sendThreeSeconds, 3000);
//myLet = setTimeout(sendThreeSeconds, 3000);