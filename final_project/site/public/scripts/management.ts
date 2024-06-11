/**
 * Script for admin pages. Controls behavior of the delete/edit buttons, and responsiveness of the Entries table.
 */
import { Counter } from "./counter.js";


// Grab buttons
const editBtn = document.getElementById("edit") as HTMLButtonElement;
const deleteBtn = document.getElementById("delete") as HTMLButtonElement;

// Grab all selections
const selectors = document.querySelectorAll("input[name^=select-][type=checkbox]");

// Set that will hold the selected.
let selectedPages: Set<HTMLInputElement> = new Set();

// Create counter instance.
const counter = new Counter();


// SELECTIONS

/**
 * Sets up each checkbox to trigger the selection counter.
 * Also, counts all currently open boxes (in case of refresh).
 * @param selector The HTMLInputElement that is being set up. Should be a checkbox.
 */
function setupSelection(selector: HTMLInputElement): void {
    // This clause is here in the case of page refreshes.
    if (selector.checked) {
        counter.increase(false);
        selectedPages.add(selector);
    }
    
    // Responds to changes, still need to check the status.
    selector.addEventListener("change", () => {
        if (selector.checked) {
            counter.increase();
            selectedPages.add(selector);
        } else {
            counter.decrease();
            selectedPages.delete(selector);
        }
        setButtonStatus();
    });
}

// EDIT BUTTON

/**
 * Directs to a page where the user can edit the *first* selected entry. Unfortunately not multiple at once....?
 */
function createEdit(): void {

}


// DELETE BUTTON

/**
 * Creates a request to delete ALL selected entries.
 */
function requestDelete(): void {

}


// SHARED

/** Sets buttons' status based on counter status. */
function setButtonStatus(): void {
     editBtn.disabled = deleteBtn.disabled = counter.getCount() < 1;
}

// SETUP

// Grab all selectors and set each up.
for (let s of selectors)  setupSelection(s as HTMLInputElement);
counter.display();  // Then display.
setButtonStatus();
