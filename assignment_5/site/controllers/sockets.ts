/**
 * Socket behavior and events.
 */
import { Server, Socket } from "socket.io"; 

import type { ClientMessage, RoomData } from "../models/interfaces.js";

// Init variables
let users = 0;
let rooms: Set<string> = new Set([]);


/**
 * Generalizes the room creation behavior, with configurable creation.
 * @param socket The socket joining the room.
 * @param roomName The name of the room to join.
 * @param callback Callback to call with feedback to the client.
 * @param currentRoom The room the client is currently in. May be null.
 * @param create Boolean: should this create the room or should it not exist yet.
 * @returns No return value.
 */
function joinRoom(create: boolean, roomName: string, socket: Socket, currentRoom: string | null, callback: Function): string {
    // If existence of room contradicts goal, return an error.
    if (rooms.has(roomName) == create) return callback({error: true, message: `room ${create? 'already exists.' : 'does not exist'}.`});
    
    // Leave current room.
    if (currentRoom !== null) socket.leave(currentRoom);
    
    // Join room and send acknowledgement.
    if (create) {
        console.info(`Room '${roomName}' created!`);
        rooms.add(roomName);
    }
        

    socket.join(roomName);
    callback({error: false, message: `room ${create? 'created and' : ''} joined.`});

    return roomName;
}


/**
 * Runs socket setup.
 * @param socket The new connection
 */
function socketSetup(socket: Socket, io: Server): void {
    const userID = users;
    users++;

    console.info(`User ${userID} has connected!`);
    let room: null | string = null;

    // Set up room join/creation requests.
    socket.on('requestCreate', ({ roomName }: RoomData, callback: Function) => room = joinRoom(true, roomName, socket, room, callback));
    socket.on('requestJoin', ({ roomName }: RoomData, callback: Function) => room = joinRoom(false, roomName, socket, room, callback));

    // Set up receptions.
    socket.on('message', (incoming: ClientMessage, callback: Function) => {
        if (room === null) return callback({error: true, message: "you are not in a room."});

        // Broadcast to room.
        io.to(room).emit('messageIncoming', incoming);
        console.info(`Message sent in room '${room}'.`);

        // Respond with validation.
        callback({error: false});
    });

    socket.on('disconnect', async () => {
        console.info(`User ${userID} has disconnected!`);

        // No need to clean up if no room.
        if (room === null) return;
        
        // Clean up if no one is left in the room.
        const users = await io.in(room).fetchSockets();
        if (users.length == 0) {
            console.info(`Deleting room '${room}'.`)
            rooms.delete(room);
        }
    });
}


/**
 * This is basically a simple wrapper function used to get access to the `io` SocketIO server object from `server.ts`.
 * @param server The SocketIO server object to bind to.
 * @returns Returns the `socketSetup` function, bound to the given server.
 */
function bindSetup(server: Server): (s: Socket) => void {
    console.log("Binding socket setup to server...");
    return (s: Socket) => socketSetup(s, server);
}


export {
    bindSetup,
}