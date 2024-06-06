/**
 * This router will handle API endpoints for interacting with the database as administrator.
 * This is a sub-route of `/admin`
 */

import express, { Request, Response} from "express";


const apiRouter = express.Router();


apiRouter.post("/update/site-info", (req: Request, res: Response) => {
    res.redirect("/admin/config?status=success&message=Data%20successfully%20updated.")
});


export default apiRouter;
