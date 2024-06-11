import session from 'express-session';

import { passKey } from "./config";


// Create this session to be used for multiple routers.
const SESSION = session({
    secret: passKey,
    resave: false,
    saveUninitialized: false
});


export default SESSION;
