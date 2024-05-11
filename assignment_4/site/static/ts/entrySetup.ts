/**
 * This script prepares the /new-entry page for use.
 */

import { DECK, MajorArcana, MinorArcana } from "./cards.js";

const CARD_POOL = document.getElementById("card-pool") as HTMLElement;

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
        let div = card.build_element();
        let caption = document.createElement("span");
        
        button.classList.add("card-button");
        caption.classList.add("button-caption");
        caption.innerText = card.get_title();

        button.addEventListener("click", (ev: MouseEvent) => {
            // Mark as selected!
            const className = "selected";
            let isSelected = button.classList.contains(className);

            if (isSelected) {
                button.classList.remove(className);
            }
            else {
                button.classList.add(className);
            }
            // Add to pool.
            CARD_POOL.appendChild(div.cloneNode(true));
        });
        
        button.appendChild(div);
        button.appendChild(caption);
        parent.appendChild(button);
    }
}

populateCardSelection();

// Connect save draft, save, and delete buttons
