var clickData = [] //contains one down and one up
var posData = [] //contains all positions before click 
var mousePos;

function printMouseDown(event) {
    // let textContent =
    // "clientX: " + event.clientX +
    // " - clientY: " + event.clientY;

    let downTime = Date.now()
    let dictDown = {"time": downTime, "clickType": "down"}
    clickData.push(dictDown)
    
}

function printMouseUp(event) {
    // let textContent =
    // "clientX: " + event.clientX +
    // " - clientY: " + event.clientY;

    let upTime = Date.now()
    let dictUp = {"time": upTime, "clickType": "up"}
    clickData.push(dictUp)

    const request = new Request("http://localhost:5000/data", {
        method: 'post',
        body: JSON.stringify({"clicks": clickData, "pos": posData}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    fetch(request).then((res)=> {
        clickData = []
        posData = []
    }

    ).catch((error) => { console.log("an error occurred", error)

    clickData = []
    posData = []
        
    })
}
function handleMouseMove(event) {
    var eventDoc, doc, body;

    event = event || window.event; // IE-ism

    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
          (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
          (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
          (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
          (doc && doc.clientTop  || body && body.clientTop  || 0 );
    }
    mousePos = {
        "x": event.pageX,
        "y": event.pageY
    };
    // Use event.pageX / event.pageY here
}

function addMousePosition() {
    let pos = mousePos
    if(!pos){
        //do nothing
    }
    else{
        posData.push({"x": mousePos.x, "y": mousePos.y, "time": Date.now()})
    }
    
}

window.setInterval(addMousePosition, 50)

document.addEventListener("mousedown", printMouseDown)
document.addEventListener("mouseup", printMouseUp)
document.addEventListener("mousemove", handleMouseMove)
