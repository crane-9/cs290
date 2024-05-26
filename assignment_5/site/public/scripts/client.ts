/**
 * This file handles the client connection to the websocket.
 */

import type { Socket } from "socket.io-client";
import type { ClientMessage } from "@interfaces";

import { Cloud } from "./clouds.js";
import { showError } from "./error.js";


// Mixed feelings about doing it this way, but it's working.
const socket = (window as any).socket as Socket;


// Report disconection.
socket.on('disconnect', (reason: Socket.DisconnectReason, description?: any) => {
    const message = description.type === "close"? 'websocket server closed.' : "connection lost.";
    showError({error: true, message: message});

    (document.getElementById('current-room') as HTMLElement).innerText = '';
});


// Handle message incoming.
socket.on('messageIncoming', (message: any) => {
    const newCloud = new Cloud(message);
    newCloud.render();
});


/**
 * Sends a message using the current connected socket.
 * If not connected: renders the message as a preview.
 * @param message The message content.
 * @param username User's username
 * @param color Color to represent the user.
 * @param image DatURL of image.
 */
async function sendMessage(message: string, username: string, color: string, image: string): Promise<boolean> {
    
    message = message.startsWith("/")? '': message;
    let response = await socket.emitWithAck('message', {
        message: message,
        username: username,
        color: color,
        imageData: image
    } as ClientMessage);

    // Show error if needed and return success status.
    if (response.error) showError(response);
    return !response.error;
}

export { sendMessage };
