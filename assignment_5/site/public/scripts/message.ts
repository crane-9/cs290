/**
 * Script for the message box.
 */

const colorInput = document.getElementById("usercolor") as HTMLInputElement;
const nameInput = document.getElementById('username') as HTMLInputElement;
const messageInput = document.getElementById("message-input") as HTMLInputElement;
const sendBtn = document.getElementById('send-message') as HTMLButtonElement;

// Match username preview color to input.
function syncUserColor() {
    nameInput.style.color = colorInput.value;
}
syncUserColor();  // Ideally, the color input is black by default, but this is not true after refreshing. So let's sync anyhow.
colorInput.addEventListener('change', syncUserColor);

// Add 'enter' shortcut for message input.
messageInput.addEventListener('keydown', (ev: KeyboardEvent) => {
    if (ev.key !== "Enter") return;
    
    ev.preventDefault();
    sendBtn.click();
});

// Give button functionality.
sendBtn.addEventListener('click', () => {
    // Send message.
    // If not connected to room - just show a cloud as a little demo space.
    // Set it up somehow so that it sends off to another function that worries about this. And yeah. :] yay

    // Reset box.
    messageInput.value = '';
});
