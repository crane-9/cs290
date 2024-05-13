// this is the data model and operations for entries
import { TarotCard } from "./cards.js";
import { createElement } from "./generation.js";


const KEY_PREFIX = "tarotjournal-"
const ENTRY_PREFIX = KEY_PREFIX + "entry_";
const ENTRY_COUNT_KEY = KEY_PREFIX + "entry_count";
const DRAFT_KEY = KEY_PREFIX + "last_draft";


/**
 * Counts a new entry, updating the stored number and returning the previous value for the new entry's id.
 * @returns Id value for the new entry.
 */
function countNewEntry(): number {
    const newIDRaw: string | number | null = localStorage.getItem(ENTRY_COUNT_KEY);
    let newID: number;

    // Correct value
    if (newIDRaw === null) newID = 0;
    else newID = Number(newIDRaw);

    localStorage.setItem(ENTRY_COUNT_KEY, (newID + 1).toString());
    return newID;
}


/**
 * models a single journal entry
 */
class JournalEntry {
    id: number;
    title: string;
    body: string;
    date: number;
    cards: string[];

    /**
     * Loads a journal entry by ID.
     * @param id Desired entry's ID.
     */
    static load(id: number): JournalEntry {
        const dataStr = localStorage.getItem(ENTRY_PREFIX + id);
        if (dataStr === null) throw {error: `No entry with id ${id} found.`, notFound: true};

        const data = JSON.parse(dataStr);
        return new JournalEntry(data.id, data.title, data.body, data.date, data.cards);
    }

    /**
     * Loads all entries from `localStorage`.
     * @returns All discovered journal entries as an array of objects.
     */
    static loadAll(): JournalEntry[] {
        let entries: JournalEntry[] = [];
        
        // Setting a limit of 100 for this demo. In the future: this will be a more thoughtful process with inclusion of paging and etc.
        for (let x = 0; x < 100; x++) {
            console.log(`searching for entry ${x}`)
            // Check storage
            let data;
            try {
                data = JournalEntry.load(x)
                console.log(data);
            } catch (err) {
                // Verify error is most likely thrown by my own code.
                if ((err as any).notFound) break;

                // If something else happened, don't silence it.
                else throw err;
            }

            entries.push(data);
        }

        return entries;
    }

    /**
     * Creates a new entry with the given information
     * @param title Entry title.
     * @param body Entry body.
     * @param date Entry date as number (milliseconds).
     * @param cards Entry cards as an array of codes.
     * @returns The new `JournalEntry` object.
     */
    static newEntry(title: string, body: string, date: number, cards: string[]): JournalEntry {
        // Count new entry.
        const id = countNewEntry();
        console.log("new entry's id: ", id);

        return new JournalEntry(id, title, body, date, cards);
    }

    /**
     * 
     * @param id The entry's ID.
     * @param title The entry's title.
     * @param body The entry's body text (may be an empty string).
     * @param date The entry's date.
     * @param cards Cards associated with the entry, as an array of representative strings.
     */
    constructor(id: number, title: string, body: string, date: number, cards: string[]) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.date = date;
        this.cards = cards;
    }

    /**
     * Internal method for consistently exporting data to `localStorage`.
     * @param storageKey The key to save the entry to.
     */
    __export(storageKey: string): void {
        const dataString = JSON.stringify({
            id: this.id,
            title: this.title,
            body: this.body,
            date: this.date,
            cards: this.cards
        });

        localStorage.setItem(storageKey, dataString);
    }

    /**
     * Parse all cards for the entry and return as an array.
     * @returns Array of `TarotCard` objects.
     */
    getCards(): TarotCard[] {
        let cardObjs: TarotCard[] = [];

        // Iterate!
        for (let cardStr of this.cards) {
            cardObjs.push(TarotCard.parse(cardStr));
        }

        return cardObjs;
    }

    /**
     * Get the key to save the given entry to storage.
     * @returns Key for the entry's place in `localStorage`.
     */
    getEntryKey(): string {
        return ENTRY_PREFIX + this.id;
    }

    /**
     * Saves the given entry.
     */
    save(): void {
        this.__export(this.getEntryKey());
    }

    /**
     * Saves the given entry as a draft.
     */
    saveDraft(): void {
        this.__export(DRAFT_KEY);
    }


    createLogEntry(): HTMLElement {
        // Wrapper
        const wrapper = createElement("div", "log-entry");

        // Content
        const content = createElement("div", "entry-content");

        const title = createElement("h3", "entry-title");
        title.innerHTML = `<a href="#">${this.title}</a>`

        const body = createElement("div", "entry-body");
        // render markup as html
        body.innerText = this.body;

        content.appendChild(title);
        content.appendChild(body);

        // Cards
        const cards = createElement("div", "cards");

        // Populate cards.
        for (let card of this.getCards()) {
            cards.appendChild(card.buildElement("span", true));
        }

        wrapper.appendChild(content);
        wrapper.appendChild(cards);

        return wrapper;
    }
    
    createCalendarEntry(): HTMLElement {
        const wrapper = createElement("div");
        return wrapper;
    }
}


export { JournalEntry, DRAFT_KEY };
