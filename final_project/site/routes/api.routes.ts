/**
 * This router will handle API endpoints for interacting with the database as administrator.
 * 
 */

import express, { Request, Response} from "express";


const apiRouter = express.Router();


/**
 * Handles "authentication".
 * This is less genuine authentication and moreso giving the user a cookie that marks them as "logged in".
 */
// apiRouter.post("/authenticate", (req: Request, res: Response) => {
//     // TODO: add password/username for user input validation + feedback?

//     res.setHeader("Set-Cookie", `token=${config.passKey}; HttpOnly`);
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.redirect("/admin");
// });


export default apiRouter;
