/**
 * Script for minimizing/toggling display of the windows on the page.
 */

const PAIRS = [
    ['open-message-menu', 'message-menu'],
    ['open-draw-menu', 'art-menu'],
    ['open-create-menu', 'create-menu'],
    ['open-join-menu', 'join-menu'],
];

for (const [ btnID, menuID ] of PAIRS) {
    const openBtn = document.getElementById(btnID) as HTMLButtonElement;
    const closeBtn = document.getElementById("close-" + menuID) as HTMLButtonElement;
    const menuElem = document.getElementById(menuID) as HTMLElement;

    // Show element onclick, hide self.
    openBtn.addEventListener('click', () => {
        menuElem.removeAttribute("style");
        openBtn.removeAttribute('style');
    });

    // Remove element on click, show open button.
    closeBtn.addEventListener('click', (ev: MouseEvent) => {
        ev.preventDefault();

        menuElem.style.display = 'none';
        openBtn.style.display = 'block';
    });
}
