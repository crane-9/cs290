/**
 * Page routing for admin. This enables the necessary middleware to ensure that only authenticated clients can access these pages.
 */

import cookieParser from "cookie-parser";
import express, { Request, Response, raw} from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import apiRouter from "./api.routes.js";
import dataMiddleware from "../middleware/data.middleware.js";

import SESSION from "../config/session.js";
import DB, { PageProperties, PagePropertyTypes, TableProperties, TablePropertyTypes } from "../database/database.js";
import * as utils from "../utils/basics.js";


const adminRouter = express.Router();

// Sub-routing.
adminRouter.use("/api", apiRouter);

// Middleware.
adminRouter.use(SESSION);
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
    
    res.render('admin-table', {
        meta: res.locals['meta'], 
        table: {
            name: tableName,
            size: results.length,
            properties: TableProperties[tableName]
        }, 
        entries: results,
        page: false
    });
});

adminRouter.get("/database/:table/new-entry", (req: Request, res: Response) => {
    const tableName = utils.capitalize(req.params.table);
    // Get data on specific table! i think. yeah.
    const table = {
        properties: TableProperties[tableName],
        types: TablePropertyTypes[tableName],
        name: tableName
    }
    // Validate table is valid.
    // If not raise error, ummm and it doesn't have to display on the admin template bc they shouldn't be pokin about!

    res.render('admin-table-entry', {
        ...res.locals,
        table,
        action: `Create New ${tableName}`,
        endpoint: `/admin/api/create/${req.params.table}`
    });
});

adminRouter.get("/database/:table/edit-entry", async (req: Request, res: Response) => {
    // Get the entry we're editing.
    const rawIDs = req.query['ids'] as string;
    const entryID = rawIDs.split(",")[0];

    console.info(rawIDs);

    // Protection.
    if (!entryID) {
        return res.redirect("/admin/pages?status=error&message=Invalid%20request.");
    }

    const tableName = utils.capitalize(req.params.table);
    // Get data on specific table! i think. yeah.
    const table = {
        properties: TableProperties[tableName],
        types: TablePropertyTypes[tableName],
        name: tableName
    }
    // Validate table is valid.

    const db = res.locals['db'] as DB;
    const currentValues = await db.getEntry(tableName, entryID) as interfaces.Artwork;
    delete currentValues.Id;

    res.render('admin-table-entry', {
        ...res.locals,
        table,
        action: `Update ${tableName}`,
        endpoint: `/admin/api/update/${req.params.table}`,
        placeholders: Object.values(currentValues),
        editMode: true
    });
});

adminRouter.get("/pages", async (req: Request, res: Response) => {
    const db = res.locals['db'] as DB;
    const entries = await db.getAllPages();

    const table = {
        name: "Site Page",
        properties: [
            "Path",
            "Title",
            "BodyText",
            "Hidden"
        ],
        size: entries.length,
    };

    res.render('admin-table', {...res.locals, table, entries, pages: true});
})

adminRouter.get("/pages/new-page", async (req: Request, res: Response) => {
    res.render('admin-table-entry', {
        table: {
            properties: PageProperties,
            types: PagePropertyTypes
        },
        action: "Create",
        placeholders: ["my-new-page", "Page Title", "This is **markdown-supported** body text!"],
        endpoint: "/admin/api/create/page"
    });
});

adminRouter.get("/pages/edit-page", async (req: Request, res: Response) => {
    // Get the entry we're editing.
    const entryID = req.query['ids'] as string;
    console.info(entryID);

    // Protection.
    if (!entryID) {
        return res.redirect("/admin/pages?status=error&message=Invalid%20request.");
    }
    
    // Get current data.
    const db = res.locals['db'] as DB;
    const currentValues = await db.getPageInfo("/" + entryID.split(",")[0]);
    
    res.render('admin-table-entry', {
        table: {
            properties: PageProperties,
            types: PagePropertyTypes
        },
        action: "Update",
        placeholders: Object.values(currentValues),
        endpoint: "/admin/api/update/page",
        page: true,
        editMode: true
    });
})


export default adminRouter;
