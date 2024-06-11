/**
 * Specifies which tables are allowed to be accessed by the client as spaces in the database with minimal overhead management.
 */

import { capitalize } from "../utils/basics";

// Basically an enum for tables that can be accessed for their entries.
const AccessibleTables = {
    artwork: "Artwork"
};


/**
 * Returns a simple true/false for table access validation.
 * @param tableName The name of the table to access. Not case-sensitive.
 * @returns True if valid for access, false otherwise.
 */
function validateTableAccess(table: string): boolean {
    return Object.keys(AccessibleTables).includes(capitalize(table));
}

export { AccessibleTables, validateTableAccess };