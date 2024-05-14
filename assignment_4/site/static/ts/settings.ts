/**
 * General settings. This script should be present on every page (sans example pages).
 */

// Organize keys.
const KEY_PREFIX = "tjsettings-";
const DEFAULT_VIEW_KEY = KEY_PREFIX + "default_view";
const HIDE_BODY_KEY = KEY_PREFIX + "hide_body";


// Get input elements.
const DEL_BTN = document.getElementById("reset-storage") as HTMLButtonElement;

const RADIO_LOG = document.getElementById("default-log") as HTMLInputElement;
const RADIO_CAL = document.getElementById("default-calendar") as HTMLInputElement;

const HIDE_BODY_BOX = document.getElementById("hide-entry-body") as HTMLInputElement;



// Autofill with existing values.
if (localStorage.getItem(DEFAULT_VIEW_KEY) === "calendar") {
    RADIO_CAL.checked = true;
} else {
    // Log is default!
    RADIO_LOG.checked = true;
}

HIDE_BODY_BOX.checked = localStorage.getItem(HIDE_BODY_KEY) !== null;


// Now events for changing values.

/**
 * Set "calendar" when checked.
 */
RADIO_CAL.onchange = (): void => {
    if (RADIO_CAL.checked) localStorage.setItem(DEFAULT_VIEW_KEY, "calendar");
};

/**
 * Remove when checked -- log view is the default default.
 */
RADIO_LOG.onchange = (): void => {
    // Just to save some space, given there's only two possible views right now.
    if (RADIO_LOG.checked) localStorage.removeItem(DEFAULT_VIEW_KEY);
}

/**
 * Simple toggle presence of this flag in `localStorage`.
 */
HIDE_BODY_BOX.onchange = (): void => {
    if (HIDE_BODY_BOX.checked) localStorage.setItem(HIDE_BODY_KEY, "true");
    else localStorage.removeItem(HIDE_BODY_KEY);
};

/**
 * Ask for confirmation and delete all data.
 * @param ev Click event.
 */
DEL_BTN.onclick = (ev: MouseEvent) => {
    // Confirmation with shift key override.
    const confirmation = ev.shiftKey? true : confirm("Warning: Are you sure you want to delete ALL data?");

    if (!confirmation) return;

    // Clear and refresh
    localStorage.clear();
    location.reload();
}

// Export for simplicity's sake, though it would be better to keep these keys in a separate file and use `settings.js` as direct import *only*.
export { DEFAULT_VIEW_KEY, HIDE_BODY_KEY };
