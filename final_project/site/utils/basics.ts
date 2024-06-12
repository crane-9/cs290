
/**
 * Applies proper capitalization to the given string.
 * @param inString Input string.
 * @returns Input string with only the first letter capitalized.
 */
function capitalize(inString: string): string {
    return inString[0].toUpperCase() + inString.slice(1).toLowerCase();
}


/**
 * Validates that the new page's path is valid.
 * @param param0 The incoming information about the new page.
 * @returns True if valid, false if not.
 */
function validatePath({Path}: interfaces.PageInfoIncoming): boolean {
    return !Path.match(/[!@#$%^&*\W(),.\/\\]/);
}

export {
    capitalize,
    validatePath,
}
