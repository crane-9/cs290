const PORT = 8080;

const MIME_KEY = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
} as any;

const TIME_FMT = new Intl.RelativeTimeFormat('en-US', {
    numeric:  'auto'
});

export {
    TIME_FMT,
    MIME_KEY,
    PORT,
}