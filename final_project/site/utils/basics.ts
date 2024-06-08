
/**
 * Applies proper capitalization to the given string.
 * @param inString Input string.
 * @returns Input string with only the first letter capitalized.
 */
function capitalize(inString: string): string {
    return inString[0].toUpperCase() + inString.slice(1).toLowerCase();
}


export {
    capitalize,

}
