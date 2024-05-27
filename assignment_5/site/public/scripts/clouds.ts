/**
 * This file is responsible for generation of "clouds" (the display of messages), along with managing their behavior and animations.
 */

import type { ServerMessage } from "@interfaces";

import { createElement } from "./utils.js";

// Template elements.
const MESSAGE_CONTAINER = document.getElementById("message-container") as HTMLElement;


// Config variables
const CLOUD_MAX_OP = 0.95;

/**
 * Randomizes the position of the given element within its parent element.
 * @param elem The element to randomize the position of.
 */
function randomizePosition(elem: HTMLElement): void {
    const parent = elem.offsetParent as HTMLElement;
    
    elem.style.top = Math.random() * (parent.clientHeight - elem.clientHeight) + "px";
    elem.style.left = Math.random() * (parent.clientWidth - elem.clientWidth) + "px";
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

    xVelocity: number = 0.08;
    _xPos: number = 0;
    _yPos: number = 0;

    lifetime: number = 2000;
    secondsPassed: number = 0;
    opacity: number = 0;

    
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
        const timestamp = createElement('span', 'cloud-timestamp');
        const messageText = createElement('span', 'cloud-message');
    
        // Define and populate.
        username.innerText = message.username;
        username.style.color = message.color;

        timestamp.innerText = "now";
    
        messageText.innerHTML = message.message;
    
        // Append all children.
        this.element.appendChild(username);
        this.timestamp = this.element.appendChild(timestamp);
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
        this.xPos = Math.random() * (document.body.clientWidth - 300) / 1.6;  // Dividing this by 1.6 to restrain to the first 1.6 halves of the screen.

        // Put it on the page.
        MESSAGE_CONTAINER.appendChild(this.element);
        this.onPage = true;

        // Start animation.
        this.fadeLoop(1);
        this.animationLoop();
        this.countTime();
    }


    /**
     * Runs a loop that displays how long ago the message was sent.
     */
    countTime(): void {
        if (this.secondsPassed > 0) this.timestamp.innerText = this.secondsPassed + 's ago';
        this.secondsPassed ++;

        if (this.secondsPassed == 10) this.fadeLoop(-1);

        setTimeout(this.countTime.bind(this), 1_000);
    }

    /**
     * Cloud opacity fading loop.
     * @param direction Fade direction, `1` or `-1` only. Positive fades in (adding to the opacity), negative fades out (subtracting from the opacity).
     */
    fadeLoop(direction: -1 | 1): void {
        this.opacity += 0.005 * this.secondsPassed * direction;  // Fades out a little faster than fades in.
        this.element.style.opacity = '' + this.opacity;

        // If less than max opacity, continue loop.
        if (this.opacity < CLOUD_MAX_OP) requestAnimationFrame(this.fadeLoop.bind(this, direction));
    }

    /**
     * Cloud's movement animation loop.
     */
    animationLoop(): void {
        this.xPos += this.xVelocity;
        this.lifetime --;
        this.xVelocity -= 0.00001;  // Apple decelleration.

        // Die or request animation.
        if (this.lifetime < 0) this.die();
        else requestAnimationFrame(this.animationLoop.bind(this));
    }

    die(): void {
        // this.fadeLoop(-1);
        this.element.remove();
    }
}

export { Cloud };