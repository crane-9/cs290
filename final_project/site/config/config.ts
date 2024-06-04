import path from 'path';

// Directory for static content.
const PUBLIC_DIR = path.join(__dirname, "../public")

// Port host.
const PORT = 8080;

let meta = {description: 'hello description', author: 'me', name: 'lala', title: 'its website'};

export {
    PUBLIC_DIR,
    PORT,
    meta
}
