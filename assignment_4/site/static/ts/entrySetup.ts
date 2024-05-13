/**
 * This script prepares the /new-entry page for use.
 */

import { DECK, TarotCard } from "./cards.js";
import { JournalEntry } from "./entry.js";
import { createButton } from "./generation.js";


const CARD_POOL = document.getElementById("card-pool") as HTMLElement;
const CARD_LIST = document.getElementById("cards-list") as HTMLElement;


/**
 * Generates an interactive div to represent a selected card.
 * @param card The card being represented.
 */
function createPoolSlot(card: TarotCard): HTMLElement[] {
    // Create a label for the pool.
    // This element is created here so that it can most easily be controlled by the card controls.
    const cardLabel = card.buildLabel({ fullTitle: true });

    const wrapper = document.createElement("div");
    wrapper.classList.add("pool-slot");
    
    // Append card.
    const cardDiv = card.buildElement();
    wrapper.appendChild(cardDiv);

    // Create controls + buttons.
    const controls = document.createElement("div");
    controls.classList.add("card-controls");

    const flipBtn = createButton("Flip Card", "i-flip")
    const removeBtn = createButton("Remove Card", "i-close", "red");

    // Add onclick handling
    flipBtn.onclick = (ev: MouseEvent) => {
        ev.preventDefault();

        // Flip it
        card.reverse();

        // Update class/text.
        if (card.reversed) cardDiv.classList.add("reversed");
        else cardDiv.classList.remove("reversed");

        const fullTitle = card.getTitleFull();
        cardDiv.title = fullTitle
        cardLabel.innerText = fullTitle;

        // Update data
        cardDiv.setAttribute("data-tarot-code", card.getDataCode());
    };

    removeBtn.onclick = (ev: MouseEvent) => {
        ev.preventDefault();

        // Remove both elements
        wrapper.remove();
        cardLabel.remove();
    };

    controls.appendChild(flipBtn);
    controls.appendChild(removeBtn);

    wrapper.appendChild(controls);

    return [ wrapper, cardLabel ];
}


/**
 * Populates the card selection menu with card buttons.
 * @param id Id of element to populate with card buttons.
 */
function populateCardSelection(id: string = "card-selector") {
    // Get parent.
    const parent = document.getElementById(id) as HTMLElement;

    // Iterate through each card of the deck.
    for (let card of DECK) {
        // Basic structure.
        let button = document.createElement("button");
        let div = card.buildElement();
        let caption = card.buildLabel({}, "button-caption");
        
        button.classList.add("card-button");

        button.addEventListener("click", (ev: MouseEvent) => {
            // Add to pool.
            const [cardElem, cardLabel ] = createPoolSlot(card);
            CARD_POOL.appendChild(cardElem);
            CARD_LIST.appendChild(cardLabel);
        });
        
        button.appendChild(div);
        button.appendChild(caption);
        parent.appendChild(button);
    }
}


// Connect save and save draft buttons.
(document.getElementById("save") as HTMLButtonElement).onclick = (ev: MouseEvent) => {
    ev.preventDefault();

    // get the things

    // create entry

    // save entry
};

// Autofill date input with today.
const today = new Date();
(document.getElementById("entry-date") as HTMLInputElement).valueAsDate = today;

(document.getElementById("entry-title") as HTMLInputElement).value = `Entry for ${today.toLocaleDateString()}`;

// Call population functions.
populateCardSelection();
