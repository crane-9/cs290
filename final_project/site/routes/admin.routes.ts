/**
 * Page routing for admin. This enables the necessary middleware to ensure that only authenticated clients can access these pages.
 */

import cookieParser from "cookie-parser";
import express, { Request, Response} from "express";
import session from "express-session";
import authMiddleware from "../middleware/auth.middleware.js";
import { passKey } from "../config/config.js";


const adminRouter = express.Router();

adminRouter.use(session({
    secret: passKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30000
    }
}));

adminRouter.use(cookieParser());
adminRouter.use(authMiddleware);

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


// Login page.
adminRouter.post("/auth", express.urlencoded({ extended: true }), (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "admin") {
        console.info("Admin logged in.");

        // Set cookie.
        (req.session as any).loggedIn = true;
        res.cookie("sessionID", req.sessionID);

        res.redirect("/admin");
    } else {
        res.render('auth', {meta: res.locals['meta'], errorMessage: "Invalid Credentials"});
    }
});

export default adminRouter;
