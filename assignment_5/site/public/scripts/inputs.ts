/**
 * Script for the message box.
 */
import { sendMessage} from "./client.js";
import { highlightInput, showError } from "./error.js";
import { doodleCanvas } from "./doodle.js";
import * as utils from "./utils.js";

const colorInput = document.getElementById("usercolor") as HTMLInputElement;
const nameInput = document.getElementById('username') as HTMLInputElement;
const messageInput = document.getElementById("message-input") as HTMLInputElement;
const sendBtn = document.getElementById('send-message') as HTMLButtonElement;

// Randomize starting color for fun.
colorInput.value = utils.randomColor();

// Match username preview color to input.
function syncUserColor() {
    nameInput.style.color = colorInput.value;
}

syncUserColor();  // Ideally, the color input is black by default, but this is not true after refreshing. So let's sync anyhow.
colorInput.addEventListener('change', syncUserColor);


// Add 'enter' shortcut for message input.
utils.addEnterAction(messageInput, sendBtn);


// Give button functionality.
sendBtn.addEventListener('click', async (ev: MouseEvent) => {
    ev.preventDefault();
    
    // Validate input lengths.
    let lastInput = nameInput;  // Using this variable to track which input should be highlighted in error feedback.
    try {
        var username = utils.validateLength(nameInput.value, {minLength: 1, maxLength: 18, label: 'username'});

        lastInput = messageInput;
        var messageContent = utils.validateLength(messageInput.value, {minLength: 1, maxLength: 80, label: 'message content'});
    } catch (err: any) {
        showError(err);
        highlightInput(lastInput, true);
        return;
    }

    // Send message.
    // If not connected to room - just show a cloud as a little demo space.
    // Set it up somehow so that it sends off to another function that worries about this. And yeah. :] yay
    const success = await sendMessage(messageContent, username, colorInput.value, doodleCanvas.exportCanvas());

    if (!success) return;

    // Reset canvas + message.
    doodleCanvas.clearCanvas();
    messageInput.value = '';
});
