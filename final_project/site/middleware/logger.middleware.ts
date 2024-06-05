/**
 * This layer of middleware logs requests and error statuses.
 */

import { Request, Response } from "express";


/**
 * Middleware that logs basic information about the incoming request.
 * @param req Client request.
 * @param res Server response
 * @param next Passes the request handling onto the next level.
 */
function logMiddleware(req: Request, res: Response, next: Function): void {
    const date = new Date();
    console.log(`[${date.toLocaleTimeString()}] ${req.method} ${req.path}`);

    // Carry on!
    next();
}


export default logMiddleware;
