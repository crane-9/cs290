/**
 * This script prepares the /new-entry page for use.
 */

import { DECK, MajorArcana, MinorArcana } from "./cards.js";


/**
 * 
 * @param id Id of element to populate with card buttons.
 */
function populateCardSelection(id: string = "card-selector") {
    // Get parent.
    const parent = document.getElementById(id) as HTMLElement;

    // Iterate through each card of the deck.
    for (let card of DECK) {
        // Basic structure.
        let button = document.createElement("button");
        let caption = document.createElement("span");
        
        caption.classList.add("button-caption");
        caption.innerText = card.get_title();

        // Conditional styling.
        if (card.arcana == "minor") {
            button.classList.add("card", "icon", (card as MinorArcana).get_suit().toLowerCase());
        } else {
            button.classList.add("card", "major-arcana", `major-${(card as MajorArcana).get_numeral()}`);
        }
        
        button.appendChild(caption);
        parent.appendChild(button);
    }
}

populateCardSelection();
