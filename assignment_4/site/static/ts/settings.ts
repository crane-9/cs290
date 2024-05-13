
// Get input elements.
const DEL_BTN = document.getElementById("reset-storage") as HTMLButtonElement;

const RADIO_LOG = document.getElementById("default-log") as HTMLInputElement;
const RADIO_CAL = document.getElementById("default-calendar") as HTMLInputElement;

const HIDE_BODY_BOX = document.getElementById("hide-entry-body") as HTMLInputElement;


// settings interface with localstorage
// autofill with existing values


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
