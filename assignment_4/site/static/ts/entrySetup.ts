/**
 * This script prepares the /new-entry page for use.
 */

import { DECK, TarotCard } from "./cards.js";
import { createButton } from "./generation.js";


const CARD_POOL = document.getElementById("card-pool") as HTMLElement;


/**
 * Generates an interactive div to represent a selected card.
 * @param card The card being represented.
 */
function createPoolSlot(card: TarotCard): HTMLDivElement {
    const wrapper = document.createElement("div");
    wrapper.classList.add("pool-slot");
    
    // Append card.
    const cardDiv = card.buildElement();
    wrapper.appendChild(cardDiv);
    wrapper.append(card.buildLabel("span", "caption"));

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

        // Update class
        if (card.reversed) cardDiv.classList.add("reversed");
        else cardDiv.classList.remove("reversed");

        // Update data
        cardDiv.setAttribute("data-tarot-code", card.get_data_code());
    };

    removeBtn.onclick = (ev: MouseEvent) => {
        ev.preventDefault();

        // Remove the whole element.
        wrapper.remove();
    };

    controls.appendChild(flipBtn);
    controls.appendChild(removeBtn);

    wrapper.appendChild(controls);

    return wrapper;
}


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
        let div = card.buildElement();
        let caption = card.buildLabel("span", "button-caption");
        
        button.classList.add("card-button");

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
            const cardElem = createPoolSlot(card);
            CARD_POOL.appendChild(cardElem);
        });
        
        button.appendChild(div);
        button.appendChild(caption);
        parent.appendChild(button);
    }
}

populateCardSelection();

// Connect save and save draft buttons.

// Autofill date input with today.
(document.getElementById("entry-date") as HTMLInputElement).valueAsDate = new Date();
