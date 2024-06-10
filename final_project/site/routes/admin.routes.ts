/**
 * Page routing for admin. This enables the necessary middleware to ensure that only authenticated clients can access these pages.
 */

import cookieParser from "cookie-parser";
import express, { Request, Response} from "express";
import session from "express-session";

import authMiddleware from "../middleware/auth.middleware.js";
import apiRouter from "./api.routes.js";
import dataMiddleware from "../middleware/data.middleware.js";

import { passKey } from "../config/config.js";
import DB, { PageProperties, PagePropertyTypes, TableProperties } from "../database/database.js";
import * as utils from "../utils/basics.js";


const adminRouter = express.Router();

// Sub-routing.
adminRouter.use("/api", apiRouter);

// Middleware.
adminRouter.use(session({
    secret: passKey,
    resave: false,
    saveUninitialized: false
}));

adminRouter.use(cookieParser());
adminRouter.use(authMiddleware);
adminRouter.use(dataMiddleware);

/**
 * NOTE: by using the above middleware with the API, I believe I may be preventing access of using the API outside of the website. 
 */

// Base pages.
adminRouter.get("/", (req: Request, res: Response) => {
    res.render('admin', {meta: res.locals['meta']});
});

adminRouter.get("/auth", (req: Request, res: Response) => {
    res.render('auth', {meta: res.locals['meta']});
});

adminRouter.get("/config", (req: Request, res: Response) => {
    res.render('admin-config', {meta: res.locals['meta']});
});

adminRouter.get("/database", (req: Request, res: Response) => {
    res.render('admin-database', {meta: res.locals['meta']});
});

adminRouter.get("/database/:table", async (req: Request, res: Response) => {
    const tableName = utils.capitalize(req.params.table);
    // Get data on the specific table.
    const db = res.locals['db'] as DB;
    const results = await db.getAllEntries(tableName);
    
    res.render('admin-table', {meta: res.locals['meta'], table: {name: tableName, size: results.length, properties: TableProperties[tableName]}, entries: results});
});

adminRouter.get("/database/:table/new-entry", (req: Request, res: Response) => {
    // Get data on specific table! i think. yeah.

    // Validate table is valid.

    // If not raise error, ummm and it doesn't have to display on the admin template bc they shouldn't be pokin about!

    res.render('admin-table-entry', res.locals);
});

adminRouter.get("/pages", async (req: Request, res: Response) => {
    const db = res.locals['db'] as DB;
    const entries = await db.getAllPages();

    const table = {
        properties: [
            "Path",
            "Title",
            "BodyText",
            "Hidden"
        ],
        size: entries.length
    };

    res.render('admin-pages', {...res.locals, table, entries});
})

adminRouter.get("/pages/new-page", async (req: Request, res: Response) => {
    // fill out new page template for new pages creation!

    res.render('admin-table-entry', { table: { properties: PageProperties, types: PagePropertyTypes }, action: "Create", placeholders: ["my-new-page", "Page Title", "This is **markdown-supported** body text!"] });
});


// Login handling.
adminRouter.post("/auth", express.urlencoded({ extended: true }), (req: Request, res: Response) => {
    const { username, password } = req.body;
    const redir = req.query.redirect || ""

    // If valid
    if (username === "admin" && password === "admin") {
        console.info("Admin logged in.");

        // Set cookie.
        (req.session as any).loggedIn = true;
        res.cookie("sessionID", req.sessionID);

        res.redirect("/admin" + redir);
    } else {
        // If invalid,
        console.log("Redirecting...")
        res.redirect("/admin/auth?message=Invalid%20credentials.&status=error");
    }
});

export default adminRouter;
