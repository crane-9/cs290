/**
 * Basic page routing.
 */

import express, { Request, Response } from "express";

import { meta } from "../config/config";

const baseRouter = express.Router();

// Use middleware to gather site meta.
// baseRouter.use();



/**
 * Index page.
 */
baseRouter.get("/", (req: Request, res: Response) => {
    res.render('index', {meta: meta, page: {title: "home"}});
});

/**
 * About page.
 */
baseRouter.get("/about", (req: Request, res: Response) => {
    res.render('about', {meta: meta, page: {title: "about"}});
});

/**
 * Contact page.
 */
baseRouter.get("/contact", (req: Request, res: Response) => {
    res.render('contact', {meta: meta, page: {title: "contact"}});
});


/**
 * Sitemap.
 */
baseRouter.get("/sitemap", (req: Request, res: Response) => {
    res.render('sitemap', {meta: meta, page: {title: "sitemap"}});
});


export default baseRouter;