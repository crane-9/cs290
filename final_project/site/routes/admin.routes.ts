/**
 * Page routing for admin. This enables the necessary middleware to ensure that only authenticated clients can access these pages.
 */

import express, { Request, Response} from "express";


const adminRouter = express.Router();

// for now just look at the admin page.
adminRouter.get("/", (req: Request, res: Response) => {
    res.render('admin', {meta: res.locals['meta'], page: {title: "admin"}});
});

adminRouter.get("/config", (req: Request, res: Response) => {

});

adminRouter.get("/database", (req: Request, res: Response) => {

});

adminRouter.get("/database/:table", (req: Request, res: Response) => {

});

export default adminRouter;
