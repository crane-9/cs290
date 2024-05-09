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

    constructor() {
        if (this.constructor == TarotCard)
            throw new Error(ABC_ERROR);

        this.reversed = false; // Defaults to upright.
    }

    /**
     * @abstract
     * Method should return the card's title.
     */
    get_title(): string {
        throw new Error(ABC_ERROR);
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

    get_title(): string {
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

    get_title(): string {
        return TITLES[this.__number];
    }

    get_numeral(): number {
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
    [Suit.Cups, Suit.Pentacles, Suit.Swords, Suit.Wands].forEach(( s: Suit )=> {
        for (let r = 1; r < 15; r++) {
            deck.push(new MinorArcana(r as RankRange, s));
        }
    });

    // Major arcana next
    for (let i = 0; i < 22; i++) {
        deck.push(new MajorArcana(i as NumberRange));
    }

    return deck;
}

// // Manually verify functionality
// buildDeck().forEach(card => {
//     console.log(card.get_title())
// })

const DECK = buildDeck();

export { DECK, MajorArcana, MinorArcana, buildDeck };
