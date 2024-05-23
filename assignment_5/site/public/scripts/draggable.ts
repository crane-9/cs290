
// begin config variables:
const DRAG_CLASS_NAME = "floating-menu"; // CANNOT include spaces.
const ENFORCE_LIMITS = true; // keeps the draggables from going offpage

// end config variable.

var topZ = 1;

var offsetX: number, offsetY: number;
var leftLim: number, topLim: number;
var current: HTMLElement | undefined = undefined;


/** recursively disables drag for the given element. */
function disableDrag(e: HTMLElement, parent?: HTMLElement): void {
    if (e.tagName == "IMG" || e.tagName == "A") {
        e.setAttribute("draggable", "false");
    } 
    if (e.tagName === "A") {
        // dbl click navigation
        (e as HTMLElement).ondblclick = function (ev: MouseEvent) {
            window.location.href = (e as HTMLAnchorElement).href;
        };
        (e as HTMLElement).onclick = function (ev: MouseEvent) {
            ev.preventDefault();
        }
    }
    
    // WOOO recursion
    for (let child of Array.from(e.children)) {
        disableDrag(child as HTMLElement, parent === undefined? e : parent);
    }
}


// events: for each element of the given class, set their reactions to mouse events.
document.querySelectorAll("." + DRAG_CLASS_NAME).forEach((e) => {    
    const handle = e.firstElementChild as HTMLElement;
    disableDrag(handle);

    // configure events.
    handle.onclick = (ev: MouseEvent) => {
        ev.preventDefault();

        // grab element.
        if ((e as HTMLElement).style.zIndex === "" || topZ - 1 != Number((e as HTMLElement).style.zIndex)) {
            (e as HTMLElement).style.zIndex = "" + topZ;
            topZ ++;
        }
    }; 

    handle.onmousedown = (ev: MouseEvent) => {
        // only pay attention to left clicks.
        if (ev.button > 1) {
            console.log(ev.button);
            return;
        }

        // get element and offset
        current = e as HTMLElement;
        offsetX = current.offsetLeft - ev.clientX;
        offsetY = current.offsetTop - ev.clientY;
        
        // set limits
        leftLim = (current.offsetParent as HTMLElement).clientWidth - current.clientWidth;
        topLim = (current.offsetParent as HTMLElement).clientHeight - current.clientHeight;

        // you are now grabbing.
        handle.style.cursor = "grabbing";
    };

    handle.onmouseup = () => {
        current = undefined;
        handle.style.removeProperty("cursor");
    };
});


// this is the important part:
document.onmousemove = (ev: MouseEvent) => {
    if (current === undefined) return;

    let leftVal = ev.pageX + offsetX - scrollX;
    let topVal = ev.pageY + offsetY - scrollY;

    if (ENFORCE_LIMITS) {
        if (leftVal < 0) leftVal = 0;
        if (topVal < 0) topVal = 0;
        
        if (leftVal > leftLim) leftVal = leftLim;
        if (topVal > topLim) topVal = topLim;
    }

    current.style.left = leftVal + "px";
    current.style.top = topVal + "px";

    // for safety
    if (current.style.bottom !== "unset" || current.style.right !== "unset") {
        current.style.bottom = "unset";
        current.style.right = "unset";
    }
}
