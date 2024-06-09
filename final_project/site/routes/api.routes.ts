/**
 * This router will handle API endpoints for interacting with the database as administrator.
 * This is a sub-route of `/admin`
 */

import express, { Request, Response} from "express";
import DB from "../database/database.js";


const apiRouter = express.Router();


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
