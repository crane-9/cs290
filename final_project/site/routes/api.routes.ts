/**
 * This router will handle API endpoints for interacting with the database as administrator.
 * This is a sub-route of `/admin` and uses the same authentication session.
 * Note: These routes do not have a database in `res.locals`: a database must be initiated for each. This helps organization, as some API calls may not need database access.
 */
import cookieParser from "cookie-parser";
import express, { Request, Response} from "express";

import SESSION from "../config/session.js";
import DB from "../database/database.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { capitalize } from "../utils/basics.js";


const apiRouter = express.Router();

apiRouter.use(SESSION);
apiRouter.use(authMiddleware);
apiRouter.use(cookieParser());


/**
 * Handles logging in and authentications.
 */
apiRouter.post("/auth", express.urlencoded({ extended: true }), (req: Request, res: Response) => {
    const { username, password } = req.body;
    const redir = req.query.redirect || ""

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


/**
 * Creates a new page.
 */
apiRouter.post("/create/page", express.urlencoded({ extended: true}), async (req: Request, res: Response) => {
    console.log(req.body);

    const db = new DB();
    await db.createPage(req.body);

    res.redirect('/admin/pages');
});


apiRouter.post("/create/:table", express.urlencoded({ extended: true }), async (req: Request, res: Response) => {
    const tableName = capitalize(req.params.table);
    console.log(tableName, req.body);

    res.redirect("/admin/database/" + req.params.table);
});


/**
 * Endpoint to update general site information.
 */
apiRouter.post("/update/site-info",  express.urlencoded({ extended: true }), async (req: Request, res: Response) => {
    // Don't worry about the favicon for now!
    const db = new DB();
    
    // Unpack title, description, and author.
    await db.updateSiteInfo(req.body);

    res.redirect("/admin?status=success&message=Data%20successfully%20updated.")
});


export default apiRouter;
