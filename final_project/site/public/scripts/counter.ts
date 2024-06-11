
/**
 * This class manages behavior of the "X selected" counter on the table pages.
 */
class Counter {
    currentCount: number = 0;
    selectionCounter: HTMLElement = document.getElementById("selection-counter") as HTMLElement;

    /** Updates the display counter. */
    display() {
        this.selectionCounter.innerText = '' + this.currentCount;
    }

    /** Increases counter by 1, and updates display by default. */
    increase(display: boolean = true) {
        this.currentCount ++;
        if (display)  this.display();
    }

    /** Decreases counter by 1, and updates display by default. */
    decrease(display: boolean = true) {
        this.currentCount --;
        if (display)  this.display();
    }

    getCount(): number {
        return this.currentCount;
    }
}

export { Counter };