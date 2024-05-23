/**
 * This handles the dragging of floating menus. 
 * As a note: this is code that I have used in the past. For this project, I have made many changes and realized I have some issues in what I've written in the past!
 */

const DRAG_CLASS_NAME = "floating-menu";


// Init global vars.
var topZ = 1;  // Init top Z value.
var offsetX: number, offsetY: number;
var leftLim: number, topLim: number;
var current: HTMLElement | undefined = undefined;


// For each element of the given class, set their reactions to mouse events.
document.querySelectorAll("." + DRAG_CLASS_NAME).forEach((e) => {    
    const handle = e.firstElementChild as HTMLElement;

    // Event
    handle.addEventListener('mousedown',(ev: MouseEvent) => {
        // Ignore non-left clicks.
        if (ev.button > 1) return;
        
        // Set as current element.
        current = e as HTMLElement;

        // Put element on top
        if (current.style.zIndex === "" || topZ - 1 != Number(current.style.zIndex)) {
            current.style.zIndex = "" + topZ;
            topZ ++;
        }

        // Calculate offset.
        offsetX = current.offsetLeft - ev.clientX;
        offsetY = current.offsetTop - ev.clientY;
        
        // Set limits
        leftLim = (current.offsetParent as HTMLElement).clientWidth - current.clientWidth;
        topLim = (current.offsetParent as HTMLElement).clientHeight - current.clientHeight;

        // you are now grabbing.
        handle.style.cursor = "grabbing";
    });

    // End of the drag.
    handle.addEventListener('mouseup', () => {
        current = undefined;
        handle.style.removeProperty("cursor");
    });
});


// Actual movement:
document.addEventListener('mousemove', (ev: MouseEvent) => {
    // Ignore like 90% of the time!
    if (current === undefined) return;

    // Calculate new position.
    let leftVal = ev.pageX + offsetX - scrollX;
    let topVal = ev.pageY + offsetY - scrollY;

    // Enforce position limits.
    if (leftVal < 0) leftVal = 0;
    if (topVal < 0) topVal = 0;
    
    if (leftVal > leftLim) leftVal = leftLim;
    if (topVal > topLim) topVal = topLim;

    // Set new positions.
    current.style.left = leftVal + "px";
    current.style.top = topVal + "px";

    // Unset positional properties that won't be overridden by the previous. Do this onmove so as to avoid unnecessary/confusing movement.
    if (current.style.bottom !== "unset" || current.style.right !== "unset") {
        current.style.bottom = "unset";
        current.style.right = "unset";
    }
});
