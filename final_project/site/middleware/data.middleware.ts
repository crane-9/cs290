/**
 * This layer of middleware gathers site and page data from the database for rendering.
 */

import { Request, Response } from "express";
import DB from "../database/database";


/**
 * Connects site metadata to the response locals object.
 * @param req Client request.
 * @param res Server response
 * @param next Passes the request handling onto the next level.
 */
async function dataMiddleware(req: Request, res: Response, next: Function) {
    const db = new DB();

    // TODO: Maybe this metadata could be cached, as it is grabbed for every request!
    res.locals['meta'] = await db.getSiteInfo();

    // Carry on.
    next();
}

export default dataMiddleware;
