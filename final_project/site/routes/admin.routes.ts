/**
 * Page routing for admin. This enables the necessary middleware to ensure that only authenticated clients can access these pages.
 */

import express, { Request, Response} from "express";

import { meta } from "../config/config.js";

const adminRouter = express.Router();

// for now just look at the admin page.
adminRouter.get("/", (req: Request, res: Response) => {
    res.render('admin', {meta, page: {title: "admin"}});
});

export default adminRouter;
