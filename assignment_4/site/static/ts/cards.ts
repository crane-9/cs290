/**
 * this file is the tarot card classes and modelling.
 */

/**
 * @enum
 * Enum for 4 valid Tarot suits
 */
enum Suit {
    Cups = "Cups",
    Pentacles = "Pentacles",
    Swords = "Swords",
    Wands = "Wands"
};

const Suits_Iter = Object.values(Suit);
console.log(Suits_Iter);

// Define helper types for valid ranges.
type RankRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
type NumberRange =  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21;


// Map rank to written word.
const RANK_MAP = {
    1: "Ace",
    2: "Two",
    3: "Three",
    4: "Four",
    5: "Five",
    6: "Six",
    7: "Seven",
    8: "Eight",
    9: "Nine",
    10: "Ten",
    11: "Page",
    12: "Knight",
    13: "Queen",
    14: "King"
};

// Map index to written title.
const TITLES = [
    "The Fool",
    "The Magician",
    "The High Priestess",
    "The Empress",
    "The Emperor",
    "The Hierophant",
    "The Lovers",
    "The Chariot",
    "Strength",
    "The Hermit",
    "The Wheel of Fortune",
    "Justice",
    "The Hanged Man",
    "Death",
    "Temperance",
    "The Devil",
    "The Tower",
    "The Star",
    "The Moon",
    "The Sun",
    "Judgement",
    "The World"
]

// Error to raise when calling abstract base class `TarotCard`.
const ABC_ERROR = "`TarotCard` class should not be instantiated directly.";

/**
 * @abstract
 * Abstract base class for Tarot cards.
 * Should be inherited from by a Major and Minor arcana class.
 */
class TarotCard {
    reversed: boolean;
    arcana?: string;

    /**
     * Creates a card from the given code, returning a MajorArcana or MinorArcana object.
     * @param cardCode Code for the given card.
     */
    static parse(cardCode: string): TarotCard {
        const [ general, specific ] = cardCode.split(":");
        
        let generalParse: boolean[] = [];
        [...general].forEach((stringDigit: string) => {
            generalParse.push(Boolean(Number(stringDigit)));
        });
        
        const [ isReversed, isMajor ] = generalParse;
        
        let card: TarotCard;
        
        // Two different processes
        if (isMajor) {
            card = new MajorArcana(parseInt(specific, TITLES.length) as NumberRange);
        } else {
            let rank = parseInt(specific[0], 16) as RankRange;
            let suit = Suits_Iter[parseInt(specific[1])];
            card = new MinorArcana(rank, suit);
        }
        
        console.log(cardCode, general, specific, isReversed, typeof isMajor, card);
        // Reverse if needed.
        if (isReversed) card.reverse();

        return card;
    }

    constructor() {
        if (this.constructor == TarotCard)
            throw new Error(ABC_ERROR);

        this.reversed = false; // Defaults to upright.
    }

    /**
     * Generates the starting bits for the card's unique identifier code.
     * @returns Prefix to the card's unique code.
     */
    __codePrefix(): string {
        return "" + Number(this.reversed) + Number(this.arcana === "major");
    }

    /**
     * @abstract
     * Generates the latter half of the card's unique identifier code.
     */
    __codeSuffix(): string {
        throw new Error(ABC_ERROR);
    }

    /**
     * Generate unique code.
     */
    getDataCode(): string {
        return this.__codePrefix() + ":" + this.__codeSuffix();
    }

    /**
     * @abstract
     * Returns the unique class name to display the given card.
     */
    getClassnames(): string[] {
        throw new Error(ABC_ERROR);
    }

    /**
     * @abstract
     * Method should return the card's title.
     */
    getTitle(): string {
        throw new Error(ABC_ERROR);
    }

    /**
     * The card's title including reversed status.
     */
    getTitleFull(): string {
        const title = this.getTitle();
        
        if (this.reversed) return `${title} (Reversed)`;
        
        return title;
    }

     /**
     * Builds an element to represent the given card.
     * @param [elem="div"] Defaults to "div". The tagname for the created element.
     */
    buildElement(elem: string = "div"): HTMLElement {
        let div = document.createElement(elem);
        div.classList.add("card", ...this.getClassnames());
        div.title = this.getTitle();
        div.setAttribute("data-tarot-code", this.getDataCode());
        
        return div;
    }
    
    /**
     * Simple shortcut method for creating an element to label
     * @param options For label configuration. Two current options: `elem` for element tagname, and `fullTitle` for whether or not to include the reversal status.
     * @param classes List of classes to assign to the element.
     * @returns An element with the given classes containing an innerText of the card's title.
     */
    buildLabel(options: any, ...classes: string[]): HTMLElement {
        const span = document.createElement(options.elem == null? "span": options.elem);

        if (classes.length) span.classList.add(...classes);

        // Conditional title.
        span.innerText = options.fullTitle? this.getTitleFull(): this.getTitle();

        return span;
    }
       
    /**
     * Invert reversed status.
     */
    reverse(): void {
        this.reversed = !this.reversed;
    }
}

/**
 * Class representing minor arcana Tarot cards.
 */
class MinorArcana extends TarotCard {
    arcana = "minor";
    
    __rank: RankRange;
    __suit: Suit;

    constructor(rank: RankRange, suit: Suit) {
        super();
        this.__rank = rank;
        this.__suit = suit;
    }

    __codeSuffix(): string {
        return "" + this.__rank.toString(16) + Suits_Iter.indexOf(this.__suit);
    }

    getClassnames(): string[] {
        return ["icon", this.__suit.toLowerCase()];
    }

    getTitle(): string {
        return `${RANK_MAP[this.__rank]} of ${this.__suit.toString()}`
    }

    get_rank(): number {
        return this.__rank;
    }

    get_suit(): string {
        return this.__suit;
    }
}

/**
 * Class representing major arcana tarot cards.
 */
class MajorArcana extends TarotCard {
    arcana = "major";
    __number: NumberRange;

    constructor(number: NumberRange) {
        super();
        this.__number = number;
    }

    __codeSuffix(): string {
        return this.__number.toString(TITLES.length);
    }

    getClassnames(): string[] {
        return ["major-arcana", "major-" + this.__number];
    }

    getTitle(): string {
        return TITLES[this.__number];
    }

    getNumeral(): number {
        return this.__number;
    }
}


/**
 * Builds full deck in an organized order.
 * @returns An array of TarotCard objects.
 */
function buildDeck(): TarotCard[] {
    let deck: TarotCard[] = [];

    // Build all minor arcana
    Suits_Iter.forEach(( suit: Suit )=> {
        for (let r = 1; r < 15; r++) {
            deck.push(new MinorArcana(r as RankRange, suit));
        }
    });

    // Major arcana next
    for (let i = 0; i < 22; i++) {
        deck.push(new MajorArcana(i as NumberRange));
    }

    return deck;
}

const DECK = buildDeck();

// // Manually verify functionality
// DECK.forEach(card => {
//     console.log(card.get_title(), card.get_data_code())
// })

console.log(TarotCard.parse("11:9"));

export { DECK, TarotCard, MajorArcana, MinorArcana, buildDeck };
