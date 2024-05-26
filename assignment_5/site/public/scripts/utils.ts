/**
 * Misc utilities for client-side application.
 */

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


/**
 * Generates a random color.
 * @returns Returns a random hex color as a string.
 */
function randomColor(): string {
    let color = "#";

    while (color.length != 7) {
        color += "0123456789ABCDEF"[Math.floor(Math.random() * 16)]
    }

    return color;
}


function checkLength(value: string, min?: number, max?: number): boolean {
    // Check against defined parameters and return false if violated.
    if (min !== undefined && value.length < min) throw {error: true, message: "too short"};
    if (max !== undefined && value.length > max) throw {error: true, message: "too long"};

    return true;
}

interface ValidateOptions {
    minLength?: number;
    maxLength?: number;
    trimWhitespace?: boolean;
    label?: string;  // What to call the field in an error message.    
}


/**
 * Validates the length of a given string with the given options. Raises error if invalid.
 * @param value String to verify the length of
 * @param param1 Options for string length. `minLength`, `maxLength`, and `trimWhitespace` may be defined.
 */
function validateLength(value: string, { minLength, maxLength, trimWhitespace, label }: ValidateOptions): string {
    // Default label:
    label = label === undefined? 'input' : label;

    // Trim whitespace by default.
    if (trimWhitespace != false) value = value.trim();

    // Throw error if necessary.
    try {
        checkLength(value, minLength, maxLength);
    } catch (err: any) {
        throw {...err, message: `${label} is ${err.message}.`};
    }
    
    // Else return.
    return value;
}


/**
 * Adds an event listener that executes the 'click' action of the given button on keydown 'Enter'
 * @param input A text input element.
 * @param button The button to click on keydown of "Enter".
 */
function addEnterAction(input: HTMLInputElement, button: HTMLButtonElement): void {
    input.addEventListener('keydown', (ev: KeyboardEvent) => {
        if (ev.key !== "Enter") return;
        
        ev.preventDefault();
        button.click();
    });
}


export {
    createElement,
    randomColor,
    validateLength,
    addEnterAction
}
