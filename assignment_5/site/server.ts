import * as path from "path";

import express, { Request, Response } from "express";
import { Server } from "socket.io";

import * as config from "./config/config.js";

// Setup
const publicDir = path.join(__dirname, "public")


// Create server and map static assets.
const server = express();
server.use('/static', express.static(publicDir));

// Routing.
server.get("/", (req: Request, res: Response) => {
    console.info(`Request received.`);
    res.sendFile(path.join(publicDir, 'index.html'));
});

// Run and log
server.listen(config.PORT);
console.log(`Server running on http://localhost:${config.PORT} !`);

// const server = createServer(
//     (req: IncomingMessage, res: ServerResponse) => {
//         console.info(`Request received.`);

//         let s = fs.createReadStream(index);
//         let type = config.MIME_KEY[path.extname(index).slice(1)] || 'text/plain';


//         s.on('open', () => {
//             res.writeHead(200, {'Content-Type': type});
//             s.pipe(res);
//         });

//         s.on('error', (err: any) => {
//             console.error(err);
//             res.writeHead(400, {"Content-Type": "application/json"});
//             res.end(JSON.stringify({
//                 status: 400, 
//                 message: "There was an error.",
//                 error: true
//             }));
//         })
//     }
// );

// server.listen(config.PORT);
