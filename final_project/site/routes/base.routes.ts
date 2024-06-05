/**
 * Basic page routing.
 */

import express, { Request, Response } from "express";

const baseRouter = express.Router();

// Use middleware to gather site meta.
// baseRouter.use();



/**
 * Index page.
 */
baseRouter.get("/", (req: Request, res: Response) => {
    res.render('index', {meta: res.locals['meta']});
});

/**
 * About page.
 */
baseRouter.get("/about", (req: Request, res: Response) => {
    res.render('about', {meta: res.locals['meta']});
});

/**
 * Contact page.
 */
baseRouter.get("/contact", (req: Request, res: Response) => {
    res.render('contact', {meta: res.locals['meta']});
});


/**
 * Sitemap.
 */
baseRouter.get("/sitemap", (req: Request, res: Response) => {
    res.render('sitemap', {meta: res.locals['meta']});
});


export default baseRouter;