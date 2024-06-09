/**
 * This layer of middleware gathers site and page data from the database for rendering.
 */
import { marked } from "marked";

import { Request, Response } from "express";
import DB from "../database/database";


async function pageMiddleware(req: Request, res: Response, next: Function) {
    const db = new DB();
    res.locals['page'] = await db.getPageInfo(req.path);

    // Convert description to HTML. If it exists.
    if (res.locals['page'])
        res.locals['page'].BodyText = marked(res.locals['page'].BodyText)
    
    next();
}

export default pageMiddleware;
