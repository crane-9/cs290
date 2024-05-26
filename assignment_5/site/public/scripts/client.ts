/**
 * This file handles the client connection to the websocket.
 */

import type { Socket } from "socket.io-client";
import type { ClientMessage } from "@interfaces";

import { Cloud } from "./clouds.js";


// Mixed feelings about doing it this way, but it's working.
const socket = (window as any).socket as Socket;


// Handle message incoming.
socket.on('messageIncoming', (message: any) => {
    console.log("message incoming");
    const newCloud = new Cloud(message);
    newCloud.render();
});

// ?
socket.onAny((...args: any[]) => {
    console.log("something happened:", args);
})


/**
 * Sends a message using the current connected socket.
 * If not connected: renders the message as a preview.
 * @param message The message content.
 * @param username User's username
 * @param color Color to represent the user.
 * @param image DatURL of image.
 */
function sendMessage(message: string, username: string, color: string, image: string): void {
    
    message = message.startsWith("/")? '': message;
    socket.emit('message', {
        message: message,
        username: username,
        color: color,
        imageData: image,
        timestamp: new Date().getTime()
    } as ClientMessage);
}

export { sendMessage };
