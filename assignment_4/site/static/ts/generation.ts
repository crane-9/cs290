// general generation 


/**
 * Shortcut function to quickly and easily create an element, cutting down on repetition.
 * @param tagName Tag name of the element.
 * @param classes Classes for the element.
 * @returns An HTML element of the given type with the given classes.
 */
function createElement(tagName: string, ...classes: string[]): HTMLElement {
    const elem = document.createElement(tagName);
    if (classes.length) elem.classList.add(...classes);

    return elem;
}

/**
 * Generates an icon button element.
 * @param labelText Text for the button's label.
 * @param btnClasses Classes to give the button. There should be an "i-*" class.
 * @returns A button element prepared with a label.
 */
function createButton(labelText: string, ...btnClasses: string[]): HTMLButtonElement {
    // Create button
    const btn = createElement("button", "icon", ...btnClasses) as HTMLButtonElement;
    btn.title = labelText;

    // Create label
    const label = createElement("span", "sr-label");
    label.innerText = labelText;

    btn.appendChild(label);

    return btn;
}

export { createButton, createElement };
