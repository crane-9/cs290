/**
 * Page routing for admin. This enables the necessary middleware to ensure that only authenticated clients can access these pages.
 */

import cookieParser from "cookie-parser";
import express, { Request, Response, raw} from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import apiRouter from "./api.routes.js";
import dataMiddleware from "../middleware/data.middleware.js";

import SESSION from "../config/session.js";
import DB from "../database/database.js";
import { TableProperties, PageProperties } from "../database/properties.js";

import * as utils from "../utils/basics.js";
import { validateTableAccess } from "../database/tables.js";


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
adminRouter.get("/", async (req: Request, res: Response) => {
    const db = res.locals['db'] as DB;

    const pages = await db.getAllPages();
    const tables = await db.getDatabaseSummary();
    
    res.render('admin', {...res.locals, pages, tables });
});

adminRouter.get("/auth", (req: Request, res: Response) => {
    res.render('auth', {...res.locals,});
});

adminRouter.get("/config", (req: Request, res: Response) => {
    res.render('admin-config', {...res.locals,});
});

adminRouter.get("/database", async (req: Request, res: Response) => {
    const db = res.locals['db'] as DB;
    const tables = await db.getDatabaseSummary();

    res.render('admin-database', {...res.locals, tables});
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

    console.info(rawIDs, entryID);

    // Protection.
    if (!validateTableAccess(req.params.table) || !entryID) {
        return res.redirect(`/admin/database/${req.params.table}?status=error&message=Invalid%20request.`);
    }

    // Carry on, get specific table and its data.
    const tableName = utils.capitalize(req.params.table);
    const db = res.locals['db'] as DB;
    const currentValues = await db.getEntry(tableName, entryID) as interfaces.Artwork;

    res.render('admin-table-entry', {
        ...res.locals,
        table: {
            properties: TableProperties[tableName],
            name: tableName,
            values: currentValues
        },
        action: `Update ${tableName}`,
        endpoint: `/admin/api/update/${req.params.table}`,
        editMode: true
    });
});


adminRouter.get("/pages", async (req: Request, res: Response) => {
    const db = res.locals['db'] as DB;
    const entries = await db.getAllPages();

    const table = {
        name: "Site Page",
        properties: PageProperties,
        size: entries.length,
    };

    res.render('admin-table', {...res.locals, table, entries, pages: true});
});


adminRouter.get("/pages/new-page", async (req: Request, res: Response) => {
    res.render('admin-table-entry', {
        table: {
            properties: PageProperties,
        },
        action: "Create",
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
            values: currentValues
        },
        action: "Update",
        endpoint: "/admin/api/update/page",
        page: true,
        editMode: true
    });
})


export default adminRouter;
