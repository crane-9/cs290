/**
 * 
 */
import type { Socket } from "socket.io-client";


const socket = (window as any).socket as Socket;

const messageDest = document.getElementById("message-container") as HTMLElement;

console.log(messageDest);


socket.on('messageIncoming', (message: any) => {
    console.log("message incoming");
    messageDest.innerText += message.message + "\n";
});

function sendMessage(message: string, username: string, color: string): void {
    socket.emit('message', {
        message: message,
        username: username,
        color: color
    });
}

export { sendMessage };