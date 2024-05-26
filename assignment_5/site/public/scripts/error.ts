/**
 * Script holds pieces for relaying an error to the user.
 */
import type { ClientError } from "@interfaces";

import { createElement } from "./utils.js";


const ERROR_CONTAINER = document.getElementById("error-container") as HTMLDivElement;


/**
 * Displays an error message at the bottom of the page.
 * @param err The error's contents to render.
 */
function showError(err: ClientError): void {
    const error = createElement('div', 'error-message');
    error.innerText = err.message;
    
    ERROR_CONTAINER.appendChild(error);

    // Remove after 30 seconds.
    window.setTimeout(() => error.remove(), 5_000);
}

/**
 * Highlights the given input element until its value changes, OR the given condition is met.
 * @param input The input box to highlight.
 * @param error True if error.
 * @param condition A callback function that takes a single string argument, and returns a boolean. This function should return `true` when satisfied, indicating that the input's highlight can now go away.
 */
function highlightInput(input: HTMLInputElement, error?: boolean, condition?: (s: string) => boolean): void {
    const highlightClass = error? 'input-error' : 'input-attention';
    input.classList.add(highlightClass);

    // Name callback for sake of recursion.
    const callback = () => {
        // If condition exists and is unmet, exit.
        if (condition !== undefined && !condition(input.value)) return;
        
        // Else, remove highlight and this event listener.
        input.classList.remove(highlightClass);
        input.removeEventListener('input', callback);
    }

    // Add listener.
    input.addEventListener('input', callback);
}


export {
    highlightInput,
    showError,
    
};
