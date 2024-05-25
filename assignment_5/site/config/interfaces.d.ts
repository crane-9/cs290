/**
 * Interfaces and schemes for simple data objects.
 * These data types can be accessed via `import {} from '@interfaces'` client- or server-side.
 */

// Data expected in a message transmission.
interface BaseMessage {
    message: string;
    username: string;
    color: string;
    imageData: string | null;
}

interface ClientMessage extends BaseMessage {
    timestamp: number; // oh boy, dealing with timezones.
}

interface ServerMessage extends BaseMessage {
    timestamp: string;
}

interface ClientToServerEvents {
    message: (ClientMessage) => void;
}

interface ServerToClientEvents {
    messageIncoming: (ServerMessage) => void;
}


export type {
    ClientMessage,
    ServerMessage,
    
}
