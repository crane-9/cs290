/**
 * This is my main server. It contains the HTTP server, Express server, and Socket.IO management.
 */
import * as path from "path";
import { createServer } from "http";
import express, { Request, Response } from "express";
import { Server } from "socket.io";


import * as config from "./config/config.js";
import { bindSetup } from "./controllers/sockets.js";


// Logging output on startup.
console.log("Creating servers...");

// Setup
const app = express();
const server = createServer(app);
const io = new Server(server);

// Routing.
// Map static assets.
app.use('/static', express.static(config.PUBLIC_DIR));

// Main application.
app.get("/", (req: Request, res: Response) => {
    console.info('Index requested.');
    res.sendFile(path.join(config.PUBLIC_DIR, 'index.html'));
});


// Bind socket setup to connection event.
io.on('connection', bindSetup(io));


// Run and log.
server.listen(config.PORT);
console.log(`Running on http://localhost:${config.PORT} !`);
