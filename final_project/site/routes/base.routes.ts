/**
 * Basic page routing.
 */

import express, { Request, Response } from "express";
import dataMiddleware from "../middleware/data.middleware";
import pageMiddleware from "../middleware/pages.middleware";

const baseRouter = express.Router();

// Configure middleware.
baseRouter.use(dataMiddleware);
baseRouter.use(pageMiddleware);


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


// All other custom pages.
baseRouter.get("/:custom", (req: Request, res: Response) => {
    // res.render
    // Render customized page with customized values!
})


export default baseRouter;
