/** A namespace for utility functions.
 * @module Utils
 */


/** A console.log with styling, intended for debugging clarity.
 * @param {String} text 
 */
export function log (text) {
    console.log(`%cUrsa Major | ${text}`, 'color: royalblue');
}

/** A console.error with styling, intended for debugging clarity.
 * @param {String} text 
 */
export function error (text) {
    console.error(`%cUrsa Major | ${text}`, 'color: royalblue;');
}
