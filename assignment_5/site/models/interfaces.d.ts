/**
 * Interfaces and schemes for simple data objects.
 * These data types can be accessed via `import {} from '@interfaces'` client- or server-side.
 */

// Data expected in a message transmission.
interface BaseMessage {
    message: string;
    username: string;
    color: string;
    imageData: string;
}

interface ClientMessage extends BaseMessage {}

interface ServerMessage extends BaseMessage {}

interface RoomData {
    roomName: string;
}

// Event specifications for SocketIO
interface ClientToServerEvents {
    message: (ClientMessage) => void;
    requestCreate: (RoomData) => void;
    requestJoin: (RoomData) => void;
}

interface ServerToClientEvents {
    messageIncoming: (ServerMessage) => void;
    enteredRoom: (RoomData) => void;
}


// ERRORS

interface ClientError {
    error: true;
    message: string;
}


export type {
    BaseMessage,
    ClientMessage,
    ServerMessage,
    ClientError,
    RoomData,
    
}
