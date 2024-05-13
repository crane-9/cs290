
import { JournalEntry } from "./entry.js";

const MAIN = document.getElementById("main") as HTMLElement;

const LOG_LAYOUT_BTN = document.getElementById("display-log") as HTMLButtonElement;
const CAL_LAYOUT_BTN = document.getElementById("display-calendar") as HTMLButtonElement;

// autofill in index.html depending on default, allow hash overwrite


// Functions
function loadCal() {
    
}

function loadLog() {
    console.log("loading log layout");

    // Set up the new entry button.
    MAIN.innerHTML = `
<a href="/new-entry.html" class="invisible">
    <div class="log-entry-new">
        <div class="icon i-plus" id="create-new-entry">
            <span class="sr-label">Create New Entry</span>
        </div>
    </div>
</a>`

    // Now retrieeve allllll entries.
    for (let entry of JournalEntry.loadAll()) {
        MAIN.appendChild(entry.createLogEntry());
    }
}

// listen to buttons.
LOG_LAYOUT_BTN.onclick = loadLog;
CAL_LAYOUT_BTN.onclick = loadCal;

loadLog();
