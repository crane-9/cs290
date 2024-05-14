
import { buildCalendar } from "./calendarLogic.js";
import { JournalEntry } from "./entry.js";

const MAIN = document.getElementById("main") as HTMLElement;

const LOG_LAYOUT_BTN = document.getElementById("display-log") as HTMLButtonElement;
const CAL_LAYOUT_BTN = document.getElementById("display-calendar") as HTMLButtonElement;

// Get entries once.
const ENTRIES = JournalEntry.loadAll();


// Functions

/**
 * Load the calendar layout.
 * Replaces the contents of `#main`.
 */
function loadCal(): void {
    // Toggle active
    LOG_LAYOUT_BTN.classList.remove("btn-active");
    CAL_LAYOUT_BTN.classList.add("btn-active");

    // Create calendar.
    const calendar = buildCalendar(ENTRIES);

    // Reset contents of `#main` with `#calendar`.
    MAIN.replaceChildren(calendar);
}

/**
 * Load the log layout.
 * Like `loadCal()`, replaces the contents of `#main`.
 */
function loadLog(): void {
    // Toggle active.
    CAL_LAYOUT_BTN.classList.remove("btn-active");
    LOG_LAYOUT_BTN.classList.add("btn-active");
    console.log("loading log layout");

    // Set up the new entry button.
    MAIN.innerHTML = `
<a href="/new-entry.html" class="invisible">
    <div class="log-entry-new">
        <div class="icon i-plus" id="create-new-entry" title="Create New Entry">
            <span class="sr-label">Create New Entry</span>
        </div>
    </div>
</a>`
    for (let entry of ENTRIES) {
        MAIN.appendChild(entry.createLogEntry());
    }
}

// listen to buttons.
LOG_LAYOUT_BTN.onclick = loadLog;
CAL_LAYOUT_BTN.onclick = loadCal;

// Autofill based on preferences...!
loadLog();
