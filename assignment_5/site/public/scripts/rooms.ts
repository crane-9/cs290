/**
 * Room joining and creation buttons.
 */

import { Socket } from "socket.io-client";
import { highlightInput, showError } from "./error.js";
import { addEnterAction, validateLength } from "./utils.js";

const socket = (window as any).socket as Socket;

// Collect elements.
const createBtn = document.getElementById("create-room") as HTMLButtonElement;
const createID = document.getElementById('create-room-id') as HTMLInputElement;
const joinBtn = document.getElementById("join-room") as HTMLButtonElement;
const joinID = document.getElementById('join-room-id') as HTMLInputElement;

const currentRoom = document.getElementById('current-room') as HTMLSpanElement;


// Set up variables for actions.
const actions = [
    {
        button: createBtn,
        input: createID,
        eventName: 'requestCreate',
    }, {
        button: joinBtn,
        input: joinID,
        eventName: 'requestJoin'
    }
];

// Actions are identical between join and create buttons.
for (let set of actions) {
    set.button.addEventListener('click', async () => {
        let roomName;
        try {
            roomName = validateLength(set.input.value, {minLength: 1, maxLength: 24})
        } catch (err: any) {
            showError(err);
            highlightInput(set.input);
            return;
        }
    
        let response;
        try {
            response = await socket.timeout(1000).emitWithAck(set.eventName, { roomName });
        } catch (err) {
            showError({message: 'server did not respond in time, try again.', error: true});
            return;
        }
        
        // Show feedback. TODO: Should rename the module to 'feedback' rather than error.
        showError(response);

        if (response.error) return;

        set.input.value = '';
        currentRoom.innerText = roomName;
    });

    addEnterAction(set.input, set.button);
}

