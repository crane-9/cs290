// this is the data model and operations for entries

const KEY_PREFIX = "tarotjournal-"
const ENTRY_PREFIX = KEY_PREFIX + "entry";
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
        if (dataStr === null) throw {error: `No entry with id ${id} found.`};

        const data = JSON.parse(dataStr);
        return new JournalEntry(data.id, data.title, data.body, data.date, data.cards);
    }

    static newEntry(title: string, body: string, date: number, cards: string[]): JournalEntry {
        // Count new entry.
        const id = countNewEntry();
        console.log("new entry's id: ", id);

        // save now?

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
}


export { JournalEntry };
