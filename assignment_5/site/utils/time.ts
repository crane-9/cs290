/**
 * Utilities related to time.
 */

import * as config from "../config/config.js";


function relativeTimestamp(unixTime: number): string {
    const delta = new Date().getTime() - unixTime;
    return config.TIME_FMT.format(delta / 1000, 'seconds');
}

export { relativeTimestamp };
