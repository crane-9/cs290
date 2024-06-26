/**
 * This is the database interface for SQLite3.
 */
import { Database } from "sqlite3";
import { DB_PATH } from "../config/config.js";
import { generateUpdateArgs } from "../utils/updateQuery.js";

import { AccessibleTables, ValidTableNames } from "./tables.js";
import { capitalize } from "../utils/basics.js";


/**
 * A function that creates async-await compatible access to the SQLite database.
 * @link Taken from: https://stackabuse.com/a-sqlite-tutorial-with-node-js/
 * @param func Method to call -- be sure to bind it to the SQLite3 database object.
 * @param sql The SQL string.
 * @param params Parameters to fill in.
 * @returns Returns results.
 */
function promiseWrapper(func: Function, sql: string, params: any[] = []): Promise<any> {
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
    /**
     * Class instance initializes a connection to the database.
     * Methods are specific to certain uses and intentions (ie: accessible pages for sitemap display vs admin management.)
     */
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
        return promiseWrapper(this.db.all.bind(this.db), sqlString, params);
    }

    // No return value.
    __run(sqlString: string, params: any[] | any = []): Promise<void> {
        return promiseWrapper(this.db.run.bind(this.db), sqlString, params);
    }

    // READ

    /**
     * Retrieves all rows from an accessible table. 
     * @note Not all tables are accessible via this method, as not all tables are structured the same. Some tables have specific rows that need to be protected or treated differently in regards to admin management.
     * @param table Name of the table to access.
     * @return A promise that resolves to an array of rows from the table.
     */
    async getAllEntries(table: string): Promise<any[]> {
        // Protection.
        if (!ValidTableNames.includes(table)) {
            throw {name: "Invalid Table Access", message: "Inaccessible table."};
        }

        return this.__getAll(`SELECT * FROM ${table};`);
    }

    /**
     * Gets all PageInfo from table, orders canonical pages first and then secondarily by path.
     */
    async getAllPages(): Promise<interfaces.PageInfo[]> {
        return this.__getAll("SELECT * FROM PageInfo ORDER BY Canonical DESC, Path ASC;");
    }

    async getEntry(table: string, id: string): Promise<any> {
        return this.__get(`SELECT * FROM ${table} WHERE Id = ?;`, [id]);
    }

    /**
     * Gets all non-hidden pages to display on the sitemap.
     * @returns Array of page info.
     */
    async getSitemapPages(): Promise<interfaces.PageInfo[]> {
        return this.__getAll("SELECT Path, Title FROM PageInfo WHERE Hidden = False ORDER BY Canonical Asc;");
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

    /**
     * Returns a summary of accessible tables.
     * @returns A record that maps the table name to number of total entries.
     */
    async getDatabaseSummary(): Promise<Record<string, number>[]> {
        let promises: Promise<Record<string, number>>[] = [];

        // Collect all promises.
        for (let tableName of ValidTableNames) {
            promises.push(await this.__get(`SELECT COUNT(*) AS count FROM ${tableName};`));
        }
        
        // Resolve all and create an array.
        return Array.from(await Promise.all(promises), (v: any, k: number) => {
            return {...v, name: ValidTableNames[k]}
        });
    }

    // CREATE

    async insertArtwork({Name, FileName, AltText, Date, Description, CollectionName, Medium, Credits}: interfaces.ArtworkIncoming): Promise<void> {
        return this.__run("INSERT INTO Artwork (Name, Filename, AltText, Date, Description, CollectionName, Medium, Credits) VALUES (?, ?, ?, ?, ?, ?, ?, ?);", [Name, FileName, AltText, Date, Description, CollectionName, Medium, Credits]);
    }

    async createPage({ Path, Title, BodyText, Hidden }: interfaces.PageInfoIncoming): Promise<void> {
        return this.__run("INSERT INTO PageInfo VALUES (?, ?, ?, ?, ?)", [Path, Title, BodyText, false, Hidden == "on"]);
    }

    // UPDATE

    /**
     * Updates a single row of a table.
     * @param table The table to update.
     * @param info The new information to set.
     */
    async updateTable(table: string, info: any): Promise<void> {
        const query = generateUpdateArgs(info);
        console.info(query);

        await this.__run(`UPDATE ${table} SET ${query.query} WHERE Id = ${info.Id};`, query.params);
    }

    /**
     * Updates information for a single page in the database.
     * @param info New information for the page.
     */
    async updatePageInfo(info: interfaces.PageInfo): Promise<void> {
        const query = generateUpdateArgs(info);
        console.info(info);
        console.info(query);

        await this.__run(`UPDATE PageInfo SET ${query.query} WHERE Path = '${info.Path}';`, query.params);
    }

    async updateSiteInfo({ title, description, author }: interfaces.WebsiteInfoIncoming): Promise<void> {
        const query = generateUpdateArgs({
            "Title": title,
            "Description": description,
            "Author": author
        })

        await this.__run(`UPDATE WebsiteInfo SET ${query.query} WHERE Id = 1;`, query.params);
    }

    // DELETE

    /**
     * Deletes a page from the database.
     * Prevents deletion of canonical pages.
     * @param path Unique path of the page to remove from the database.
     */
    async deletePage(path: string): Promise<void> {
        await this.__run("DELETE FROM PageInfo WHERE Canonical = FALSE AND Path = ?;", [path]);
    }

    /**
     * Deletes a single row from a table by ID.
     * @param table The table to delete from.
     * @param id ID of artwork to delete.
     */
    async deleteFromTable(table: string, id: number): Promise<void> {
        await this.__run(`DELETE FROM ${capitalize(table)} WHERE Id = ?;`, [id]);
    }
}

export default DB;
