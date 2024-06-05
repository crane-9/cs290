

import { Request, Response } from "express";


function metaMiddleware(req: Request, res: Response, next: Function): void {
    res.locals['meta'] = {description: 'hello description', author: 'me', name: 'lala', title: 'its website'};

    // Carry on.
    next();
}

export default metaMiddleware;
