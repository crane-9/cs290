/**
 * This is my main server. It contains the HTTP server, Express server, and Pug rendering.
 */
import express, { NextFunction, Request, Response } from "express";
import { createServer } from "http";

import * as config from "./config/config.js";

import baseRouter from "./routes/base.routes.js";
import adminRouter from "./routes/admin.routes.js";

import logMiddleware from "./middleware/logger.middleware.js";


// Logging output on startup.
console.log("Creating servers...");

// Server setup
const app = express();
const server = createServer(app);

// Use Pug to render templates.
app.set('view engine', 'pug');

// Set up middlewares.
app.use(logMiddleware);  // Log any and all access.


// Routing.
// Map static assets.
app.use('/static', express.static(config.PUBLIC_DIR));


// Connect routers.
app.use('/admin', adminRouter);
app.use('/', baseRouter);


// Responses on errors.
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log("CAUGHT ERROR:");
    console.error(err.stack);
    res.status(500);
    res.render("error", {
        meta: res.locals['meta'], 
        error: {status: err.name, message: err.message},
        page: {title: err.name}
    });
});

app.all('*', (req: Request, res: Response) => {
    const error = {status: 404, message: "page not found."};
    res.status(404).render('error', {
        meta: res.locals['meta'],
        page: {title: error.message},
        error
    });
});

// Handle unhandled promise rejection.
process.on("unhandledRejection", (reason: unknown, promise: Promise<unknown>) => {
    console.error("Unhandled promise rejection:", reason);
    console.error(promise);
})

// Run and log.
server.listen(config.PORT);
console.log(`Running on http://localhost:${config.PORT} !`);
