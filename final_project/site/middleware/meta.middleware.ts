

import { Request, Response } from "express";
import DB from "../database/database";


/**
 * Connects site metadata to the response locals object.
 * TODO: because this is gathered on every request, this should be cached from the first request, and refrehsed when updated by the admin (or if missing).
 * @param req Client request.
 * @param res Server response
 * @param next Passes the request handling onto the next level.
 */
async function metaMiddleware(req: Request, res: Response, next: Function) {
    const db = new DB();
    res.locals['meta'] = await db.getSiteInfo();
    res.locals['page'] = await db.getPageInfo(req.path);

    // Carry on.
    next();
}

export default metaMiddleware;
