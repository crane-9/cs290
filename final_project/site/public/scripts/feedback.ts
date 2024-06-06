/**
 * This client-side script is responsible for displaying feedback messages on admin pages after API calls.
 */

const display = document.getElementById("display-feedback") as HTMLParagraphElement;

const params = new URLSearchParams(location.search);

const msg = params.get('message');
if (msg) {
    console.info("Rendering feedback message.");
    display.innerHTML = msg;

    const status = params.get("status")

    // Conditional classes for styling.
    if (status === "success") display.classList.add("success-message");
    else if (status === "error") display.classList.add("error-message");
} else {
    display.classList.add("empty");
}
