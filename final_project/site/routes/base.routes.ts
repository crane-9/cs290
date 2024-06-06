/**
 * Basic page routing.
 */

import express, { Request, Response } from "express";
import metaMiddleware from "../middleware/meta.middleware";

const baseRouter = express.Router();

// Configure middleware.
baseRouter.use(metaMiddleware)


/**
 * Index page.
 */
baseRouter.get("/", (req: Request, res: Response) => {
    res.render('index', res.locals);
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
baseRouter.get("/sitemap", (req: Request, res: Response) => {
    res.render('sitemap', res.locals);
});


export default baseRouter;
