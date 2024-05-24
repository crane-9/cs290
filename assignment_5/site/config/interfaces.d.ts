interface MessageEvent {
    message: string;
    username: string;
    color: string;
}

interface ClientToServerEvents {
    message: (MessageEvent) => void;
}

interface ServerToClientEvents {
    messageIncoming: (MessageEvent) => void;
}


export type {
    MessageEvent
}
