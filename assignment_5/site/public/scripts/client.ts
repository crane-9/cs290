/**
 * 
 */
import type { Socket } from "socket.io-client";
import { Cloud } from "./clouds.js";


const socket = (window as any).socket as Socket;

const messageDest = document.getElementById("message-container") as HTMLElement;

console.log(messageDest);


socket.on('messageIncoming', (message: any) => {
    console.log("message incoming");
    const newCloud = new Cloud(message);
    newCloud.render();
});

function sendMessage(message: string, username: string, color: string): void {
    socket.emit('message', {
        message: message,
        username: username,
        color: color
    });
}

export { sendMessage };