/**
 * This is my main server. It contains the HTTP server, Express server, and Pug rendering.
 */
import { createServer } from "http";
import express, { NextFunction, Request, Response } from "express";

import * as config from "./config/config.js";

import baseRouter from "./routes/base.routes.js";
import adminRouter from "./routes/admin.routes.js";
import apiRouter from "./routes/api.routes.js";

import logMiddleware from "./middleware/logger.middleware.js";


// Logging output on startup.
console.log("Creating servers...");

// Server setup
const app = express();
const server = createServer(app);

// Use Pug to render templates.
app.set('view engine', 'pug');

// Set up middlewares.
app.use(logMiddleware);


// Routing.
// Map static assets.
app.use('/static', express.static(config.PUBLIC_DIR));


// Connect routers.
app.use('/', baseRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);


// Responses on errors.
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
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
        page: {title: error.message}
    });
});


// Run and log.
server.listen(config.PORT);
console.log(`Running on http://localhost:${config.PORT} !`);
