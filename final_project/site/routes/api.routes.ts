/**
 * This router will handle API endpoints for interacting with the database as administrator.
 * This is a sub-route of `/admin` and uses the same authentication session.
 * Note: These routes do not have a database in `res.locals`: a database must be initiated for each. This helps organization, as some API calls may not need database access.
 */
import cookieParser from "cookie-parser";
import express, { Request, Response} from "express";

import SESSION from "../config/session.js";
import DB, { TableProperties } from "../database/database.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { capitalize } from "../utils/basics.js";


const apiRouter = express.Router();

apiRouter.use(SESSION);
apiRouter.use(authMiddleware);
apiRouter.use(cookieParser());

apiRouter.use(express.urlencoded({ extended: true }));

/**
 * Handles logging in and authentications.
 */
apiRouter.post("/auth", (req: Request, res: Response) => {
    const { username, password } = req.body;
    
    // Redirection has stopped working.... 
    // Did some inspection and the URL query is still received. this has something to do with the express middleware that i will worry about later.
    const redir = req.query.redirect || "";

    // If valid: login.
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


// CREATE

/**
 * Creates a new page.
 */
apiRouter.post("/create/page", async (req: Request, res: Response) => {
    console.log(req.body);

    const db = new DB();
    await db.createPage(req.body);

    res.redirect('/admin/pages');
});


/**
 * Creates a new entry for the artwork table.
 * NOTE: Handling different tables would be split up into multiple handlers, as input validation may differ across tables. Also, some extra security.
 */
apiRouter.post("/create/artwork", async (req: Request, res: Response) => {
    console.log(req.body);

    // Add.
    const db = new DB();
    await db.insertArtwork(req.body);

    // Send confirmation message.
    res.redirect("/admin/database/artwork?status=success&message=New%20entry%20successfully%20added.");
});


// UPDATE

/**
 * 
 */
apiRouter.post("/update/page", async (req: Request, res: Response) => {
    const db = new DB();

    await db.updatePageInfo(req.body);

    res.redirect("/admin/pages?status=success&message=Page%20updated.")
});

/**
 * Endpoint to update general site information.
 */
apiRouter.post("/update/site-info",  async (req: Request, res: Response) => {
    // Don't worry about the favicon for now!
    const db = new DB();
    
    // Unpack title, description, and author.
    await db.updateSiteInfo(req.body);

    res.redirect("/admin?status=success&message=Data%20successfully%20updated.")
});


// DELETE

/**
 * Deletes one or more pages. 
 * Protects against deletion of canonical pages. Attempting to delete canonical pages has zero result.
 */
apiRouter.post("/delete/page", async (req: Request, res: Response) => {
    const idsRaw = req.body['ids'];
    
    // Protection.
    if (!idsRaw) {
        return res.redirect("/admin/pages?status=error&message=Invalid%20request.");
    }

    // Now work with database.
    const db = new DB();
    const pages = idsRaw.split(',');

    for (let path of pages) {
        await db.deletePage(path);
    }

    res.redirect("/admin/pages?status=success&message=Non-builtin%20pages%20removed.");
});

/**
 * Deletes entries from a table.
 */
apiRouter.post("/delete/:table", async (req: Request, res: Response) => {
    const table = req.params.table;
    const tableName = capitalize(req.params.table);
    const idsRaw = req.body['ids'];
    
    // Protection.
    if (!idsRaw || !Object.keys(TableProperties).includes(tableName)) {
        return res.redirect(`/admin/database/${table}?status=error&message=Invalid%20request.`);
    }

    const db = new DB();
    const ids = idsRaw.split(",");

    for (let id of ids) {
        await db.deleteFromTable(tableName, id);
    }

    res.redirect(`/admin/database/${table}?status=success&message=Entries%20removed.`);

});


export default apiRouter;
