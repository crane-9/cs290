/**
 * This file is responsible for generation of "clouds" (the display of messages), along with managing their behavior and animations.
 */

import type { ServerMessage } from "@interfaces";


const MESSAGE_CONTAINER = document.getElementById("message-container") as HTMLElement;


/**
 * Shortcut method to create HTMLElements with the given tagname and class(es).
 * @param tagName Tag name to give the element.
 * @param classes A list of classes to give the element.
 * @returns An HTMLElement object with the given tag and classes.
 */
function createElement(tagName: string, ...classes: string[]): HTMLElement {
    const elem = document.createElement(tagName);
    if (classes.length) {
        elem.classList.add(...classes);
    }

    return elem;
}

function randomizePosition(e: HTMLElement): void {
    const parent = e.offsetParent as HTMLElement;
    
    
    e.style.top = Math.random() * (parent.clientHeight - e.clientHeight) + "px";
    e.style.left = Math.random() * (parent.clientWidth - e.clientWidth) + "px";
}


/**
 * Manages message cloud behavior. This includes: 
 *  - Timestamp counting.
 *  - Floating.
 *  - Fading in/out.
 */
class Cloud {
    element: HTMLDivElement;
    timestamp: HTMLSpanElement;

    onPage: boolean = false;

    xVelocity: number = 0.05;
    _xPos: number = 0;
    _yPos: number = 0;

    lifetime: number = 2000;

    
    /**
     * Creates a new cloud message element.
     * @param message Message data to populate the cloud.
     * @returns Cloud element after it has been appended to the message container.
     */
    constructor(message: ServerMessage) {
        // Create base element with randomized shape.
        this.element = createElement('div', 'cloud', 'c' + Math.ceil(Math.random() * 9)) as HTMLDivElement;
        
        // Create -- only the timestamp is needed for future modification.
        const username = createElement('span', 'cloud-username');
        this.timestamp = createElement('span', 'cloud-timestamp');
        const messageText = createElement('span', 'cloud-message');
    
        // Define and populate.
        username.innerText = message.username;
        username.style.color = message.color;

        this.timestamp.innerText = message.timestamp;
    
        messageText.innerHTML = message.message;
    
        // Append all children.
        this.element.appendChild(username);
        this.element.appendChild(this.timestamp);
        this.element.appendChild(messageText);

        // Add possible image background
        if (message.imageData !== null) this.element.style.backgroundImage = `url(${message.imageData})`;
    }

    // Simple getter for current x-position in pixels.
    public get xPos() : number {
        return this._xPos;
    }

    /**
     * Set x-position in instance data and on page.
     */
    public set xPos(v: number) {
        this._xPos = v;
        this.element.style.left = v + "px";
    }

    // Simple getter for current y-position in pixels.
    public get yPos() : number {
        return this._yPos
    }
    
    /**
     * Set y-position in instance data and on page.
     */
    public set yPos(v : number) {
        this._yPos = v;
        this.element.style.top = v + "px";
    }

    /**
     * Appends to the page's message container, rendering it visible.
     * @throws Throws error if already on page. MAY CHANGE....
     */
    render(): void {
        if (this.onPage) throw {error: true, message: "Cloud already on page."};

        // Randomize starting position. TODO: find some constants for the sizing, esp fi they are also in the css.
        this.yPos = Math.random() * (document.body.clientHeight - 200);
        this.xPos = Math.random() * (document.body.clientWidth - 300);

        // Put it on the page.
        MESSAGE_CONTAINER.appendChild(this.element);
        this.onPage = true;

        // Start animation.
        this.animationLoop();
    }

    animationLoop(): void {
        this.xPos += this.xVelocity;
        this.lifetime --;
        this.xVelocity -= 0.00001;

        // Die or request animation.
        if (this.lifetime < 0) this.die();
        else requestAnimationFrame(this.animationLoop.bind(this));
    }

    die(): void {
        this.element.remove();
    }
}

export { Cloud };