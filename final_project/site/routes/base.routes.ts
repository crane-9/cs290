/**
 * Basic page routing.
 */

import express, { Request, Response } from "express";
import dataMiddleware from "../middleware/data.middleware.js";
import pageMiddleware from "../middleware/pages.middleware.js";
import DB from "../database/database.js";

const baseRouter = express.Router();

// Configure middleware.
baseRouter.use(dataMiddleware);
baseRouter.use(pageMiddleware);


/**
 * Index page.
 */
baseRouter.get("/", async (req: Request, res: Response) => {
    const db = res.locals['db'] as DB;

    const artwork = await db.getAllEntries("Artwork");
    console.log(artwork);

    res.render('index', {...res.locals, artwork});
});

baseRouter.get("/index", (req: Request, res: Response) => {
    res.redirect("/");
});

/**
 * About page.
 */
baseRouter.get("/about", (req: Request, res: Response) => {
    res.render('about', res.locals);
});


/**
 * Contact page.
 */
baseRouter.get("/contact", (req: Request, res: Response) => {
    res.render('contact', res.locals);
});


/**
 * Sitemap.
 */
baseRouter.get("/sitemap", async (req: Request, res: Response) => {
    const db = res.locals['db'] as DB;
    const pages = await db.getSitemapPages();

    res.render('sitemap', {...res.locals, pages});
});


// All other custom pages.
baseRouter.get("/:custom", (req: Request, res: Response, next: Function) => {
    if (res.locals['page'])
        // Render customized page with customized values!
        res.render('custom', res.locals);
    else next();
})


export default baseRouter;
