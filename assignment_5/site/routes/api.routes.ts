
import express, { Request, Response } from "express";

const apiRouter = express.Router();

apiRouter.get('/send', (req: Request, res: Response) => {
    res.status(200).send({
        "message": "received"
    })
});

export default apiRouter;