/**
 * Script for admin pages. Controls behavior of the delete/edit buttons, and responsiveness of the Entries table.
 */
import { Counter } from "./counter.js";


// Grab buttons
const editBtn = document.getElementById("edit") as HTMLInputElement;
const deleteBtn = document.getElementById("delete") as HTMLInputElement;

// Holds selected for easy submission via builtin form behavior.
const selectedInput = document.getElementById("rows-selected") as HTMLInputElement;

// Grab all selections.
const selectors = document.querySelectorAll("input[name^=select-][type=checkbox]");

// Set that will hold the selected.
let selectedPages: Set<HTMLInputElement> = new Set();

// Create counter instance.
const counter = new Counter();


// SHARED / HELPER functions

/** Updates the value of the hidden input holding the IDs/Paths of the selected. */
function updateSelected(): void {
    selectedInput.value = Array.from(selectedPages, (v: HTMLInputElement, k: number) => {
        return v.id.split(/^select-/)[1];
    }).join(",");
}


/** Sets buttons' status based on counter status. */
function setButtonStatus(): void {
    editBtn.disabled = deleteBtn.disabled = counter.getCount() < 1;
}


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
        updateSelected();
    });
}


// SETUP

// Grab all selectors and set each up.
for (let s of selectors)  setupSelection(s as HTMLInputElement);
counter.display();  // Then display.
setButtonStatus();
updateSelected();
