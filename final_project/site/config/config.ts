import * as crypto from 'crypto';
import path from 'path';


// Directory for static content.
const PUBLIC_DIR = path.join(__dirname, "../public")

// Port host.
const PORT = 8080;

const DB_PATH = path.join(__dirname, "../dev.db"); // Not super important where it is in development. At this point at least.

// Generate a simple random passkey for each run of the server.
// Important note: this is ONLY for the sake of the dev demo, this is unwise implementation in production!
const passKey = crypto.randomBytes(16).toString("hex");


export {
    PUBLIC_DIR,
    PORT,
    DB_PATH,
    passKey
}
