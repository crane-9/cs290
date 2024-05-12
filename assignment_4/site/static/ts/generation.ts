// general generation 


/**
 * Generates an icon button element.
 * @param labelText Text for the button's label.
 * @param btnClasses Classes to give the button. There should be an "i-*" class.
 * @returns A button element prepared with a label.
 */
function createButton(labelText: string, ...btnClasses: string[]): HTMLButtonElement {
    // Create button
    const btn = document.createElement("button");
    btn.title = labelText;
    btn.classList.add("icon", ...btnClasses);

    // Create label
    const label = document.createElement("span");
    label.classList.add("sr-label");
    label.innerText = labelText;

    btn.appendChild(label);

    return btn;
}

export { createButton };
