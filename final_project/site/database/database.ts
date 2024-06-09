/**
 * This is the database interface for SQLite3.
 */
import { Database } from "sqlite3";
import { DB_PATH } from "../config/config.js";


// Basically an enum for tables that can be accessed for their entries.
const AccessibleTables = {
    artwork: "Artwork"
};


// Hard-coded :/
const TableProperties: Record<string, string[]> = {
    Artwork: [
        "Id",
        "Name",
        "FileName",
        "Date",
        "Description",
        "CollectionName",
        "Medium",
        "Credit",
    ]
};


/**
 * 
 * @param func Method to call -- be sure to bind it to the SQLite3 database object.
 * @param sql The SQL string.
 * @param params Parameters to fill in.
 * @returns Returns results.
 */
function promiseWrapper(func: Function, sql: string, params: any[] = []): Promise<any> {
    // https://stackabuse.com/a-sqlite-tutorial-with-node-js/
    return new Promise((resolve: Function, reject: Function) => {
        func(sql, params, (error: any, result: any) => {
                // Handle errors
                if (error) {
                    console.error("SQL ERROR:", error);
                    return reject(error);
                } 
                
                // Resolve and return results.
                resolve(result);
        });
    });
}


class DB {  
    db: Database;

    // Initializes a connection with the database.
    constructor() {
        this.db = new Database(DB_PATH, (error: any) => {
            if (!error) console.info("Connected to SQLite database...");
            else console.error("Error on connecting to database:", error);
        });
    }

    // Returns one single object as response.
    __get(sqlString: string, params: any[] | any = []): Promise<any> {
        return promiseWrapper(this.db.get.bind(this.db), sqlString, params);        
    }

    // Returns an array of objects as response.
    __getAll(sqlString: string, params: any[] | any = []): Promise<any[]> {
        return promiseWrapper(this.db.all.bind(this.db), sqlString, params)
    }

    // READ

    /**
     * 
     * @param table Name of the table to access.
     */
    async getAllEntries(table: string): Promise<interfaces.Artwork[]> {
        // Protection.
        if (!Object.values(AccessibleTables).includes(table)) {
            throw {name: "Invalid Table Access", message: "Inaccessible table."}
        }

        return this.__getAll(`SELECT * FROM ${table};`);
    }

    /**
     * Retrieves page info from database for the given path.
     * @param pathRaw Raw path requested from the client.
     * @returns PageInfo object.
     */
    async getPageInfo(pathRaw: string): Promise<interfaces.PageInfo> {
        console.info("retrieving page data for", pathRaw);
        const path = pathRaw.split("/", 2)[1] || "index";

        return this.__get("SELECT * FROM PageInfo WHERE Path = ?;", [path]);
    }

    /**
     * Retrieves general site info from database.
     * @returns WebsiteInfo object.
     */
    async getSiteInfo(): Promise<interfaces.WebsiteInfo> {
        return this.__get("SELECT Title, Description, Author FROM WebsiteInfo WHERE Id = 1;");
    }

    // UPDATE

    async updateSiteInfo({ title, description, author }: interfaces.WebsiteInfoIncoming): Promise<void> {
        // Gather what values need to be set.
        let sets: string[] = [];
        let params: Record<number, string> = {};

        // Cut down on repetition.
        function prepareSets(propertyName: string, value: string, idx: number) {
            // Trim
            value = value.trim();
            if (value.length > 0) {
                sets.push(`${propertyName} = ?${idx}`);
                params[idx] = value;
            }
        }

        prepareSets("Title", title, 1);
        prepareSets("Description", description, 2);
        prepareSets("Author", author, 3);

        const setString = sets.join(", ");

        await this.__get(`UPDATE WebsiteInfo SET ${setString} WHERE Id = 1;`, params);
    }
}

export default DB;

export { TableProperties };
