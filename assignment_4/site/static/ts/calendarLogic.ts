/**
 * This file has all the complex logic for building a calendar!
 */

import type { indexed } from "./entry.js";

import { JournalEntry, indexByDate } from "./entry.js";
import { createElement } from "./generation.js";

const WEEKDAYS = [
    "Sunday",
    "Monday",
    "Tuesday", 
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];


/**
 * Finds the starting sunday for the calendar.
 * @returns Date object for the first Sunday for the calendar.
 */
function findSunday(): Date {
    let date;
    let i = 1;

    // Decrement `i`, use `i` to change date relative to first day of the month.
    // Run loop until day is a sunday.
    do {
        date = new Date();
        date.setDate(i);
        i--;
    } while (date.getDay() != 0);
    
    return date;
}


/**
 * Creates the head of the table, populated with days of the week.
 * @returns HTMLElement for the head of a table.
 */
function buildHead(): HTMLElement {
    // Initialize elements.
    const head = createElement("thead");
    const row = createElement("tr");

    for (let day of WEEKDAYS) {
        const cell = createElement("th");
        cell.innerText = day;

        row.appendChild(cell);
    }

    head.appendChild(row);
    return head;
}


/**
 * Render one week to the calendar.
 * @param currentMonth The current calendar month.
 * @param sunday The sunday of the week. 
 * @returns A table row element containing the days of the week, populated with the needed data.
 */
function addWeek(currentMonth: number, sunday: Date, index: indexed): HTMLTableRowElement {
    let row = document.createElement("tr");

    // Loop for 7 days.
    for (let _ of WEEKDAYS) {
        // Constants for current day.
        const date = sunday.getDate();
        const month = sunday.getMonth();
        const year = sunday.getFullYear();
        
        // create calendar day cell
        const cell = createElement("td");

        if (month !== currentMonth) cell.classList.add("other-month");

        // Date marker
        const marker = createElement("div", "date");
        marker.innerText = "" + date;

        // If there is a journal entry for the current day, 
        let daysEntries;
        try {
            daysEntries = index[year][month][date];
        } catch (err) {
            daysEntries = null;
        }

        if (daysEntries) {
            // Create wrapper
            let cardWrapper = createElement("div", "card-wrapper");
            
            // Display up to three cards.
            for (let card of daysEntries[0].getCards().slice(0, 3)) {
                cardWrapper.appendChild(card.buildElement("span", true));
            }

            cell.appendChild(cardWrapper);
        // Else, if it is today, place add button.
        } else if (date == new Date().getDate()) {
            let linkWrap = createElement("a", "invisible") as HTMLAnchorElement;
            linkWrap.href = "/new-entry.html";

            let wrapper = createElement("div", "card-wrapper", "icon", "i-plus");
            wrapper.title = "Add Entry";

            linkWrap.appendChild(wrapper);
            cell.appendChild(linkWrap);
        }

        // Append
        cell.appendChild(marker);
        row.appendChild(cell);

        // Increment date
        sunday.setDate(date + 1);
    }

    return row;
}


/**
 * Builds the entire calendar.
 * @param data Array of `JournalEntry` objects to render to the calendar.
 */
function buildCalendar(data: JournalEntry[]): HTMLTableElement {
    // Index data based on date.
    const index = indexByDate(data);

    // Get the month.
    const month = new Date().getMonth();

    // Build basis.
    const table = createElement("table") as HTMLTableElement;
    table.id = "calendar";

    // Build children.
    const head = buildHead();
    const body = createElement("tbody");
    body.id = "calendar-body";

    // Initialize date management.
    let date = findSunday();
    
    // Loop until Sunday is no longer within the given month.
    while (date.getMonth() - month < 1) {
        body.appendChild(addWeek(month, date, index));
    }

    table.appendChild(head);
    table.appendChild(body);

    return table;
}


export { buildCalendar };
