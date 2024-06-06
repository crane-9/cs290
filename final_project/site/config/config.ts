import path from 'path';

// Directory for static content.
const PUBLIC_DIR = path.join(__dirname, "../public")

// Port host.
const PORT = 8080;

const DB_PATH = path.join(__dirname, "../dev.db"); // Not super important where it is in development. At this point at least.

export {
    PUBLIC_DIR,
    PORT,
    DB_PATH
}
