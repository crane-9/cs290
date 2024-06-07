/**
 * Page routing for admin. This enables the necessary middleware to ensure that only authenticated clients can access these pages.
 */

import cookieParser from "cookie-parser";
import express, { Request, Response} from "express";
import session from "express-session";

import { passKey } from "../config/config.js";
import authMiddleware from "../middleware/auth.middleware.js";
import apiRouter from "./api.routes.js";


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

adminRouter.get("/database/:table", (req: Request, res: Response) => {
    // Get data on the specific table.
    
    res.render('admin-table', {meta: res.locals['meta']});
});

adminRouter.get("/database/:table/new-entry", (req: Request, res: Response) => {
    // Get data on specific table! i think. yeah.

    res.render('admin-table-entry', res.locals);
});


// Login page.
adminRouter.post("/auth", express.urlencoded({ extended: true }), (req: Request, res: Response) => {
    const { username, password } = req.body;

    // If valid
    if (username === "admin" && password === "admin") {
        console.info("Admin logged in.");

        // Set cookie.
        (req.session as any).loggedIn = true;
        res.cookie("sessionID", req.sessionID);

        res.redirect("/admin");
    } else {
        // If invalid,
        console.log("Redirecting...")
        res.redirect("/admin/auth?message=Invalid%20credentials.&status=error");
    }
});

export default adminRouter;
