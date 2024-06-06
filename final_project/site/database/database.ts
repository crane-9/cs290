/**
 * This is the database interface for SQLite3.
 */
import { Database } from "sqlite3";
import { DB_PATH } from "../config/config.js"


class DB {  
    db: Database;

    // Initializes a connection with the database.
    constructor() {
        this.db = new Database(DB_PATH, (error: any) => {
            if (!error) console.info("Connected to SQLite database...");
            else console.error("Error on connecting to database:", error);
        });
    }

    // https://stackabuse.com/a-sqlite-tutorial-with-node-js/
    __get(sqlString: string, params: any[] = []): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            this.db.get(sqlString, params, (error: any, result: any) => {
                
                // Handle errors
                if (error) {
                    console.error("SQL ERROR:", error);
                    return reject(error);
                } 
                
                resolve(result);
            })
        })
    }

    /**
     * Retrieves page info from database for the given path.
     * @param pathRaw Raw path requested from the client.
     * @returns PageInfo object.
     */
    async getPageInfo(pathRaw: string): Promise<interfaces.PageInfo> {
        const path = pathRaw.split("/", 2)[1] || "index";

        return this.__get("SELECT Title FROM PageInfo WHERE Path = ?;", [path]);
    }

    /**
     * Retrieves general site info from database.
     * @returns WebsiteInfo object.
     */
    async getSiteInfo(): Promise<interfaces.WebsiteInfo> {
        return this.__get("SELECT Title, Description, Author FROM WebsiteInfo WHERE Id = 1;");
    }
}

export default DB;
