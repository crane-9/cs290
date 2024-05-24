/**
 * This is my main server. It contains the HTTP server, Express server, and Socket.IO management.
 */
import * as path from "path";
import { createServer } from "http";
import express, { Request, Response } from "express";
import { Server, Socket } from "socket.io";

import * as config from "./config/config.js";
import apiRouter from "./routes/api.routes.js";

// Setup
const publicDir = path.join(__dirname, "public")

const app = express();
const server = createServer(app);
const io = new Server(server);

// Routing.
// Map static assets.
app.use('/static', express.static(publicDir));

// Main application.
app.get("/", (req: Request, res: Response) => {
    console.info(`Request received.`);
    res.sendFile(path.join(publicDir, 'index.html'));
});

// Connect routers.
app.use("/api", apiRouter);


let users = 0;
// Socket
io.on('connection', (socket: Socket) => {
    const userID = users;
    users++;

    console.info(`User ${userID} has connected!`);

    // Set up receptions.
    socket.on('message', (msg: string) => {
        console.log(`user ${userID} says: ${msg}`);
    })

    socket.on('disconnect', () => {
        console.info(`User ${userID} has disconnected!`);
    })
});


// Run and log.
server.listen(config.PORT);
console.log(`Server running on http://localhost:${config.PORT} !`);
