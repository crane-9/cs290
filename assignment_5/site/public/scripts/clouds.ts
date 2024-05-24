/**
 * This file responsible for generation of clouds.
 */

import type { MessageEvent } from "@interfaces";

const MESSAGE_CONTAINER = document.getElementById("message-container") as HTMLElement;

/**
 * Shortcut method to create HTMLElements with the given tagname and class(es);
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

    
    /**
     * Creates a new cloud message element.
     * @param message Message data to populate the cloud.
     * @returns Cloud element after it has been appended to the message container.
     */
    constructor(message: MessageEvent) {
        this.element = createElement('div', 'cloud', 'c' + Math.ceil(Math.random() * 9)) as HTMLDivElement;
        
        const username = createElement('span', 'cloud-username');
        this.timestamp = createElement('span', 'cloud-timestamp');
        const messageText = createElement('span', 'cloud-message');
    
        username.innerText = message.username;
        username.style.color = message.color;
    
        // TODO change this bit + set up the seocnd updating.
        this.timestamp.innerText = new Date().toTimeString();
    
        messageText.innerHTML = message.message;
    
        this.element.appendChild(username);
        this.element.appendChild(this.timestamp);
        this.element.appendChild(messageText);
    }

    /**
     * Appends to the page's message container, rendering it visible.
     * @throws Throws error if already on page. MAY CHANGE....
     */
    render(): void {
        if (this.onPage) throw {error: true, message: "Cloud already on page."};

        // Put it on the page.
        MESSAGE_CONTAINER.appendChild(this.element);
        this.onPage = true;
    }
}

export { Cloud };