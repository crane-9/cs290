/**
 * Module contains functions related to 
 */

interface UpdateStatement {
    query: string;
    params: any;
}

function generateUpdateArgs(pairs: Record<string, any>): UpdateStatement {
    // Create sets and 
    let sets: string[] = [];
    let params: Record<number, string> = {};

    // Function that prepares the sets array and params object.
    function prepareSets(propertyName: string, value: string, idx: number) {
        // Trim
        if (typeof value === "string") value = value.trim();
        if (value.length > 0) {
            sets.push(`${propertyName} = ?${idx}`);
            params[idx] = value;
        }
    }

    let count = 0;
    for (let [property, value] of Object.entries(pairs)) {
        // Skip Id and Path, these are unchanging values.
        if (property == "Id" || property == "Path") continue;
        
        prepareSets(property, value, count);
    }

    return {
        query: sets.join(", "),
        params
    }
}

export { generateUpdateArgs };
