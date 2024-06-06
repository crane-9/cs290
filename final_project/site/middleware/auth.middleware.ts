
import { Request, Response } from "express";

/**
 * This level of middleware controls access to admin pages.
 * Prevents access to admin pages unless logged in. Conversely, redirects logged-in users from the login page to the base admin page.
 * @param req Incoming request.
 * @param res Outgoing response.
 * @param next Pass to next handler
 */
function authMiddleware(req: Request, res: Response, next: Function): void {
    // Get our two booleans to check adn compare.
    const loggedIn = (req.session as any).loggedIn;
    const accessAuth = req.url === "/auth";

    // Different conditions control access to the `/auth` page.
    if (accessAuth) {
        // If NOT logged in and trying to access `/auth`, continue.
        if (!loggedIn) next();
        
        // Else, if LOGGED IN and trying to access `/auth`, redirect
        else res.redirect("/admin");
    } else {
        // Continue to any admin page only if logged in.
        if (loggedIn) next();

        // Else, redirect to gain authentication.
        else res.redirect("/admin/auth");
    } 
}

export default authMiddleware;