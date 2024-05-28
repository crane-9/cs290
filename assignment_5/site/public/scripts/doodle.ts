/**
 * This file sets up and manages the canvas and its related controls.
 */


// Set brush size range. Pixel values mapped to CSS class names.
const sizes: Record<string, number> = {
    'sm': 2,
    'md': 5,
    'lg': 12,
    'xl': 20
};


/**
 * Class holds all doodle data.
 */
class Draw {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    isPainting: boolean;

    constructor(elementID: string) {
        this.isPainting = false;

        this.canvas = document.getElementById(elementID) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        this.ctx.lineJoin = this.ctx.lineCap = 'round';
        this.ctx.fillStyle = 'white';
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = sizes['sm'];

        // Plug in event listeners.
        // Using `bind`, as `this` is overridden by the HTMLCanvasElement otherwise.
        this.canvas.addEventListener('mousedown', (this.startDraw.bind(this)));
        this.canvas.addEventListener('mousemove', this.draw.bind(this));
        this.canvas.addEventListener('mouseup', this.endDraw.bind(this));
        this.canvas.addEventListener('contextmenu', (ev) => ev.preventDefault());

        // Reset canvas
        this.clearCanvas();
    }

    /**
     * Calculates the appropriate X, Y value on the canvas using the parent offset and scroll offsets.
     * @param param0 Expects the mouse event with `clientX` and `clientY`
     * @returns [x, y] array of coordinates.
     */
    calcXY({clientX, clientY}: {clientX: number, clientY: number}): [number, number] {
        // Use offset.
        let x = clientX - this.canvas.offsetLeft + scrollX;
        let y = clientY - this.canvas.offsetTop + scrollY;

        // If parent exists, factor in.
        if (this.canvas.offsetParent) {
            x -= (this.canvas.offsetParent as HTMLElement).offsetLeft;
            y -= (this.canvas.offsetParent as HTMLElement).offsetTop;
        }

        return [x, y];
    }

    /**
     * Resets the canvas to full white.
     */
    clearCanvas(): void {
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Exports the canvas contents to a data url.
     * This saves on worrying about uploads and storage, and supports the fleeting nature of the application.
     */
    exportCanvas(): string {
        return this.canvas.toDataURL('png');
    }

    /**
     * Sets the drawing color -- simple shortcut method for external use.
     * @param color The desired color as a string.
     */
    setColor(color: string): void {
        this.ctx.strokeStyle = color;
    }

    /**
     * Starts a stroke in drawing.
     * @param ev Mouse event.
     */
    startDraw(ev: MouseEvent): void {
        this.isPainting = true;
        this.ctx.beginPath();
        this.ctx.moveTo(...this.calcXY(ev));
    }
    
    /**
     * Loops as the user's mouse moves.
     * @param ev Mouse event.
     */
    draw(ev: MouseEvent): void {
        if (!this.isPainting) return;
        
        this.ctx.lineTo(...this.calcXY(ev));
        this.ctx.stroke();
    }
    
    /**
     * Ends a drawing stroke on mouse up.
     */
    endDraw(): void {
        if (!this.isPainting) return;
        
        this.isPainting = false;
    }
}

// Create canvas
const doodleCanvas = new Draw("doodle-canvas");

// Connect color buttons.
for (let button of document.querySelectorAll("button.color-b")) {
    button.addEventListener('click', () => {
        // Get style map and fetch background color.
        const styleMap = window.getComputedStyle(button);
        doodleCanvas.setColor(styleMap.backgroundColor);
        
        // NOTE: This is a "vulnerability" in the sense that any user could easily use inspect element and customize the background colors of the buttons, and use their own color palette. This is not something I'm worried about, I like the idea of a slightly-hackable chat application. Further -- because this function takes the `backgroundColor`, it appears to be safe from gradients and image urls.
    });
}


// Connect size toggler
const sizeBtn = document.getElementById('doodle-size') as HTMLButtonElement;
let sizeCls = Array.from(Object.keys(sizes));

sizeBtn.addEventListener('click', () => {
    sizeBtn.classList.replace(sizeCls[0], sizeCls[1]);

    doodleCanvas.ctx.lineWidth = sizes[sizeCls[1]];

    sizeCls.push(...sizeCls.splice(0, 1));
});

export { doodleCanvas };
